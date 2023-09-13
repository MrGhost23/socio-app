import { useEffect, useState } from "react";
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

type Props = {
  post: PostType;
};

const Post: React.FC<Props> = ({ post }) => {
  const [isEditing, setIsEditing] = useState(false);

  const [comments, setComments] = useState<Comment[]>([]);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/v1/posts/${post._id}/comments`)
      .then((response) => setComments(response.data))
      .catch((error) => console.error(error));
  }, [post._id]);

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
              <div className="flex flex-col md:flex-row items-center md:gap-2">
                <UserFullName
                  fullName={post.firstName + " " + post.lastName}
                  username={post.username}
                />
                <UserTag username={post.username} />
              </div>
              <PostDate
                date={post.createdAt}
                id={post._id}
              />
            </div>
          </div>
        </div>
        <PostMenu
          postId={post._id}
          username={post.username}
          userFirstName={post.firstName}
          userLastName={post.lastName}
          setIsEditing={setIsEditing}
        />
      </div>
      <div className="flex flex-col">
        {isEditing ? (
          <PostForm />
        ) : (
          <>
            <PostText text={post.description} />
            {post.postImage && <PostImage src={post.postImage} alt="" />}
          </>
        )}
        <VerticalLine className="my-2" />
        <PostStats
          likes={post.likes}
          comments={comments.length}
          postId={post._id}
        />
        <VerticalLine className="mb-5" />
        <Comments comments={comments} />
        <CommentForm postId={post._id} />
      </div>
    </Card>
  );
};

export default Post;
