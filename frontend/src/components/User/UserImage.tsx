import { Link } from "react-router-dom";
import noAvatar from "../../assets/noAvatar.png";
type Props = {
  id: string;
  src: string | undefined;
  alt: string;
  className?: string;
};

const UserImage: React.FC<Props> = (props) => {
  let classes = "mb-4 rounded-full shadow-lg";
  if (props.className) {
    classes += " " + props.className;
  }

  return (
    <Link to={`/profile/${props.id}`}>
      <img className={classes} src={props.src || noAvatar} alt={props.alt} />
    </Link>
  );
};

export default UserImage;
