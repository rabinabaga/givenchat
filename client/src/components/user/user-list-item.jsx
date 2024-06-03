import { Flex,Box, Text } from "@chakra-ui/react";
import { useSelector } from "react-redux";

const UserListItem = ({user, handleFunction}) => {
 
 const user_loggedIn = useSelector((root) => {
   console.log("in use selector in userp rofile page", root.User.loggedInUser);
   return root.User.loggedInUser;
 });

  return (
    
    <Flex
      onClick={handleFunction}
      cursor="pointer"
      bg="#E8E8E8"
      _hover={{
        background: "#38B2AC",
        color: "white",
      }}
      w="100%"
      d="flex"
      alignItems="center"
      color="black"
      px={3}
      py={2}
      mb={2}
      borderRadius="lg"
    >
    
      <Box>
        <Text>{user.name}</Text>
        <Text fontSize="xs">
          <b>Email : </b>
          {user.email}
        </Text>
      </Box>
    </Flex>
  );
     
}
 
export default UserListItem;