type Props = {
  children: React.ReactNode;
}

const FormLayout: React.FC<Props> = (props) => {
  return (
    <div className='h-screen flex flex-row justify-center items-center'>
      <div className="grid grid-cols-2 shadow-lg">
        <div className="relative bg-gradient-to-r from-blue-500 to-indigo-700 h-full py-16 px-14">
          <div className="relative flex flex-col justify-center w-full h-full px-12 py-16 bg-[#ffffff42] z-50">
            <h3 className='text-white text-6xl font-bold tracking-wide pb-8'>Socio!</h3>
            <p className='w-72 text-white text-3xl font-semibold leading-10'>The best social app for <span className='text-indigo-800'>sociopaths</span>.</p>
          </div>
          <div className='absolute top-0 left-0 w-full h-full bg-[#fff2f282]'></div>
        </div>
        {props.children}
      </div>
    </div>
  );
};

export default FormLayout;