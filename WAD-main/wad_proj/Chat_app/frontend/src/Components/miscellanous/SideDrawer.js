import React from 'react';
import { Box, Button, Tooltip, Text, Menu, MenuButton, MenuItem, MenuList, MenuDivider, Drawer, DrawerOverlay, DrawerHeader, DrawerContent, DrawerBody,Input, useToast, Spinner } from '@chakra-ui/react';
import { BellIcon, ChevronDownIcon } from '@chakra-ui/icons';
import { Avatar } from '@chakra-ui/avatar';
import { ChatState } from '../../Context/Chatprovider';
import ProfileModal from './ProfileModal';
import { useHistory } from 'react-router-dom';
import { useDisclosure } from '@chakra-ui/react';
import axios from "axios";
import { useState } from "react";
import ChatLoading from '../ChatLoading';
import UserListItem from '../UserAvatar/UserListItem';
import { getSender } from '../../Config/ChatLogics';
import "./style2.css"






const SideDrawer = () => {
    const [search, setSearch] = React.useState('');
     const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState(false);
    const { user, setSelectedChat, chats, setChats, notification, setNotification } = ChatState(); // Assuming ChatState returns user information
    const history = useHistory();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const toast = useToast();

    const logoutHandler = () => {
        localStorage.removeItem('userInfo');
        history.push('/');
    };
    
const handleSearch = async () => {
        if (!search) {
            toast({
                title: "Please Enter something in search",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "top-left",
            });
            return;
        } try {
            setLoading(true);

            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            };

            const { data } = await axios.get(`/api/user?search=${search}`, config);
            setLoading(false);
            setSearchResult(data);

        } catch (error) {
            toast({
        title: "Error Occured!",
        description: "Failed to Load the Search Results",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
            
        }
    }

const accessChat = async (userId) => {
    console.log(userId);

    try {
      setLoadingChat(true);
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.post(`/api/chat`, { userId }, config);

      if (!chats.find((c) => c._id === data._id)) setChats([data, ...chats]);
      setSelectedChat(data);
      setLoadingChat(false);
      onClose();
    } catch (error) {
      toast({
        title: "Error fetching the chat",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };
    

        return (
            <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                bg="white"
                width="100%"
                padding="5px 10px"
                borderWidth="5px"
            >
                <Tooltip label="Search Users to chat" hasArrow placement="bottom-end">
                    <Button variant="ghost" onClick={onOpen} leftIcon={<i className="fas fa-search"></i>}>
                        <Text display={{ base: "none", md: "inline-flex" }} px={2}>
                            Search User
                        </Text>
                    </Button>
                </Tooltip>
      
                <Text fontSize="2xl" fontFamily="Work Sans" textAlign="center" flex="1">
                    Chit-Chat
                </Text>

                <Menu>
                    <MenuButton p={1}>
                 <div>
       {notification.length > 0 && (
         <div className="notification-badge">
              <span className="badge">    
                  {notification.length}
              </span>
          </div>
          )}
   </div>
                        <BellIcon boxSize={6} />
                    </MenuButton>
                    <MenuList pl={2}>
              {!notification.length && "No New Messages"}
              {notification.map((notif) => (
                <MenuItem
                  key={notif._id}
                  onClick={() => {
                    setSelectedChat(notif.chat);
                    setNotification(notification.filter((n) => n !== notif));
                  }}
                >
                  {notif.chat.isGroupChat
                    ? `New Message in ${notif.chat.chatName}`
                    : `New Message from ${getSender(user, notif.chat.users)}`}
                </MenuItem>
              ))}
            </MenuList>
                </Menu>

                <Menu>
                    <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                        <Avatar size="sm" cursor="pointer" name={user.name} src={user.pic} />
                    </MenuButton>
                    <MenuList>
                        <ProfileModal user={user}>
                            <MenuItem>My Profile</MenuItem>
                        </ProfileModal>
                        <MenuDivider />
                        <MenuItem onClick={logoutHandler}>Logout</MenuItem>
                    </MenuList>
                </Menu>

                <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
                    <DrawerOverlay />
                    <DrawerContent>
                        <DrawerHeader borderBottomWidth="1px">Search Users</DrawerHeader>
                        <DrawerBody>
                            <Box display="flex" alignItems="center" pb={2}>
                                <Input
                                    placeholder="Search by name or email"
                                    mr={2}
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                />
                                <Button onClick={handleSearch} colorScheme="teal">
                                    Go
                                </Button>
                            </Box>
                            {loading ? (
                                <ChatLoading />
                            ) : (
                                searchResult?.map((user) => (
                <UserListItem
                  key={user._id}
                  user={user}
                  handleFunction={() => accessChat(user._id)}
                />
              ))
                            )}
                            {loadingChat && <Spinner ml="auto" display={"flex"} />}
                        </DrawerBody>
                    </DrawerContent>

              
                </Drawer>
            </Box>
        );
    };


export default SideDrawer;
