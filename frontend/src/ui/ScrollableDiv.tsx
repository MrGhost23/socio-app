type Props = {
  className?: string;
  children: React.ReactNode;
};

const ScrollableDiv: React.FC<Props> = (props) => {
  const classes =
    "pr-5 overflow-y-auto scrollbar scrollbar-w-2 scrollbar-thumb-sky-500 hover:scrollbar-thumb-sky-600 scrollbar-track-gray-200 dark:scrollbar-track-primarylessDarker";

  return (
    <div className={props.className ? classes + " " + props.className : classes}>
      {props.children}
    </div>
  );
};

export default ScrollableDiv;
