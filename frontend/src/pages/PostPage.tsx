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
        console.log(error)
        setError(!!error)
      }
      setIsLoading(false);
    }

    fetchPostData();
  }, [id])

  const removePost = (postId: string) => {
    navigate("/");
  };

  const editPost = (postId: string, description: string, image: object) => {
    setPostData(prevState => {
      const updatedPost: PostType[] = [];
      updatedPost.push({
        ...prevState,
        description,
        image
      });
      return updatedPost;
    });
  };
  
  if (isLoading) return <Loading />;
  if (error) return <p>An error occurred</p>;

  return (
    <Post post={postData!} removePost={removePost} editPost={editPost} />
  );
};

export default PostPage;