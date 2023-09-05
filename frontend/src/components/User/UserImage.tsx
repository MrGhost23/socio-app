type Props = {
  src: string;
  alt: string;
  className: string;
}

const UserImage: React.FC<Props> = (props) => {
  let classes = 'mb-4 rounded-full shadow-lg'
  if (props.className) {
    classes += ' ' + props.className;
  }

  return (
    <img className={classes} src={props.src} alt={props.alt} />
  );
};

export default UserImage;