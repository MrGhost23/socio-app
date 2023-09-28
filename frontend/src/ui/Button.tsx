import { IconType } from "react-icons";

type Props = {
  text: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  bg?: boolean;
  className?: string;
  icon?: IconType;
  iconClasses?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
};

const Button: React.FC<Props> = (props) => {
  let classes = "transition duration-500 font-medium dark:text-textLighter";
  classes += props.bg
    ? "w-full py-2 px-4 bg-sky-500 text-white font-bold tracking-wide hover:bg-sky-600 rounded"
    : "w-fit text-gray-500 hover:text-sky-600";

  if (props.className) {
    classes += " " + props.className;
  }

  let iconClasses = "text-sm dark:text-textLight";

  if (props.iconClasses) {
    iconClasses += " " + props.iconClasses;
  }

  return (
    <button
      disabled={props.disabled}
      type={props.type || "button"}
      className={
        props.icon
          ? classes + " flex flex-row items-center gap-2 cursor-pointer"
          : classes
      }
      onClick={props.onClick}
    >
      {props.icon ? (
        <>
          <props.icon className={iconClasses} />
          <span className="dark:text-textLighter">{props.text}</span>
        </>
      ) : (
        <span className="dark:text-textLighter">{props.text}</span>
      )}
    </button>
  );
};

export default Button;
