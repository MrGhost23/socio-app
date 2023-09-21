import { Link } from "react-router-dom";

type Props = {
  fullName: string;
  username?: string;
  className?: string;
};

const UserFullName: React.FC<Props> = ({ username, fullName, className }) => {
  let classes = "text-lg";
  if (className) {
    classes += " " + className;
  }

  return (
    <>
      {username ? (
        <Link to={`/profile/${username}`} className={classes}>
          {fullName}
        </Link>
      ) : (
        <p>{fullName}</p>
      )}
    </>
  );
};

export default UserFullName;
