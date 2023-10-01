import { useState, useEffect } from "react";
import { PostType } from "../Types/Post.types";
import { useNavigate, useParams } from "react-router-dom";
import useAxios from "../hooks/useAxios";
import Post from "../components/Post/Post";
import PostSkeleton from "../skeletons/PostSkeleton";
import { Socket } from "socket.io-client";

type Props = {
  socket: Socket;
};

const PostPage: React.FC<Props> = ({ socket }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [post, setPost] = useState<PostType>();

  const {
    data: postData,
    loading: postDataIsLoading,
    error: postDataHasError,
  } = useAxios<PostType>(
    `https://socio-irdl.onrender.com/api/v1/posts/${id}`,
    "get",
    undefined,
    false
  );

  useEffect(() => {
    if (postData) {
      setPost(postData);
    }
  }, [postData]);

  const removePost = () => {
    navigate("/");
  };

  const updatePost = (
    postId: string,
    description: string,
    image: string
  ): void => {
    setPost((prevState) => {
      const updatedPostData: PostType = {
        userId: prevState!.userId,
        username: prevState!.username,
        firstName: prevState!.firstName,
        lastName: prevState!.lastName,
        userPicture: prevState!.userPicture,
        createdAt: prevState!.createdAt,
        updatedAt: prevState!.updatedAt,
        likes: prevState!.likes,
        _id: postId,
        description: description,
        postImage: image,
      };

      return updatedPostData;
    });
  };

  useEffect(() => {
    if (postDataHasError) {
      navigate("/error");
    }
  }, [navigate, postDataHasError]);

  if (postDataHasError) return;

  return (
    <>
      {postDataIsLoading || !post ? (
        <PostSkeleton />
      ) : (
        <Post
          post={post}
          removePost={removePost}
          updatePost={updatePost}
          socket={socket}
        />
      )}
    </>
  );
};

export default PostPage;
