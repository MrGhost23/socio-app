import SkeletonWrapper from "./SkeletonWrapper";
import SkeletonElement from "./SkeletonElement";
type Props = {
  className?: string;
};

const RecentActivitiesSkeleton: React.FC<Props> = ({ className }) => {
  return (
    <SkeletonWrapper className={className}>
      <div className="flex flex-col gap-2">
        <h3 className="mb-2 text-xl">Recent Activities</h3>
        <SkeletonElement type="text" className="max-w-sm" repeat={5} />
      </div>
    </SkeletonWrapper>
  );
};

export default RecentActivitiesSkeleton;
