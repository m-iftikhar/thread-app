import React, { useEffect, useState } from 'react';
import { Flex, Text, Box, Avatar, Image, Button, Spinner } from "@chakra-ui/react";
import { BsThreeDots } from "react-icons/bs";
import Actions from '../components/Actions';
import { Divider } from '@chakra-ui/react';
import Comment from '../components/Comments';
import useGetUserProfile from '../../hooks/useGetUserProfile';
import useShowToast from '../../hooks/useShowToast';
import { useRecoilState, useRecoilValue } from 'recoil';
import { useNavigate, useParams } from 'react-router-dom';
import { formatDistanceToNow } from "date-fns";
import userAtom from '../../atom/userAtom';
import postsAtom from '../../atom/postAtom';  // Added missing import
import { DeleteIcon } from "@chakra-ui/icons";  // Added missing import
import { Menu,MenuList,MenuButton,MenuItem } from '@chakra-ui/react';

const PostPage = ({ likes, replies }) => {
  const { user, loading } = useGetUserProfile();
  const [posts, setPosts] = useRecoilState(postsAtom);
  const showToast = useShowToast();
  const { pid } = useParams();
  const currentUser = useRecoilValue(userAtom);
  const navigate = useNavigate();

  const currentPost = posts[0];  // Assuming only one post is displayed

  useEffect(() => {
    const getPost = async () => {
      try {
        const res = await fetch(`/api/posts/${pid}`);
        const data = await res.json();
        if (data.error) {
          showToast("Error", data.error, "error");
          return;
        }
        setPosts([data]);
      } catch (error) {
        showToast("Error", error.message, "error");
      }
    };
    getPost();
  }, [pid, setPosts, showToast]);

  const handleDeletePost = async () => {
    try {
      if (!window.confirm("Are you sure you want to delete this post?")) return;
      const res = await fetch(`/api/posts/${currentPost._id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.error) {
        showToast("Error", data.error, "error");
        return;
      }
      showToast("Success", "Post deleted", "success");
      navigate(`/${user.username}`);
    } catch (error) {
      showToast("Error", error.message, "error");
    }
  };

  if (loading) {
    return (
      <Flex justifyContent={"center"}>
        <Spinner size={"xl"} />
      </Flex>
    );
  }

  if (!currentPost) return null;
  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = currentPost.img;
    link.download = 'downloaded-image.jpg'; // The default name for the image when downloaded
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  const copyToClipboard = () => {
    const postLink = currentPost.img; 
  
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
      <Flex>
        <Flex w={"full"} alignItems={"center"} gap={3}>
          <Avatar src={user.profilePic} size={"md"} name={user.username} />
          <Flex>
            <Text fontSize={"sm"} fontWeight={"bold"}>
              {user.username}
            </Text>
            <Image src='/verified.png' w='4' h={4} ml={4} />
          </Flex>
        </Flex>
        <Flex gap={4} alignItems={"center"}>
          <Text fontSize={"xs"} width={36} textAlign={"right"} color={"gray.light"}>
            {formatDistanceToNow(new Date(currentPost.createdAt))} ago
          </Text>
          {/* {currentUser?._id === user._id && (
            <DeleteIcon size={20} cursor={"pointer"} onClick={handleDeletePost} />
          )} */}
        </Flex>
      </Flex>
       <Flex justifyContent={'space-between'}>
      <Text my={3}>{currentPost.text}</Text>
      <Menu>
       <MenuButton>
              <BsThreeDots />
         </MenuButton>
               <MenuList>
                <MenuItem onClick={copyToClipboard}>Copy Post Link</MenuItem>
              <MenuItem onClick={handleDownload}>download image</MenuItem>
              {currentUser?._id === user._id && (
            <MenuItem onClick={handleDeletePost}>Delete Image</MenuItem>
          )}

           </MenuList>
          </Menu> 
          </Flex>

      {currentPost.img && (
        <Box borderRadius={6} overflow={"hidden"} border={"1px solid"} borderColor={"gray.light"}>
          <Image src={currentPost.img} w={"full"} />
        </Box>
      )}

      <Flex gap={3} my={3}>
        <Actions post={currentPost} />
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

      {/* Uncomment to display replies */}
      {/* {currentPost.replies.map((reply) => (
        <Comment
          key={reply._id}
          reply={reply}
          lastReply={reply._id === currentPost.replies[currentPost.replies.length - 1]._id}
        />
      ))} */}
    </>
  );
};

export default PostPage;


