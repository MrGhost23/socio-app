import { Link } from "react-router-dom";

type Props = {
  src: string | undefined;
  alt?: string | undefined;
  className?: string;
  id?: string | undefined;
};

const UserImage: React.FC<Props> = (props) => {
  let classes = "mb-4 rounded-full shadow-lg";
  if (props.className) {
    classes += " " + props.className;
  }

  return (
    <Link to={`/profile/${props.id}`}>
      <img className={classes} src={props.src} alt={props.alt} />
    </Link>
  );
};

export default UserImage;
