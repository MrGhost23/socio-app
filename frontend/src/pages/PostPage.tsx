import { useState, useEffect } from "react";
import { PostType } from "../Types/Post.types";
import { useNavigate, useParams } from "react-router-dom";
import useAxios from "../hooks/useAxios";
import Post from "../components/Post/Post";
import PostSkeleton from "../skeletons/PostSkeleton";

const PostPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [post, setPost] = useState<PostType>();

  const { data: postData, loading: postDataIsLoading } = useAxios<PostType>(
    `http://localhost:5000/api/v1/posts/${id}`,
    "get"
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

  return (
    <>
      {postDataIsLoading || !post ? (
        <PostSkeleton />
      ) : (
        <Post post={post} removePost={removePost} updatePost={updatePost} />
      )}
    </>
  );
};

export default PostPage;
