import { useSelector } from "react-redux";
import {Box, Flex} from "@chakra-ui/react"
import SingleChat from "./single-chat"

const ChatBox = ({changedChats, setChangedChats}) => {
    //    selectedChat: null,
    // chats:null
     const chats = useSelector((root) => {
       console.log("in use selector in userp rofile page", root.Chat.chats);
       return root.Chat.chats;
     });
       const selectedChat = useSelector((root) => {
         console.log("in use selector selected chat", root.Chat.selectedChat);
         return root.Chat.selectedChat;
       });
    return ( <>
     <Flex
      alignItems="center"
      flexDir="column"
      p={3}
      bg="orange"
      w={{ base: "100%", md: "68%" }}
      borderRadius="lg"
      borderWidth="1px"
    >
      <SingleChat changedChats={changedChats} setChangedChats={setChangedChats}/>
    </Flex>
    </> );
}
 
export default ChatBox;