import SkeletonWrapper from "./SkeletonWrapper";
import MessageSkeleton from "./MessageSkeleton";

type Props = {
  messagesNumber: number;
};

const MessagesSkeleton: React.FC<Props> = ({ messagesNumber }) => {
  return (
    <SkeletonWrapper className="!p-0 !px-5 shadow-none dark:!bg-primaryDark">
      <div className="flex flex-col gap-4 dark:bg-primaryDark">
        {Array.from({ length: messagesNumber }, (_, index) => (
          <MessageSkeleton
            key={index}
            type={(index + 1) % 2 ? "received" : "sent"}
          />
        ))}
      </div>
    </SkeletonWrapper>
  );
};

export default MessagesSkeleton;
