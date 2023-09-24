import SkeletonElement from "./SkeletonElement";
import SkeletonWrapper from "./SkeletonWrapper";

const ConversationSkeleton = () => {
  return (
    <SkeletonWrapper className="!p-0 !bg-transparent !rounded-none shadow-none border-b-2">
      <div className="flex flex-row gap-2 py-4 px-4">
        <SkeletonElement
          type="avatar"
          className="min-h-[3.5rem] h-14 min-w-[3.5rem] w-14"
        />
        <div className="grow flex flex-col gap-1.5">
          <SkeletonElement type="text" className="max-w-[10rem]" />
          <SkeletonElement type="text" className="max-w-[6rem]" />
        </div>
      </div>
    </SkeletonWrapper>
  );
};

export default ConversationSkeleton;