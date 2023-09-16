import { BookmarkPostType } from "../../Types/BookmarkPost.types";
import BookmarkImage from "./BookmarkImage";
import BookmarkText from "./BookmarkText";
import UserImage from "../User/UserImage";
import UserFullName from "../User/UserFullName";
import PostBookmarkIcon from "./PostBookmarkIcon";
import Card from "../../ui/Card";

type Props = {
  post: BookmarkPostType;
  reFetchFunction: () => void;
};

const BookmarkPost: React.FC<Props> = ({ post, reFetchFunction }) => {
  return (
    <Card className="px-8 py-6 !text-left">
      <div className="relative">
        <div className="flex flex-col sm:flex-row gap-4">
          {post.postImage && (
            <BookmarkImage
              src={`http://localhost:5000/post_assets/${post.postImage}`}
              alt=""
              id={post._id}
            />
          )}
          <div className=" w-full pr-8 flex flex-col gap-4">
            <BookmarkText text={post.description} id={post._id} />
            <div className="flex flex-row items-center gap-2">
              <UserImage
                className="min-w-[2rem] w-8 min-h-[2rem] h-8 !m-0"
                src={post.userPicture}
                alt={post.firstName + " " + post.lastName}
                username={post.username}
              />
              <UserFullName
                className="!text-base text-gray-500 font-medium"
                fullName={post.firstName + " " + post.lastName}
                username={post.username}
              />
            </div>
            <PostBookmarkIcon
              postId={post._id}
              reFetchFunction={reFetchFunction}
            />
          </div>
        </div>
      </div>
    </Card>
  );
};

export default BookmarkPost;
