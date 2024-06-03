import {Container, Row, Col, Form} from "react-bootstrap";
import {IoSendSharp} from "react-icons/io5"
import "../assets/css/chats.css"
import { Text,Button,Box, Flex, Spacer} from "@chakra-ui/react";
import { useSelector } from "react-redux";
import SideDrawer from "../components/side-drawer";
import MyChats from "../components/my-chats";
import ChatBox from "../components/chat-box";
import {Heading} from "@chakra-ui/react"
import { useState } from "react";
export function ChatPage(){
     let loggedInUser = useSelector((root) => {
        console.log(
          "in use selector in userp rofile page",
          root.User.loggedInUser
        );
        return root.User.loggedInUser;
      });
      const [changedChats, setChangedChats] = useState(false);

    return (
      <>
        <div style={{ width: "100%" }}>
          {loggedInUser && <SideDrawer />}

          <Flex color="white" height="100vh" w="100%" justify="space-between" p="10px">
          
              {loggedInUser && <MyChats changedChats={changedChats} setChangedChats={setChangedChats}/>}
            
             {loggedInUser && <ChatBox />}
          </Flex>
        </div>
      </>
    );
}

