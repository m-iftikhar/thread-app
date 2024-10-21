import UserHeader from "../components/UserHeader";
import UserPost from "../components/UserPost";
import { useParams } from "react-router-dom";
import useShowToast from "../../hooks/useShowToast";
import { useEffect, useState } from "react";
import { Flex, Spinner } from "@chakra-ui/react";
import Post from "../components/Posts";

const UserPage = () => {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]); // State to hold user posts
  const [loading, setLoading] = useState(true);
  const [fetchingPosts, setFetchingPosts] = useState(true); // State for fetching posts
  const { username } = useParams();
  const showToast = useShowToast();

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await fetch(`/api/users/profile/${username}`);
        const data = await res.json();
        if (data.error) {
          showToast("Error", data.error, "error");
          return;
        }
        setUser(data);
      } catch (error) {
        showToast("Error", error.message, "error");
      } finally {
        setLoading(false);
      }
    };
    getUser();
  }, [username, showToast]);

  useEffect(() => {
    const getUserPosts = async () => {
      try {
        setFetchingPosts(true);
        const res = await fetch(`/api/posts/user/${username}`); // Update this URL based on your API
        const data = await res.json();
        if (data.error) {
          showToast("Error", data.error, "error");
          return;
        }
        setPosts(data); // Assuming data is an array of posts
      } catch (error) {
        showToast("Error", error.message, "error");
      } finally {
        setFetchingPosts(false);
      }
    };

    if (user) {
      getUserPosts();
    }
  }, [user, username, showToast]);

  if (loading) {
    return (
      <Flex justifyContent={"center"}>
        <Spinner size={"xl"} />
      </Flex>
    );
  }

  if (!user) return <h1>User not found</h1>;

  return (
    <div>
      <UserHeader user={user} />
      {fetchingPosts && (
        <Flex justifyContent={"center"} my={12}>
          <Spinner size={"xl"} />
        </Flex>
      )}
      {!fetchingPosts && posts.length === 0 && <h1>User has no posts.</h1>}
      {posts.map((post) => (
        <Post key={post._id} post={post} postedBy={post.postedBy} />
      ))}
    </div>
  );
}

export default UserPage;
