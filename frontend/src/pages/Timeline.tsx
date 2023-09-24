import { useEffect, useState } from "react";
import { Socket } from "socket.io-client";
import { PostType } from "../Types/Post.types";
import useAxios from "../hooks/useAxios";
import PostForm from "../components/Post/PostForm";
import Posts from "../components/Post/Posts";
import PostsSkeleton from "../skeletons/PostsSkeleton";

type Props = {
  socket: Socket;
};

const Timeline: React.FC<Props> = ({ socket }) => {
  const [posts, setPosts] = useState<PostType[]>([]);

  const {
    data: feedPosts,
    loading: feedPostsIsLoading,
    reFetch: reFetchPosts,
  } = useAxios<PostType[]>(`http://localhost:5000/api/v1/posts`, "get");

  useEffect(() => {
    if (feedPosts) {
      setPosts(feedPosts);
    }
  }, [feedPosts]);

  const removePost = (postId: string) => {
    setPosts((prevState) =>
      prevState.filter((post: PostType) => post._id !== postId)
    );
  };

  const updatePost = (postId: string, description: string, image: string) => {
    setPosts((prevState) => {
      const updatedPosts: PostType[] = [];
      prevState.forEach((post) => {
        if (post._id === postId) {
          updatedPosts.push({
            ...post,
            description: description,
            postImage: image,
          });
        } else {
          updatedPosts.push(post);
        }
      });
      return updatedPosts;
    });
  };

  return (
    <>
      <PostForm fetchPosts={reFetchPosts} />
      {feedPostsIsLoading ? (
        <PostsSkeleton postsNumber={2} />
      ) : posts.length > 0 ? (
        <Posts
          posts={posts}
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
