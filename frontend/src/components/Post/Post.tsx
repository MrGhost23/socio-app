import Card from "../../ui/Card";
import UserImage from "../User/UserImage";
import UserTag from "../User/UserTag";
import UserFullName from "../User/UserFullName";
import PostBookmarkIcon from "./PostBookmarkIcon";
import PostText from "./PostText";
import PostImage from "./PostImage";
import PostDate from "./PostDate";
import PostStats from "./PostStats";
import PostCommentForm from "./PostCommentForm";
import VerticalLine from "../../ui/VerticalLine";

type Props = {
  currentUserFullName: string;
  currentUserImage: string;
  post: {
    id: number;
    text: string;
    image?: string;
    likes: number;
    comments: number;
    authorFullName: string;
    authorTag: string;
    authorImage: string;
    date: string;
  };
};

const Post: React.FC<Props> = ({
  currentUserFullName,
  currentUserImage,
  post,
}) => {
  return (
    <Card className="mb-6 px-8 py-6 !text-left">
      <div className="mb-2 flex flex-row justify-between gap-3">
        <div className="flex flex-row gap-3">
          <UserImage
            className="w-14"
            src={post.authorImage}
            alt={post.authorFullName}
          />
          <div className="flex flex-col items-start gap-1">
            <div className="flex flex-col">
              <div className="flex flex-row items-center gap-2">
                <UserFullName fullName={post.authorFullName} />
                <UserTag tag={post.authorTag} />
              </div>
              <PostDate date={post.date} />
            </div>
          </div>
        </div>
        <PostBookmarkIcon />
      </div>
      <div className="flex flex-col">
        <PostText text={post.text} />
        {post.image && <PostImage src={post.image} alt="" />}
        <VerticalLine className="my-4" />
        <PostStats likes={post.likes} comments={post.comments} />
        <PostCommentForm
          currentUserImage={currentUserImage}
          currentUserFullName={currentUserFullName}
        />
      </div>
    </Card>
  );
};

export default Post;
