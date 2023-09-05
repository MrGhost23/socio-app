type Props = {
  fullName: string;
  className?: string;
}

const UserFullName: React.FC<Props> = (props) => {
  let classes = 'text-lg'
  if (props.className) {
    classes += ' ' + props.className;
  }

  return (
    <p className={classes}>{props.fullName}</p>
  );
};

export default UserFullName;