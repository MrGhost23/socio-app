import SkeletonShimmer from "./SkeletonShimmer";

type Props = {
  children: React.ReactNode;
};

const SkeletonWrapper: React.FC<Props> = ({ children }) => {
  return (
    <div className="relative px-8 py-6 bg-white rounded-xl shadow-lg overflow-hidden">
      {children}
      <SkeletonShimmer />
    </div>
  );
};

export default SkeletonWrapper;
