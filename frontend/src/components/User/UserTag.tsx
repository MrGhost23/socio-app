import { Link } from "react-router-dom";

type Props = {
  id: string;
  tag: string;
  className?: string;
};

const UserTag: React.FC<Props> = (props) => {
  let classes = "text-sm text-gray-400 font-medium";
  if (props.className) {
    classes += " " + props.className;
  }

  return (
    <Link to={`/profile/${props.id}`} className={classes}>
      <span className="select-none">@</span>
      {props.tag}
    </Link>
  );
};

export default UserTag;
