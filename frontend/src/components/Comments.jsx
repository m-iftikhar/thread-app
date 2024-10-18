import { Avatar, Divider, Flex, Text } from "@chakra-ui/react";
import { useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import Actions from "./Actions";

const Comment = ({likes,replies,createdAt,username,userAvatar,comments}) => {
    const [liked,setLiked]=useState(false);
	return (
		<>
			<Flex gap={4} py={2} my={2} w={"full"}>
				<Avatar src={userAvatar} size={"sm"} />
				<Flex gap={1} w={"full"} flexDirection={"column"}>
					<Flex w={"full"} justifyContent={"space-between"} alignItems={"center"}>
						<Text fontSize='sm' fontWeight='bold'>
							{username}
						</Text>
                    <Flex gap={2} alignItems={"center"}>
					<Text>{createdAt}</Text>
                    <BsThreeDots/>
				</Flex>
			</Flex> 
               <Text> {comments}</Text>
               <Actions liked={liked} setLiked={setLiked} likes={likes} replies={replies}/>
        </Flex>
</Flex>
			
		</>
	);
};

export default Comment;