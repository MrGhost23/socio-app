const TypeMsg = ({ handleSubmit, newMessage, setNewMessage }) => {
  return (
    <div className="py-5">
      <div className="w-full bg-gray-100 rounded-md hidden lg:flex items-center">
        <form className="flex items-center w-full">
          <div className="relative w-full">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"></div>
            <input
              type="text"
              className="bg-gray-200 border outline-none appearance-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-sky-500 focus:border-sky-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-sky-500 dark:focus:border-sky-500 focus:bg-gray-50"
              placeholder="Type your message here..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              required
            />
            <button onClick={handleSubmit}>Send</button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default TypeMsg;
