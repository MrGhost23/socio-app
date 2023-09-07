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
    <Card className="p-8 !text-left flex flex-row gap-4">
      {
        post.image && <BookmarkImage src={post.image} alt='' id={post.id} />
      }
      <div className="relative w-full pr-8 flex flex-col gap-4">
        <BookmarkText text={post.text} id={post.id} />
        <div className="flex flex-row items-center gap-2">
          <UserImage className="w-8 !m-0" src={currentUserImage} alt={currentUserFullName} id={currentUserId} />
          <UserFullName className="!text-base text-gray-500 font-medium" fullName={currentUserFullName} id={currentUserId} />
        </div>
        <PostBookmarkIcon />
      </div>
    </Card>
  );
};

export default BookmarkPost;