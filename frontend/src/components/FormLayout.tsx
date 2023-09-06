type Props = {
  children: React.ReactNode;
};

const FormLayout: React.FC<Props> = (props) => {
  return (
    <div className="md:mt-0 h-[calc(100vh-82px)] flex flex-row justify-center items-center">
      {props.children}
    </div>
  );
};

export default FormLayout;
