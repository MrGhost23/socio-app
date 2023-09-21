import { useState } from "react";
import { PiNavigationArrowFill } from "react-icons/pi";

type Props = {
  setNewMessage: React.Dispatch<React.SetStateAction<string>>;
  newMessage: string;
  handleSubmit: React.MouseEventHandler<HTMLFormElement>;
};

const TypeMsg: React.FC<Props> = ({
  newMessage,
  setNewMessage,
  handleSubmit,
}) => {
  const classes =
    "absolute bottom-4 right-6 text-lg sm:text-xl text-gray-600 opacity-0 cursor-pointer rotate-[135deg] transition duration-500";

  const [showSendIcon, setShowSendIcon] = useState(false);
  const [iconClasses, setIconClasses] = useState(classes);

  const changeHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewMessage(e.target.value);

    setShowSendIcon(true);
    setIconClasses(
      e.target.value.trim().length !== 0
        ? classes + " !text-sky-500 hover:text-sky-600 hover:scale-110"
        : classes
    );
  };

  const focusHandler = () => {
    setIconClasses(classes + " !opacity-100");
  };

  return (
    <div className="sticky bottom-0 right-0 left-0 w-full py-5 bg-white rounded-md hidden lg:flex items-center">
      <form className="w-full">
        <div className="relative w-full">
          <textarea
            className="w-full min-h-[2.5rem] h-fit max-h-[8rem] resize-y pl-4 pr-7 py-1.5 border rounded-xl outline-none text-sm sm:text-base"
            placeholder="Type your message here..."
            value={newMessage}
            onChange={changeHandler}
            onFocus={focusHandler}
          />
          <PiNavigationArrowFill
            className={
              showSendIcon ? iconClasses + " !opacity-100" : iconClasses
            }
            onClick={handleSubmit}
          />
        </div>
      </form>
    </div>
  );
};
export default TypeMsg;
