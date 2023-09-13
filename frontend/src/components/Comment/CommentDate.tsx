type Props = {
  date: string;
};

const CommentDate: React.FC<Props> = ({ date }) => {
  return (
    <span className="text-sm text-gray-600 tracking-tight">{date}</span>
  );
};

export default CommentDate;