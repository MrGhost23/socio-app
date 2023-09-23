import PostSkeleton from "./PostSkeleton";

type Props = {
  postsNumber: number;
};

const PostsSkeleton: React.FC<Props> = ({ postsNumber }) => {
  return (
    <div className="flex flex-col gap-8">
      {Array.from({ length: postsNumber }, (_, index) => (
        <PostSkeleton key={index} />
      ))}
    </div>
  );
};

export default PostsSkeleton;
