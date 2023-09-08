type Props = {
  className?: string;
  text: string;
  bg: boolean;
  onClick: React.MouseEventHandler<HTMLButtonElement>
};

const Button: React.FC<Props> = (props) => {
  let classes = "transition duration-500 font-medium "
  classes += props.bg ?
      "w-full py-2 px-4 bg-sky-500 text-white font-bold tracking-wide hover:bg-sky-600 rounded"
    :
      "w-fit text-gray-500 hover:text-sky-600";

  if (props.className) {
    classes += " " + props.className;
  }

  return (
    <button className={classes} onClick={props.onClick ? props.onClick : () => {}}>
      {props.text}
    </button>
  );
};

export default Button;
