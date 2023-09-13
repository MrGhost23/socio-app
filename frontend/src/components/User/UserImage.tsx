import { Link } from "react-router-dom";
import noAvatar from "../../assets/noAvatar.png";

type Props = {
  username: string;
  src: string | undefined;
  alt: string;
  className?: string;
};

const UserImage: React.FC<Props> = ({ username, src, alt, className }) => {
  let classes = "mb-4 rounded-full shadow-lg";
  if (className) {
    classes += " " + className;
  }

  return (
    <Link to={`/profile/${username}`}>
      <img className={classes} src={src || noAvatar} alt={alt} />
    </Link>
  );
};

export default UserImage;
