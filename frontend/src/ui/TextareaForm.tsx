import { useState, useEffect } from "react";
import { PiNavigationArrowFill } from "react-icons/pi";

type Props = {
  text: string;
  setText: React.Dispatch<React.SetStateAction<string>>;
  placeholder: string;
  submitFunction: () => void;
  showFormIcon?: boolean;
};

const TextareaForm: React.FC<Props> = ({
  text,
  setText,
  placeholder,
  submitFunction,
  showFormIcon,
}) => {
  const classes =
    "absolute bottom-4 right-6 text-lg sm:text-xl text-gray-600 opacity-0 cursor-pointer rotate-[135deg] transition duration-500";

  const [showSendIcon, setShowSendIcon] = useState(false);
  const [iconClasses, setIconClasses] = useState(classes);

  useEffect(() => {
    if (showFormIcon) {
      setShowSendIcon(showFormIcon);
      setIconClasses(classes + " !text-sky-500 opacity-100");
    }
  }, [classes, showFormIcon]);

  const changeHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);

    setShowSendIcon(true);
    setIconClasses(
      e.target.value.trim().length !== 0
        ? classes +
            " !text-sky-500 opacity-100 hover:text-sky-600 hover:scale-110"
        : classes
    );
  };

  const focusHandler = () => {
    setIconClasses((prevState) => prevState + " !opacity-100");
  };

  const submitHandler = () => {
    submitFunction();
    setIconClasses(classes);
  };

  const keyDownHandler = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      submitFunction();
    }
  };

  return (
    <form className="w-full">
      <div className="relative w-full">
        <textarea
          className="w-full min-h-[2.5rem] h-fit max-h-[8rem] resize-y pl-4 pr-7 py-1.5 border rounded-xl outline-none text-sm sm:text-base"
          placeholder={placeholder}
          value={text}
          onChange={changeHandler}
          onFocus={focusHandler}
          onKeyDown={keyDownHandler}
        />
        <PiNavigationArrowFill
          className={showSendIcon ? iconClasses + " !opacity-100" : iconClasses}
          onClick={submitHandler}
        />
      </div>
    </form>
  );
};

export default TextareaForm;
