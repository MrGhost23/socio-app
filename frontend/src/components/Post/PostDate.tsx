import { Link } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";

type Props = {
  id: string;
  date: string;
  className?: string;
};

const PostDate: React.FC<Props> = ({ id, date, className }) => {
  let classes =
    "text-sm text-gray-500 font-medium tracking-tight dark:text-gray-400";
  if (className) {
    classes += " " + className;
  }

  return (
    <Link to={`/post/${id}`} className={classes}>
      {formatDistanceToNow(new Date(date), {
        addSuffix: true,
      })}
    </Link>
  );
};

export default PostDate;
