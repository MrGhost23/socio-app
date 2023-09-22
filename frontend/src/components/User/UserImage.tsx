import { Link } from "react-router-dom";
import noAvatar from "../../assets/noAvatar.png";

type Props = {
  src: string | undefined;
  username: string;
  link?: boolean;
  className?: string;
};

const UserImage: React.FC<Props> = ({ username, src, link, className }) => {
  let classes = "mb-4 rounded-full shadow-lg";
  if (className) {
    classes += " " + className;
  }

  return (
    <>
      {link ? (
        <Link to={`/profile/${username}`}>
          <img
            className={classes}
            src={src || noAvatar}
            alt={`${username}'s profile picture`}
          />
        </Link>
      ) : (
        <img
          className={classes}
          src={src || noAvatar}
          alt={`${username}'s profile picture`}
        />
      )}
    </>
  );
};

export default UserImage;
