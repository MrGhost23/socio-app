type Props = {
  message: string;
  className?: string;
};

const NoDataMessage: React.FC<Props> = ({ message, className }) => {
  const classes = `dark:text-gray-300 ${className ?? ""}`;

  return <p className={classes}>{message}</p>;
};

export default NoDataMessage;
