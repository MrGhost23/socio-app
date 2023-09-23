import SkeletonWrapper from "./SkeletonWrapper";
import SkeletonElement from "./SkeletonElement";

const BookmarkPostSkeleton = () => {
  return (
    <SkeletonWrapper>
      <div className="skeleton-article">
        <div className="flex flex-col gap-4">
          <SkeletonElement type="text" repeat={3} />
          <div className="flex flex-row items-center gap-2">
            <SkeletonElement
              type="avatar"
              className="min-w-[2rem] w-8 min-h-[2rem] h-8"
            />
            <SkeletonElement type="text" className="max-w-[8rem]" />
          </div>
        </div>
      </div>
    </SkeletonWrapper>
  );
};

export default BookmarkPostSkeleton;
