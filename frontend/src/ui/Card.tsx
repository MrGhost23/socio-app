type Props = {
  className?: string;
  title?: string;
  children: React.ReactNode;
};

const Card: React.FC<Props> = (props) => {
  let classes =
    "h-fit bg-white shadow-lg rounded-xl text-center dark:bg-primarylessDark dark:text-textLighter";
  if (props.className) {
    classes += " " + props.className;
  }

  return <div className={classes}>{props.children}</div>;
};

export default Card;
