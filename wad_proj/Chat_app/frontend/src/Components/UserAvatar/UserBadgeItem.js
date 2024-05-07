import { CloseIcon } from "@chakra-ui/icons";
import { Box } from "@chakra-ui/layout";
import { white } from "colors";

const UserBadgeItem = ({ user, handleFunction}) => {
 return (
    <Box
      px={2}
      py={1}
      borderRadius="lg"
      m={1}
      mb={2}
      variant="solid"
      fontSize={12}
      colorScheme="purple"
      background="purple"
      color="white"
      cursor="pointer"
      onClick={handleFunction}
      display="inline-block" // Set display to inline-block
      minWidth="auto" // Set minimum width to auto
      maxWidth="100%" // Optionally, set maximum width to 100% to prevent overflow
      whiteSpace="nowrap" // Prevent text wrapping
      overflow="hidden" // Hide overflow content
      textOverflow="ellipsis" // Show ellipsis (...) for overflow content
    >
      {user.name}
      {/* {admin === user._id && <span> (Admin)</span>} */}
      <CloseIcon pl={1} />
    </Box>
  );
};

export default UserBadgeItem;
