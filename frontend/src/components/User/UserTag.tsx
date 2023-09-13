import { Link } from "react-router-dom";

type Props = {
  username: string;
  className?: string;
};

const UserTag: React.FC<Props> = ({ username, className }) => {
  let classes = "text-sm text-gray-400 font-medium";
  if (className) {
    classes += " " + className;
  }

  return (
    <Link to={`/profile/${username}`} className={classes}>
      <span className="select-none">@</span>
      {username}
    </Link>
  );
};

export default UserTag;
