import {
  Avatar,
  AvatarBadge,
  Flex,
  Image,
  Stack,
  Text,
  WrapItem,
  useColorModeValue,
  useColorMode,
} from "@chakra-ui/react";
import userAtom from "../../atom/userAtom.js";
import { useRecoilValue,useRecoilState } from "recoil";
import {BsCheck2All,BsFillImageFill} from "react-icons/bs";
import { selectedConversationAtom } from "../../atom/messagesAtom.js";
const Conversation = ({ conversation, isOnline}) => {
  const user = conversation.participants[0];
  const lastMessage = conversation.lastMessage;
  const currentUser = useRecoilValue(userAtom);
  const [selectedConversation, setSelectedConversation] = useRecoilState(selectedConversationAtom);
	const colorMode = useColorMode();


  return (
    <Flex
      gap={4}
      alignItems="center"
      p="1"
      _hover={{
        cursor: "pointer",
        bg: useColorModeValue("gray.100", "gray.700"),
      }}
      onClick={() =>
				setSelectedConversation({
					_id: conversation._id,
					userId: user._id,
					userProfilePic: user.profilePic,
					username: user.username,
					mock: conversation.mock,
				})
			}
			bg={
				selectedConversation?._id === conversation._id ? (colorMode === "light" ? "gray.400" : "gray.dark") : ""
			}
      borderRadius="md"
    >
      <WrapItem>
        <Avatar
          size={{ base: "xs", sm: "sm", md: "md" }}
          src={user.profilePic || "https://bit.ly/broken-link"}
          name={user.username}
        >
         {isOnline ? <AvatarBadge boxSize='1em' bg='green.500' /> : ""}
        </Avatar>
      </WrapItem>
      <Stack direction="column" spacing={0} fontSize="sm">
        <Text fontWeight="700" display="flex" alignItems="center">
          {user.username} <Image src="/verified.png" w={4} h={4} ml={1} alt="Verified badge" />
        </Text>
        <Text fontSize={"xs"} display={"flex"} alignItems={"center"} gap={1}>
					{currentUser._id === lastMessage.sender ? (
						// <Box color={lastMessage.seen ? "blue.400" : ""}>
							<BsCheck2All size={16} />
						// </Box>
					) : (
						""
					)}
					{lastMessage.text.length > 18
						? lastMessage.text.substring(0, 18) + "..."
						: lastMessage.text || <BsFillImageFill size={16} />}
				</Text>
      </Stack>
    </Flex>
  );
};

export default Conversation;
