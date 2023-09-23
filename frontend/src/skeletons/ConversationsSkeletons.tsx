import ConversationSkeleton from "./ConversationSkeleton";

type Props = {
  conversationsNumber: number;
};

const ConversationsSkeletons: React.FC<Props> = ({ conversationsNumber }) => {
  return (
    <>
      {Array.from({ length: conversationsNumber }, (_, index) => (
        <ConversationSkeleton key={index} />
      ))}
    </>
  );
};

export default ConversationsSkeletons;
