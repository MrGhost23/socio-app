import { Link } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";

type Props = {
  id: string;
  date: string;
};

const PostDate: React.FC<Props> = ({ id, date }) => {
  return (
    <Link
      to={`/post/${id}`}
      className="text-sm text-gray-500 font-medium tracking-tight"
    >
      {
        formatDistanceToNow(new Date(date), {
          addSuffix: true,
        })
      }
    </Link>
  );
};

export default PostDate;
