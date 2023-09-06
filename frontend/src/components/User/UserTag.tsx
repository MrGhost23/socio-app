type Props = {
  tag: string;
  className?: string;
}

const UserTag: React.FC<Props> = (props) => {
  let classes = 'text-sm text-gray-400 font-medium'
  if (props.className) {
    classes += ' ' + props.className;
  }

  return (
    <p className={classes}>
      <span className="select-none">@</span>
      {props.tag}
    </p>
  );
};

export default UserTag;