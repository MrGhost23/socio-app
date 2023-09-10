interface BackdropProps {
  onClick: React.MouseEventHandler<HTMLDivElement>;
}

const Backdrop: React.FC<BackdropProps> = ({ onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`fixed top-0 left-0 z-999 w-full h-screen bg-black bg-opacity-50 transition-all duration-300`}
    />
  );
};

export default Backdrop;
