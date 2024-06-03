import {
  Box,
  Button,
  Text,
  Tooltip,
  Flex,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  Input,
  Spinner,
} from "@chakra-ui/react";
import { FaSearch, FaBell } from "react-icons/fa";
import { useDisclosure } from "@chakra-ui/react";
import { useState } from "react";
import chatSvc from "../pages/chat/chat.service";
import { toast } from "react-toastify";
import UserListItem from "./user/user-list-item";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedChat } from "../reducers/chat.reducer";

const SideDrawer = () => {
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();

  const [loadingChat, setLoadingChat] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [loading, setLoading] = useState(false);
   const chats = useSelector((root) => {
     console.log("in use selector in userp rofile page", root.Chat.chats);
     return root.Chat.chats;
   });
    
  const handleSearch = async () => {
    setLoading(true);
    console.log("handle search");

    try {
      let response = await chatSvc.getAllUsers(search);
      console.log("response upp", response);
      if (response) {
        console.log(response);
        toast.success("these are your users");
        setSearchResults(response);
        setLoading(false);
        // setGamePlans(gamePlanCreated);
        // setLoading(false);
      }
    } catch (exception) {
      console.log("user profile page", exception);
    }
  };

  const accessChat = async (userId) => {
    setLoadingChat(true)
    try {
      let response = await chatSvc.getChatWithUser(userId);
      console.log("response access chat ", response);
      if (response) {
        console.log(response);
        toast.success("this is  your chat");
        setLoadingChat(false);
        dispatch(setSelectedChat(response))

              if (!chats.find((c) => c._id === response._id))
                setChats([data, ...chats]);
      }
    } catch (exception) {
      console.log("user profile page", exception);
    }
  };
  return (
    <>
      {/* to hold the search input heading and profile */}
      {/* on hovering the search input, tooltip appears */}
      <Flex display="flex" alignItems="center" justify="space-between" p="3">
        <Flex
          w={{ base: "100vw", md: "31%" }}
          bg="white"
          gap="10px"
          onClick={onOpen}
          alignItems="baseline"
          justify="center"
          borderRadius="2px"
        >
          <FaSearch />
          <Text mt="2" verticalAlign="center" fontWeight="bold">Search</Text>
        </Flex>
        <Text>Talkative</Text>
        <Text fontSize="2xl" m={3}>
          <FaBell />
        </Text>
      </Flex>
      <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth="1px">Search Users</DrawerHeader>
          <DrawerBody>
            <Flex>
              <Input
                placeholder="search by name or email"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <Button onClick={handleSearch}>Go</Button>
            </Flex>
            {loading ? (
              <>..Loading</>
            ) : (
              searchResults?.map((user) => (
                <UserListItem
                  key={user._id}
                  user={user}
                  handleFunction={() => accessChat(user._id)}
                />
              ))
            )}
            {loadingChat && <Spinner ml="auto" display="flex" />}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default SideDrawer;
