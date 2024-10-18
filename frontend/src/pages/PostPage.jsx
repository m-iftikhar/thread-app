import React, { useState } from 'react';
import { Flex, Text, Box, Avatar, Image,Button } from "@chakra-ui/react";
import { BsThreeDots } from "react-icons/bs";
import Actions from '../components/Actions';
import { Menu, MenuButton, MenuList, MenuItem } from '@chakra-ui/react';
import { Divider } from '@chakra-ui/react';
import Comment from '../components/Comments';
const PostPage = ({likes,replies}) => {
  const [liked, setLiked] = useState(false); // Local state for liked/unliked
  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = "/post1.png";
    link.download = 'downloaded-image.jpg'; // The default name for the image when downloaded
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  const copyToClipboard = () => {
    const postLink = `${window.location.origin}/post/123`; // Generate the full post link

    // Copy the post link to the clipboard
    navigator.clipboard.writeText(postLink)
      .then(() => {
        alert("Post link copied to clipboard!");
      })
      .catch((error) => {
        console.error("Failed to copy link: ", error);
      });
  };

  return (
    <>
      <Flex gap={3} mb={4} py={5} >
        {/* Left section with Avatar and smaller Avatars */}
        <Flex flexDirection={"column"} alignItems={"center"}>
          <Avatar size="md" name="M Iftikhar" src="/pic2.jpg" />
       </Flex>

        {/* Right section with post details */}
        <Flex flex={1} flexDirection={"column"} gap={2}>
          <Flex justifyContent={"space-between"} w={"full"}>
            <Flex w={"full"} alignItems={"center"}>
              <Text fontSize={"sm"} fontWeight={"bold"}>
                M Iftikhar
              </Text>
              <Image src="/verified.png" w={4} h={4} ml={1} alt="Verified" />
            </Flex>
             

            {/* Menu with options */}
            <Flex gap={4} alignItems={"center"}>
              <Text fontSize={"sm"} color={"gray.500"}>
                1d
              </Text>
              <Menu>
                <MenuButton>
                  <BsThreeDots />
                </MenuButton>
                <MenuList>
                  <MenuItem onClick={copyToClipboard}>Copy Post Link</MenuItem>
                  <MenuItem onClick={handleDownload}>download image</MenuItem>
                </MenuList>
              </Menu>
            </Flex>
          </Flex>

          {/* Post title */}
          <Text fontSize={"sm"}>This is markzuckerberg image</Text>

          {/* Post image */}
          <Box borderRadius={6} overflow={"hidden"} border={"1px solid"} borderColor={"gray.light"} w={"full"}>
            <Image
              src="/post1.png"
              alt="Post image"
              w={"full"}
            />
          </Box>

          {/* Actions section */}
          <Flex gap={3} my={1}>
            <Actions liked={liked} setLiked={setLiked} likes={likes} replies={replies}  /> {/* Pass props to Actions */}
          </Flex>
        </Flex>
      </Flex>
      <Divider my={4} />
      <Flex justifyContent={"space-between"}>
				<Flex gap={2} alignItems={"center"}>
					<Text fontSize={"2xl"}>👋</Text>
					<Text color={"gray.light"}>Get the app to like, reply and post.</Text>
				</Flex>
				<Button>Get</Button>
			</Flex>

			<Divider my={4} />
      <Comment likes={23} replies={12} comments="looks really good!" username="michale" createdAt="2d" userAvatar="https://bit.ly/code-beast"/>
      <Comment likes={22} replies={4} comments="awesome!" username="kentdods" createdAt="1d" userAvatar="https://bit.ly/kent-c-dodds"/>
      <Comment likes={9} replies={0} comments="nice!" username="ryan folrence" createdAt="justnow" userAvatar="https://bit.ly/ryan-florence"/>
      
      
    </>
  );
};

export default PostPage;
