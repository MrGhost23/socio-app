import BookmarkPostSkeleton from "./PostSkeleton";

type Props = {
  postsNumber: number;
};

const BookmarkPostsSkeleton: React.FC<Props> = ({ postsNumber }) => {
  return (
    <div className="flex flex-col gap-8">
      {Array.from({ length: postsNumber }, (_, index) => (
        <BookmarkPostSkeleton key={index} />
      ))}
    </div>
  );
};

export default BookmarkPostsSkeleton;
