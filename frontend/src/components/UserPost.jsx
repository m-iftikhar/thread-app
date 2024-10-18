import React, { useState } from 'react';
import { Flex, Text, Box, Avatar, Image } from "@chakra-ui/react";
import { BsThreeDots } from "react-icons/bs";
import { Link } from "react-router-dom";
import Actions from "./Actions";
import { Menu, MenuButton, MenuList, MenuItem } from '@chakra-ui/react';

const UserPost = ({ likes, replies, postImg, postTitle }) => {
  const [liked, setLiked] = useState(false);
   // Local state for liked/unliked
   const handleDownload = () => {
    const link = document.createElement('a');
    link.href = postImg;
    link.download = 'downloaded-image.jpg'; // The default name for the image when downloaded
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  const copyToClipboard = () => {
    // Dynamically generate the full post link using the current location's origin (e.g., http://localhost:3000)
    const postLink = `${window.location.origin}/post/123`;

    // Copy the generated post link to clipboard
    navigator.clipboard.writeText(postLink)
      .then(() => {
        alert("Post link copied to clipboard!");
      })
      .catch((error) => {
        console.error("Failed to copy link: ", error);
      });
    };
  return (
    <Link to={"/markzuckerberg/post/1"}>
      <Flex gap={3} mb={4} py={5}>
        <Flex flexDirection={"column"} alignItems={"center"}>
          <Avatar size="md" name="M Iftikhar" src="/pic2.jpg" />
          <Box w="1px" h={"full"} bg="gray.200" my={2}></Box>
          <Box position={"relative"} w={"full"}>
            <Avatar
              size="xs"
              name="John Doe"
              src="https://bit.ly/dan-abramov"
              position={"absolute"}
              top={"0px"}
              left="15px"
              padding={"2px"}
            />
            <Avatar
              size="xs"
              name="John Doe"
              src="https://bit.ly/sage-adebayo"
              position={"absolute"}
              bottom={"0px"}
              right="-5px"
              padding={"2px"}
            />
            <Avatar
              size="xs"
              name="John Doe"
              src="https://bit.ly/prosper-baba"
              position={"absolute"}
              bottom={"0px"}
              left="4px"
              padding={"2px"}
            />
          </Box>
        </Flex>
        <Flex flex={1} flexDirection={"column"} gap={2}>
          <Flex justifyContent={"space-between"} w={"full"}>
            <Flex w={"full"} alignItems={"center"}>
              <Text fontSize={"sm"} fontWeight={"bold"}>
                markzuckerberg
              </Text>
              <Image src="/verified.png" w={4} h={4} ml={1} alt="Verified" />
            </Flex>
            <Flex gap={4} alignItems={"center"}>
              <Text fontSize={"sm"} color={"gray.500"}>
                1d
              </Text>
              <Menu>
              <MenuButton >
              <BsThreeDots/>
                      </MenuButton>
          <MenuList>
            <MenuItem onClick={copyToClipboard}>Copy Post Link</MenuItem>
            <MenuItem onClick={handleDownload}>download image</MenuItem>
            
          </MenuList>
                     </Menu>
          
              
              {/* <BsThreeDots /> */}
            </Flex>
          </Flex>
          <Text fontSize={"sm"}>{postTitle}</Text>

          {postImg && (
            <Box borderRadius={6} overflow={"hidden"} border={"1px solid"} borderColor={"gray.light"}>
              <Image
                src={postImg}
                alt="Post image"
                w="full"
                h={["300px", "400px", "500px"]} // Adjust height responsively
                objectFit="cover" // Ensures the image covers the area
                borderRadius="md" // Optional: Adds rounded corners
                fallbackSrc="fallback-image-url.jpg" // Replace with a valid fallback image
              />
            </Box>
          )}
          <Flex gap={3} my={1}>
            <Actions liked={liked} setLiked={setLiked} likes={likes} replies={replies} /> {/* Pass props to Actions */}
          </Flex>
        </Flex>
      </Flex>
    </Link>
  );
};

export default UserPost;