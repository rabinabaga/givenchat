import {
  Button,
  FormControl,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  Input,
  Box,
} from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import chatSvc from "../../pages/chat/chat.service";
import { useEffect, useState } from "react";
import UserListItem from "../user/user-list-item";
import UserBadgeItem from "../user/user-badge-item";
import { setChats } from "../../reducers/chat.reducer";
import { useSelector } from "react-redux";

const GroupChatModal = ({ children, handleChangedChat }) => {
  const dispatch = useDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [groupChatName, setGroupChatName] = useState();

  const [selectedUsers, setSelectedUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const chats = useSelector((root) => {
    console.log("in use selector in userp rofile page", root.Chat.chats);
    return root.Chat.chats;
  });
  console.log("chats ingroup modal", chats);
  const handleSearch = async (query) => {
    setSearch(query);

    try {
      setLoading(true);
      let response = await chatSvc.getAllUsers(query);
      console.log("response upp", response);
      if (response) {
        setLoading(false);
        console.log(response);
        toast.success("these are your users for group chat");
        setLoading(false);
        setSearchResult(response);

        // setGamePlans(gamePlanCreated);
        // setLoading(false);
      }
    } catch (exception) {
      console.log("error in group chat creation", exception);
    }
  };

  const handleSubmit = async () => {
    if (!groupChatName || !selectedUsers) {
      toast.warning("please fill all the fields");
    }
    try {
      let createdGroup = await chatSvc.createGroup({
        name: groupChatName,
        users: JSON.stringify(selectedUsers.map((u) => u._id)),
      });

      if (createdGroup) {
        console.log("created gorup", createdGroup);
        dispatch(setChats([...chats, createdGroup]));
        console.log("chats ingroup modal", chats);
        onClose();
        toast.info("new group chat created");
        handleChangedChat();
      }
    } catch (exception) {
      console.log("createGroup exception", exception);
    }
  };

  const handleDelete = (delUser) => {
    console.log(
      "in handle function of handle delete when selected user deleted"
    );
    setSelectedUsers(selectedUsers.filter((sel) => sel._id !== delUser._id));
  };
  const handleGroup = async (userToAdd) => {
    if (selectedUsers.includes(userToAdd)) {
      toast.info("User already added");

      return;
    }
    setSelectedUsers([...selectedUsers, userToAdd]);
  };
  return (
    <>
      <span onClick={onOpen}>{children}</span>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
            fontSize="35px"
            fontFamily="Work sans"
            d="flex"
            justifyContent="center"
          >
            Create Group Chat
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody d="flex" flexDir="column" alignItems="center">
            <FormControl>
              <Input
                placeholder="Chat Name"
                mb={3}
                onChange={(e) => setGroupChatName(e.target.value)}
              />
            </FormControl>
            <FormControl>
              <Input
                placeholder="Add Users eg: John, Piyush, Jane"
                mb={1}
                onChange={(e) => handleSearch(e.target.value)}
              />
            </FormControl>
            {/* selected users */}
            <Box w="100%" d="flex" flexWrap="wrap">
              {selectedUsers.map((u) => (
                <UserBadgeItem
                  key={u._id}
                  user={u}
                  handleFunction={() => handleDelete(u)}
                />
              ))}
            </Box>
            {/* render searched users */}
            {loading ? (
              <>..Loading</>
            ) : (
              searchResult?.map((user) => (
                <UserListItem
                  key={user._id}
                  user={user}
                  handleFunction={() => handleGroup(user)}
                />
              ))
            )}
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleSubmit}>
              Create Chat
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default GroupChatModal;
