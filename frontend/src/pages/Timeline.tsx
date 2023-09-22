import { useEffect, useState, useCallback } from "react";
import Posts from "../components/Post/Posts";
import PostForm from "../components/Post/PostForm";
import { PostType } from "../Types/Post.types";
import Loading from "../ui/Loading";
import usePostActions from "../hooks/usePostActions";

const Timeline = ({ socket }) => {
  const { fetchFeedPosts } = usePostActions();

  const [feedPosts, setFeedPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPosts = useCallback(async () => {
    const posts = await fetchFeedPosts();
    setFeedPosts(posts);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const removePost = (postId: string) => {
    setFeedPosts((prevState) =>
      prevState.filter((post: PostType) => post._id !== postId)
    );
  };

  const updatePost = (postId: string, description: string, image: object) => {
    setFeedPosts((prevState) => {
      const updatedPosts: PostType[] = [];
      prevState.forEach((post) => {
        if (post._id === postId) {
          updatedPosts.push({
            ...post,
            description: description,
            postImage: image && URL.createObjectURL(image),
          });
        } else {
          updatedPosts.push(post);
        }
      });
      return updatedPosts;
    });
  };

  if (loading) return <Loading />;

  return (
    <>
      <PostForm fetchPosts={fetchPosts} />
      {feedPosts.length > 0 ? (
        <Posts
          posts={feedPosts}
          socket={socket}
          removePost={removePost}
          updatePost={updatePost}
        />
      ) : (
        <div className="text-center text-gray-800 text-xl">
          There are no posts yet.
        </div>
      )}
    </>
  );
};

export default Timeline;
