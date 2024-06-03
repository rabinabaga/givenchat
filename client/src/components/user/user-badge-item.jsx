import { Badge } from "@chakra-ui/react";
import { FaWindowClose } from "react-icons/fa";
const UserBadgeItem = ({user, handleFunction}) => {
    return (
      <>
        <Badge
          px={2}
          py={1}
          borderRadius="lg"
          m={1}
          mb={2}
          variant="solid"
          fontSize={12}
          colorScheme="purple"
          cursor="pointer"
          onClick={handleFunction}
        >
          {user.name}
          {/* {admin === user._id && <span> (Admin)</span>} */}
          <FaWindowClose pl={1} />
        </Badge>
      </>
    );
}
 
export default UserBadgeItem;