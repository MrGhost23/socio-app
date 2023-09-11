const Conversation = () => {
  return (
    <div className="flex flex-row py-4 px-2 justify-center items-center border-b-2">
      <div className="w-1/4">
        <img
          src="https://i.pinimg.com/564x/c7/58/a5/c758a5b04e0e7080dc19187e8c62a9c3.jpg"
          className="object-cover h-12 w-12 rounded-full"
          alt=""
        />
      </div>
      <div className="w-full">
        <div className="flex items-center flex-wrap gap-2">
          <div className="text-lg font-semibold">Omar Mohamed</div>
          <span className="text-sm text-gray-500">12:23AM</span>
        </div>

        <span className="text-gray-500 font-medium">بدخله براحة خالص</span>
      </div>
    </div>
  );
};
export default Conversation;
