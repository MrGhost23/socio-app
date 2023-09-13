type Props = {
  text: string;
};

const CommentText: React.FC<Props> = ({ text }) => {
  return <p className="text-sm text-gray-800">{text}</p>;
};

export default CommentText;
