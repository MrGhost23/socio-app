import { useCallback, useEffect, useState } from "react";
import { PostType } from "../../Types/Post.types";
import axios from "axios";
import { Comment } from "../../Types/Comment.types";
import Card from "../../ui/Card";
import UserImage from "../User/UserImage";
import UserTag from "../User/UserTag";
import UserFullName from "../User/UserFullName";
import PostText from "./PostText";
import PostImage from "./PostImage";
import PostDate from "./PostDate";
import PostStats from "./PostStats";
import CommentForm from "../Comment/CommentForm";
import PostForm from "./PostForm";
import VerticalLine from "../../ui/VerticalLine";
import Comments from "../Comment/Comments";
import PostMenu from "./PostMenu";
import { useSelector } from "react-redux";
import { selectUser } from "../../store/slices/authSlice";

interface Likes {
  [key: string]: boolean;
}

type Props = {
  post: PostType;
  updatePost: (postId: string, description: string, image: object) => void;
  removePost: (postId: string) => void;
};

const Post: React.FC<Props> = ({ post, removePost, updatePost }) => {
  const { username } = useSelector(selectUser)!;
  const [likes, setLikes] = useState<Likes>(post.likes);

  const likeFunction = () => {
    setLikes((prevState) => {
      return {
        ...prevState,
        [username]: true,
      };
    });
  };

  const unLikeFunction = () => {
    setLikes((prevState) => {
      const updatedLikes = { ...prevState };
      delete updatedLikes[username];
      return updatedLikes;
    });
  };

  const [isEditing, setIsEditing] = useState(false);

  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const getPostComments = useCallback(() => {
    axios
      .get(`http://localhost:5000/api/v1/posts/${post._id}/comments`)
      .then((response) => {
        setComments(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  }, [post._id]);

  const removeCommentFunction = (commentId: string) => {
    setComments((prevState) =>
      prevState.filter((comment: Comment) => comment._id !== commentId)
    );
  };

  const editCommentFunction = (commentId: string, text: string) => {
    setComments((prevState) => {
      const updatedComments: Comment[] = [];
      prevState.forEach((comment) => {
        if (comment._id === commentId) {
          updatedComments.push({ ...comment, text });
        } else {
          updatedComments.push(comment);
        }
      });
      return updatedComments;
    });
  };

  useEffect(() => {
    getPostComments();
  }, [getPostComments]);

  if (isLoading) return;

  return (
    <Card className="px-8 py-6 !text-left">
      <div className="relative mb-2 flex flex-row justify-between gap-3">
        <div className="flex flex-col sm:flex-row gap-3">
          <UserImage
            className="w-14 !mb-0"
            src={post.userPicture}
            alt={post.firstName + " " + post.lastName}
            username={post.username}
          />
          <div className="flex flex-col items-start gap-1">
            <div className="flex flex-col">
              <div className="flex flex-col md:flex-row md:items-center md:gap-2">
                <UserFullName
                  fullName={post.firstName + " " + post.lastName}
                  username={post.username}
                />
                <UserTag username={post.username} />
              </div>
              <PostDate date={post.createdAt} id={post._id} />
            </div>
          </div>
        </div>
        <PostMenu
          postId={post._id}
          username={post.username}
          setIsEditing={setIsEditing}
          removePost={removePost}
        />
      </div>
      <div className="flex flex-col">
        {isEditing ? (
          <PostForm
            text={post.description}
            postImage={post.postImage}
            postId={post._id}
            setIsEditing={setIsEditing}
            updatePost={updatePost}
          />
        ) : (
          <>
            <PostText text={post.description} />
            {post.postImage && (
              <PostImage
                src={`http://localhost:5000/post_assets/${encodeURIComponent(
                  post.postImage
                )}`}
                alt=""
              />
            )}
          </>
        )}
        <VerticalLine className="my-2" />
        <PostStats
          likes={likes}
          comments={comments.length}
          postId={post._id}
          likeFunction={likeFunction}
          unLikeFunction={unLikeFunction}
        />
        <VerticalLine className="mb-5" />
        <Comments
          comments={comments}
          removeCommentFunction={removeCommentFunction}
          editCommentFunction={editCommentFunction}
        />
        <CommentForm postId={post._id} reFetchFunction={getPostComments} />
      </div>
    </Card>
  );
};

export default Post;
