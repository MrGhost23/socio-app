import isArabic from "../../utils/IsArabic";

type Props = {
  text: string;
};

const CommentText: React.FC<Props> = ({ text }) => {
  const textIsInArabic = isArabic(text);

  return (
    <p
      className={
        textIsInArabic
          ? "text-sm text-gray-800 text-right"
          : "text-sm text-gray-800 text-left"
      }
    >
      {text}
    </p>
  );
};

export default CommentText;
