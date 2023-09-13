import { PostType } from "../../Types/Post.types";
import BookmarkPost from "./BookmarkPost";

type Props = {
  currentUserId: string;
  currentUserFullName: string;
  currentUserImage: string;
  posts: PostType[];
}

const BookmarkPosts: React.FC<Props> = ({ currentUserId, currentUserFullName, currentUserImage, posts }) => {
  return (
    <div className="flex flex-col gap-8">
      {
        posts.map(post =>
          <BookmarkPost key={post._id} currentUserId={currentUserId} currentUserFullName={currentUserFullName} currentUserImage={currentUserImage} post={post} />
        )
      }
    </div>
  );
};

export default BookmarkPosts;