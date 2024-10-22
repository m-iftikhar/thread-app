import { Flex, Spinner, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import useShowToast from "../../hooks/useShowToast";
import Post from "../components/Posts.jsx";
import postsAtom from "../../atom/postAtom.js";
import { useRecoilState } from "recoil";
const HomePage = () => {
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useRecoilState(postsAtom);
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
				console.log(data);
				setPosts(data);
			} catch (error) {
				showToast("Error", error.message, "error");
			} finally {
				setLoading(false);
			}
		};
		getFeedPosts();
	}, [showToast, setPosts]);

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
