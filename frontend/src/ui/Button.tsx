type Props = {
  className?: string;
  text: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>
};

const Button: React.FC<Props> = (props) => {
  let classes =
    "w-full bg-sky-500 hover:bg-indigo-800 text-white font-bold tracking-wide py-2 px-4 rounded transition duration-500";
  if (props.className) {
    classes += " " + props.className;
  }

  return (
    <button className={classes} type="submit" onClick={props.onClick ? props.onClick : () => {}}>
      {props.text}
    </button>
  );
};

export default Button;
