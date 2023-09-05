type Props = {
  tag: string;
  className?: string;
}

const UserTag: React.FC<Props> = (props) => {
  let classes = 'text-sm text-gray-400'
  if (props.className) {
    classes += ' ' + props.className;
  }

  return (
    <p className={classes}>@{props.tag}</p>
  );
};

export default UserTag;