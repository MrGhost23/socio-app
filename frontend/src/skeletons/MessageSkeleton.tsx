import SkeletonElement from "./SkeletonElement";

type Props = {
  type: "sent" | "received";
};

const MessageSkeleton: React.FC<Props> = ({ type }) => {
  return (
    <div
      className={`flex items-center gap-2 ${
        type === "received" ? "flex-row" : "flex-row-reverse justify-flex-start"
      }`}
    >
      <SkeletonElement
        type="avatar"
        className="min-w-[2.5rem] w-10 min-h-[2.5rem] h-10"
      />
      <SkeletonElement
        type="text"
        className={`max-w-[8rem] !h-9  ${
          type === "sent"
            ? "rounded-bl-3xl rounded-tl-3xl rounded-tr-xl"
            : "rounded-br-3xl rounded-tr-3xl rounded-tl-xl"
        }`}
      />
    </div>
  );
};

export default MessageSkeleton;
