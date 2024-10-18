import React from 'react';
import { Flex, Text, Box } from "@chakra-ui/react";

const Actions = ({ liked, setLiked, likes, replies }) => {
  const handleLikeAndUnlike = () => {
    setLiked(prev => !prev); // Toggle the liked state
  };

  return (
    <Flex flexDirection='column'>
      <Flex gap={3} my={2} onClick={(e) => e.preventDefault()}>
        <svg
          aria-label='Like'
          color={liked ? "rgb(237, 73, 86)" : ""}
          fill={liked ? "rgb(237, 73, 86)" : "transparent"}
          height='19'
          role='img'
          viewBox='0 0 24 22'
          width='20'
          onClick={handleLikeAndUnlike}
        >
          <path
            d='M1 7.66c0 4.575 3.899 9.086 9.987 12.934.338.203.74.406 1.013.406.283 0 .686-.203 1.013-.406C19.1 16.746 23 12.234 23 7.66 23 3.736 20.245 1 16.672 1 14.603 1 12.98 1.94 12 3.352 11.042 1.952 9.408 1 7.328 1 3.766 1 1 3.736 1 7.66Z'
            stroke='currentColor'
            strokeWidth='2'
          />
        </svg>

        <svg
          aria-label='Comment'
          height='20'
          role='img'
          viewBox='0 0 24 24'
          width='20'
        >
          <title>Comment</title>
          <path
            d='M20.656 17.008a9.993 9.993 0 1 0-3.59 3.615L22 22Z'
            fill='none'
            stroke='currentColor'
            strokeLinejoin='round'
            strokeWidth='2'
          />
        </svg>

        <svg
          aria-label='Repost'
          height='20'
          width='20'
          viewBox='0 0 24 24'
          fill='none'
          stroke='currentColor'
        >
          <path
            d='M7 10l-4 4 4 4m10-4h-8a4 4 0 0 1-4-4V8a4 4 0 0 1 4-4h8m3 12l4-4-4-4'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
        </svg>

        <svg
          aria-label='Share'
          height='20'
          width='20'
          viewBox='0 0 24 24'
          fill='none'
          stroke='currentColor'
        >
          <path
            d='M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4m6-4l6-6m0 0l6 6m-6-6v12'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
        </svg>
      </Flex>

      <Flex gap={2} alignItems={"center"}>
        <Text color={"gray.light"} fontSize='sm'>
          {replies} replies
        </Text>
        <Box w={0.5} h={0.5} borderRadius={"full"} bg={"gray.light"} />
        <Text color={"gray.light"} fontSize='sm'>
          {likes} likes
        </Text>
      </Flex>
    </Flex>
  );
};

export default Actions;