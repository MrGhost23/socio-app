import { Link } from "react-router-dom";

type Props = {
  fullName: string;
  id: string | undefined;
  className?: string;
};

const UserFullName: React.FC<Props> = (props) => {
  let classes = "text-lg";
  if (props.className) {
    classes += " " + props.className;
  }

  return (
    <Link to={`/profile/${props.id}`} className={classes}>
      {props.fullName}
    </Link>
  );
};

export default UserFullName;
