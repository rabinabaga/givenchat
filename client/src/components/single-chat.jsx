import {
  Box,
  Text,
  Flex,
  IconButton,
  Spacer,
  Spinner,
  FormControl,
  Input,
} from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { setChats } from "../reducers/chat.reducer";
import { FaArrowLeft } from "react-icons/fa";
import { getSender } from "../config/chat-logics";
import { useEffect, useState } from "react";
import messagesSvc from "../pages/messages/messages.service";
import { toast } from "react-toastify";
import ScrollableChat from "./scrollable-chat";
import io from "socket.io-client"

const ENDPOINT = "http://localhost:8001"
var socket, selectedChatCompare;

const SingleChat = ({ changedChats, setChangedChats }) => {
  const dispatch = useDispatch();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const [typing, setTyping] = useState(false);
  const [socketConnected, setSocketConnected] = useState(false)

  // dispatch(setChats(response));
  const user = useSelector((root) => {
    console.log("in use selector in userp rofile page", root.User.loggedInUser);
    return root.User.loggedInUser;
  });

  const chats = useSelector((root) => {
    console.log("in use selector chats my chats", root.Chat.chats);
    return root.Chat.chats;
  });
  const selectedChat = useSelector((root) => {
    console.log("in use selector selected chat", root.Chat.selectedChat);
    return root.Chat.selectedChat;
  });
   console.log("messages", messages);


     useEffect(() => {
       socket = io(ENDPOINT);
       socket.emit("setup", user);
       socket.emit("connection", () => {
         setSocketConnected(true);
       });
     }, []);

     useEffect(() => {
       socket.on("message received", (newMessageReceived) => {
         if (
           !selectedChatCompare || // if chat is not selected or doesn't match current chat
           selectedChatCompare._id !== newMessageReceived.chat._id
         ) {
           setMessages([...messages, newMessageReceived]);
           //  if (!notification.includes(newMessageReceived)) {
           //    setNotification([newMessageRecieved, ...notification]);
           //    setFetchAgain(!fetchAgain);
           //  }
         } else {
           setMessages([...messages, newMessageReceived]);
         }
       });
     }); 

  const fetchMessages = async () => {
    if (!selectedChat) return;

    try {
      setLoading(true);

      const data  = await messagesSvc.fetchAllMessages(selectedChat._id);

   console.log("data in fetch messages", data);
      setMessages(data);
      setLoading(false);

      socket.emit("join chat",selectedChat._id)

      // socket.emit("join chat", selectedChat._id);
    } catch (error) {
      console.log("exception in fetschmessage", error.message);
    }
  };

  const sendMessage = async (event) => {
    if (event.key === "Enter" && newMessage) {
      try {
        let data = {
          content: newMessage,
          chatId: selectedChat._id,
        };
       
        let response  = await messagesSvc.createMessage(data);
        console.log("resonse for send message create message", { response });

        socket.emit("newMessage", response);
        let shallowMessages = [...messages, response]
        setMessages(shallowMessages);
         setNewMessage("");
      } catch (error) {
        console.log("error in send message", sendMessage);
        toast.warning("could not send message");
      }
    }
  };

  const typingHandler = (e) => {
    setNewMessage(e.target.value);

    //  if (!socketConnected) return;

    //typing indicator logic
    //  if (!typing) {
    //    setTyping(true);
    //    socket.emit("typing", selectedChat._id);
    //  }
    //  let lastTypingTime = new Date().getTime();
    //  var timerLength = 3000;
    //  setTimeout(() => {
    //    var timeNow = new Date().getTime();
    //    var timeDiff = timeNow - lastTypingTime;
    //    if (timeDiff >= timerLength && typing) {
    //     //  socket.emit("stop typing", selectedChat._id);
    //      setTyping(false);
    //    }
    //  }, timerLength);
  };

  console.log("selected chats in single chats", selectedChat);




  useEffect(() => {
    fetchMessages();
    selectedChatCompare = selectedChat
  }, [selectedChat]);
  return (
    <Box h="100%" w="100%" color="black">
      {selectedChat ? (
        <>
          <Text
            fontSize={{ base: "28px", md: "30px" }}
            pb={3}
            px={2}
            w="100%"
            fontFamily="Work sans"
            d="flex"
            justifyContent={{ base: "space-between" }}
            alignItems="center"
          >
            {" "}
            <IconButton
              d={{ base: "flex", md: "none" }}
              icon={<FaArrowLeft />}
              onClick={() => setSelectedChat("")}
            />
            {!selectedChat.isGroupChat ? (
              <>{getSender(user, selectedChat.users).toUpperCase()}</>
            ) : (
              <>
                {selectedChat.chatName.toUpperCase()}
                {/* <UpdatedGroupChatModal changedChats={changedChats} setChangedChats={setChangedChats}/> */}
              </>
            )}
          </Text>
          <Flex
            flexDirection="column"
            justifyContent="flex-end"
            p={3}
            bg="#E8E8E8"
            w="100%"
            h="90%"
            borderRadius="lg"
            overflowY="hidden"
          >
            {loading ? (
              <>
                <Spinner
                  size="xl"
                  w={20}
                  h={20}
                  alignSelf="center"
                  margin="auto"
                />
              </>
            ) : (
              <>
                <>
                <Flex flexDirection="column" overflowY="scroll" scrollB>
                <ScrollableChat messages={messages}/>



                </Flex>
                </>
                <FormControl
                  onKeyDown={sendMessage}
                  id="first-name"
                  isRequired
                  mt={3}
                >
                  <Input
                    variant="filled"
                    bg="#E0E0E0"
                    placeholder="Enter a message.."
                    value={newMessage}
                    onChange={typingHandler}
                  />
                </FormControl>
              </>
            )}
          </Flex>
        </>
      ) : (
        <Flex alignItems="center" justifyContent="center" h="100%">
          <Text color="black" fontSize="3xl" pb={3}>
            Click on a user to start chatting
          </Text>
        </Flex>
      )}
    </Box>
  );
};

export default SingleChat;
