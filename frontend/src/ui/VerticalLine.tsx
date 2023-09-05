type Props = {
  className?: string;
};

const VerticalLine: React.FC<Props> = (props) => {
  let classes = 'w-full h-0.5 bg-gray-200'
  if (props.className) {
    classes += ' ' + props.className;
  }

  return (
    <div className={classes}></div>
  );
};

export default VerticalLine;