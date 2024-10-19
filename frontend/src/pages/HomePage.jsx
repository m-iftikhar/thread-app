import { Flex, Spinner, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import useShowToast from "../../hooks/useShowToast";
import Post from "../components/Posts.jsx";

const HomePage = () => {
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]); // Initialize posts state
  const showToast = useShowToast();

  useEffect(() => {
    const getFeedPosts = async () => {
      setLoading(true);
      setPosts([]);
      try {
        const res = await fetch("/api/posts/feed");
        const data = await res.json();
        if (data.error) {
          showToast("Error", data.error, "error");
          return;
        }
        setPosts(data); // Set fetched posts
      } catch (error) {
        showToast("Error", error.message, "error");
      } finally {
        setLoading(false);
      }
    };
    getFeedPosts();
  }, [showToast]);

  return (
    <>
      {loading ? (
        <Flex justify='center' align='center' height='100vh'>
          <Spinner size='xl' />
        </Flex>
      ) : (
        <>
          {posts.length === 0 ? (
            <Text textAlign='center'>Follow some users to see the feed</Text>
          ) : (
            posts.map((post) => (
              <Post key={post._id} post={post} postedBy={post.postedBy} />
            ))
          )}
        </>
      )}
    </>
  );
};

export default HomePage;
