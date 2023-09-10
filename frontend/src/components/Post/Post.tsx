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

type Props = {
  currentUserId: string;
  currentUserFullName: string;
  currentUserImage: string;
  post: {
    id: string;
    text: string;
    image?: string;
    likes: number;
    comments: number;
    authorFullName: string;
    authorTag: string;
    authorImage: string;
    date: string;
    postComments: {
      id: string;
      text: string;
      date: string;
      authorId: string;
      authorFullName: string;
      authorImage: string;
    }[]
  };
};

const Post: React.FC<Props> = ({
  currentUserId,
  currentUserFullName,
  currentUserImage,
  post
}) => {
  return (
    <Card className="px-8 py-6 !text-left">
      <div className="relative mb-2 flex flex-row justify-between gap-3">
        <div className="flex flex-row gap-3">
          <UserImage
            className="w-14 !mb-0"
            src={post.authorImage}
            alt={post.authorFullName}
            id={currentUserId}
          />
          <div className="flex flex-col items-start gap-1">
            <div className="flex flex-col">
              <div className="flex flex-row items-center gap-2">
                <UserFullName fullName={post.authorFullName} id={currentUserId} />
                <UserTag tag={post.authorTag} id={currentUserId} />
              </div>
              <PostDate date={post.date} id={post.id} />
            </div>
          </div>
        </div>
        <PostBookmarkIcon />
      </div>
      <div className="flex flex-col">
        <PostText text={post.text} />
        {post.image && <PostImage src={post.image} alt="" />}
        <VerticalLine className="my-2" />
        <PostStats likes={post.likes} comments={post.comments} />
        <VerticalLine className="mb-5" />
        <Comments comments={post.postComments} />
        <CommentForm
          postId={post.id}
          currentUserId={currentUserId}
          currentUserImage={currentUserImage}
          currentUserFullName={currentUserFullName}
        />
      </div>
    </Card>
  );
};

export default Post;
