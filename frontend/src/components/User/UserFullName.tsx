import { Link } from "react-router-dom";

type Props = {
  username: string;
  fullName: string;
  className?: string;
};

const UserFullName: React.FC<Props> = ({ username, fullName, className }) => {
  let classes = "text-lg";
  if (className) {
    classes += " " + className;
  }

  return (
    <Link to={`/profile/${username}`} className={classes}>
      {fullName}
    </Link>
  );
};

export default UserFullName;
