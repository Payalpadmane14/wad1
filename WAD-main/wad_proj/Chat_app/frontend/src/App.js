import { Route } from "react-router-dom/cjs/react-router-dom.min";
import "./App.css";
import Homepage1 from "./Pages/Homepage1";
import Chatpage1 from "./Pages/Chatpage1";



function App() {
  return (
    <div className="App" >
      <Route path='/' component={Homepage1} exact />
      <Route path= '/chats' component={Chatpage1} />

  </div>
  );
}
export default App;