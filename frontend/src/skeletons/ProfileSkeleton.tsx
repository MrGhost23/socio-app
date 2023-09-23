import SkeletonWrapper from "./SkeletonWrapper";
import SkeletonElement from "./SkeletonElement";

type Props = {
  className?: string;
};

const ProfileSkeleton: React.FC<Props> = ({ className }) => {
  return (
    <SkeletonWrapper className={className}>
      <div className="flex flex-col items-center gap-2">
        <SkeletonElement
          type="avatar"
          className="min-w-[8rem] w-32 min-h-[8rem] h-32 mb-2"
        />
        <SkeletonElement type="text" className="max-w-[10rem]" />
        <SkeletonElement type="text" className="max-w-[8rem]" />
        <SkeletonElement type="text" className="max-w-[8rem] mb-2" />
        <SkeletonElement type="text" repeat={3} className="max-w-xs" />
      </div>
    </SkeletonWrapper>
  );
};

export default ProfileSkeleton;
