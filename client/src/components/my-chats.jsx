import { useDispatch, useSelector } from "react-redux";
import { setChats, setSelectedChat } from "../reducers/chat.reducer";
import { useEffect, useState } from "react";
import chatSvc from "../pages/chat/chat.service";
import { Flex, Text, Button, Heading } from "@chakra-ui/react";
import { toast } from "react-toastify";
import { Box } from "@chakra-ui/layout";
import { getSender } from "../config/chat-logics";
import { FaPlus } from "react-icons/fa";
import { Stack } from "@chakra-ui/react";
import GroupChatModal from "./miscellaneous/group-chat-modal";

const MyChats = ({changedChats, setChangedChats}) => {
  
  const dispatch = useDispatch();

  //we need selected chat, chats and logged in user from redux

  const [loggedUser, setLoggedUser] = useState({});


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

  const fetchChats = async () => {
    try {
      let response = await chatSvc.fetchChats();
      console.log("response fetch chat ", response);
      if (response) {
        console.log("fetch chats", response);
        toast.success("this is  your chat");

        dispatch(setChats(response));
      
      }
    } catch (exception) {
      console.log("user profile page", exception);
    }
  };
  useEffect(() => {
    setLoggedUser(user);
    fetchChats();
  },[changedChats]);

  console.log("set logged user", loggedUser);

  return (
    <>
      <Flex
        flexDir="column"
        w={{ base: "100vw", md: "31%" }}
        p="3"
        color="black"
        bg="white"
      >
        <Flex w="100%" justify="space-between">
          <Heading>My Chats</Heading>
          <GroupChatModal handleChangedChat={()=>{setChangedChats(true)}}>
            <Flex
              onMouseEnter={() => {
                document.body.style.cursor = "pointer";
              }}
              gap="20px"
              justify="space-between"
            >
              New Group Chat <FaPlus />
            </Flex>
          </GroupChatModal>
        </Flex>

        <Flex
          flexDir="column"
          p="3"
          h="100%"
          w="100%"
          bg="#F8F8F8"
          overflowY="hidden"
        >
          {chats? (
            <>
              <Stack overflowY="scroll">
                {chats?.map((chat) => {
                  return (
                    <Box
                      onClick={() => {
                        dispatch(setSelectedChat(chat));
                      }}
                      bg={selectedChat === chat ? "#38B2AC" : "#E8E8E8"}
                      color={selectedChat === chat ? "white" : "black"}
                      px={3}
                      py={2}
                      borderRadius="lg"
                      key={chat._id}
                    >
                      <Text>
                        {!chat.isGroupChat ? (
                          <>{getSender(loggedUser, chat.users)}</>
                        ) : (
                          <>{chat.chatName}</>
                        )}
                      </Text>
                    </Box>
                  );
                })}
              </Stack>
            </>
          ) : (
            <>Loading...</>
          )}
        </Flex>
      </Flex>
    </>
  );
};

export default MyChats;
