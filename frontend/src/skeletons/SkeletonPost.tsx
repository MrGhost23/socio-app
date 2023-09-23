import SkeletonWrapper from "./SkeletonWrapper";
import SkeletonElement from "./SkeletonElement";

const SkeletonPost: React.FC = () => {
  return (
    <SkeletonWrapper>
      <div className="skeleton-article">
        <div className="flex flex-col gap-2">
          <div className="relative mb-2 flex flex-row justify-between gap-3">
            <SkeletonElement
              type="avatar"
              className="min-w-[3rem] sm:min-w-[3.5rem] w-12 sm:w-14 min-h-[3rem] sm:min-h-[3.5rem] h-12 sm:h-14"
            />
            <div className="grow flex flex-col items-start gap-1.5">
              <SkeletonElement type="name" />
              <SkeletonElement type="date" />
            </div>
          </div>
          <SkeletonElement type="text" repeat={3} />
        </div>
      </div>
    </SkeletonWrapper>
  );
};

export default SkeletonPost;
