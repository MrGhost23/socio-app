import { Link } from "react-router-dom";
import noAvatar from "../../assets/noAvatar.png";

type Props = {
  src: string | undefined;
  username: string;
  link?: boolean;
  className?: string;
  online?: boolean;
};

const UserImage: React.FC<Props> = ({
  username,
  src,
  link,
  className,
  online,
}) => {
  let classes = "rounded-full shadow-lg";
  if (className) {
    classes += " " + className;
  }

  const imageErrorHandler = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const imgElement = e.target as HTMLImageElement;
    if (imgElement) {
      imgElement.src = noAvatar;
    }
  };

  return (
    <>
      {link ? (
        <Link to={`/profile/${username}`} className="relative">
          <img
            className={classes}
            src={src || noAvatar}
            alt={`${username}'s profile picture`}
            onError={imageErrorHandler}
          />
          {online && (
            <div className="absolute bottom-0.5 right-0.5 w-3 h-3 bg-green-500 rounded-full"></div>
          )}
        </Link>
      ) : (
        <div className="relative">
          <img
            className={classes}
            src={src || noAvatar}
            alt={`${username}'s profile picture`}
            onError={imageErrorHandler}
          />
          {online && (
            <div className="absolute bottom-0.5 right-0.5 w-3 h-3 bg-green-500 rounded-full"></div>
          )}
        </div>
      )}
    </>
  );
};

export default UserImage;
