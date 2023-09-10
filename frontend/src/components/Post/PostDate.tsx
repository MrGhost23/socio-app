import { Link } from "react-router-dom";

type Props = {
  id: string;
  date: string | Date | any;
};

const PostDate: React.FC<Props> = ({ id, date }) => {
  return (
    <Link
      to={`/post/${id}`}
      className="text-sm text-gray-500 font-medium tracking-tight"
    >
      {date}
    </Link>
  );
};

export default PostDate;
