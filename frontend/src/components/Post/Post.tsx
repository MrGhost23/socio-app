import Card from "../../ui/Card";
import UserImage from "../User/UserImage";
import UserTag from "../User/UserTag";
import UserFullName from "../User/UserFullName";
import PostBookmarkIcon from "./PostBookmarkIcon";
import PostText from "./PostText";
import PostImage from "./PostImage";
import PostDate from "./PostDate";
import PostStats from "./PostStats";
import CommentForm from "../Comment/CommentForm";
import VerticalLine from "../../ui/VerticalLine";
import Comments from "../Comment/Comments";
import { PostType } from "../../Types/Post.types";
import { formatDistanceToNow } from "date-fns";
import noAvatar from "../../assets/noAvatar.png";

type Props = {
  currentUserId: string | undefined;
  currentUserFullName: string | undefined;
  currentUserImage: string | undefined;
  post: PostType;
};

const Post: React.FC<Props> = ({
  currentUserId,
  currentUserFullName,
  currentUserImage,
  post,
}) => {
  return (
    <Card className="px-8 py-6 !text-left">
      <div className="relative mb-2 flex flex-row justify-between gap-3">
        <div className="flex flex-col sm:flex-row gap-3">
          <UserImage
            className="w-14 !mb-0"
            src={post.userPicture || noAvatar}
            alt={post.firstName + " " + post.lastName}
            id={post.username}
          />
          <div className="flex flex-col items-start gap-1">
            <div className="flex flex-col">
              <div className="flex flex-col md:flex-row items-center md:gap-2">
                <UserFullName
                  fullName={post.firstName + " " + post.lastName}
                  id={post.username}
                />
                <UserTag tag={post.username} id={post.username} />
              </div>
              <PostDate
                date={formatDistanceToNow(new Date(post.createdAt), {
                  addSuffix: true,
                })}
                id={post._id}
              />
            </div>
          </div>
        </div>
        <PostBookmarkIcon />
      </div>
      <div className="flex flex-col">
        <PostText description={post.description} />
        {post.postImage && <PostImage src={post.postImage} alt="" />}
        <VerticalLine className="my-2" />
        <PostStats
          likes={Object.keys(post.likes).length}
          comments={post.comments.length}
        />
        <VerticalLine className="mb-5" />
        <Comments comments={post.comments} />
        <CommentForm
          postId={post._id}
          currentUserId={currentUserId}
          currentUserImage={currentUserImage}
          currentUserFullName={currentUserFullName}
        />
      </div>
    </Card>
  );
};

export default Post;
