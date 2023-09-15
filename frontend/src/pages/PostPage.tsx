import { useState, useEffect } from "react";
import axios from 'axios';
import Post from '../components/Post/Post';
import { PostType } from "../Types/Post.types";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../ui/Loading";

const PostPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [postData, setPostData] = useState<PostType>();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchPostData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/v1/posts/${id}`);
        setPostData(response.data);
      } catch (error) {
        setError(!!error)
      }
      setIsLoading(false);
    }

    fetchPostData();
  }, [id])

  const removePost = () => {
    navigate("/");
  };

  const updatePost = (postId: string, description: string, image: string): void => {
    setPostData((prevState) => {
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
        postImage: image
      };

      return updatedPostData;
    });
  };
  
  if (isLoading) return <Loading />;
  if (error) return <p>An error occurred</p>;

  return (
    <Post post={postData!} removePost={removePost} updatePost={updatePost} />
  );
};

export default PostPage;