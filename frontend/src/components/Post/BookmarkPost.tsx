import Card from "../../ui/Card";
import PostBookmarkIcon from './PostBookmarkIcon';
import UserImage from "../User/UserImage";
import UserFullName from "../User/UserFullName";
import BookmarkText from "./BookmarkText";
import BookmarkImage from "./BookmarkImage";

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
  };
};

const BookmarkPost: React.FC<Props> = ({
  currentUserId,
  currentUserFullName,
  currentUserImage,
  post,
}) => {
  return (
    <Card className="px-8 py-6 !text-left">
      <div className="relative">
        <div className="flex flex-col sm:flex-row gap-4">
          {
            post.image && <BookmarkImage src={post.image} alt='' id={post.id} />
          }
          <div className=" w-full pr-8 flex flex-col gap-4">
            <BookmarkText text={post.text} id={post.id} />
            <div className="flex flex-row items-center gap-2">
              <UserImage className="min-w-[2rem] w-8 min-h-[2rem] h-8 !m-0" src={currentUserImage} alt={currentUserFullName} username={currentUserId} />
              <UserFullName className="!text-base text-gray-500 font-medium" fullName={currentUserFullName} username={currentUserId} />
            </div>
            <PostBookmarkIcon postId={post.id} />
          </div>
        </div>
      </div>
    </Card>
  );
};

export default BookmarkPost;