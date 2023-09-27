import TextareaForm from "../../ui/TextareaForm";

type Props = {
  setNewMessage: React.Dispatch<React.SetStateAction<string>>;
  newMessage: string;
  submitHandler: () => void;
  disabled: boolean;
};

const MessageForm: React.FC<Props> = ({
  newMessage,
  setNewMessage,
  submitHandler,
  disabled,
}) => {
  return (
    <div className="sticky bottom-0 right-0 left-0 w-full p-5 bg-white dark:bg-primaryDark rounded-md lg:flex items-center">
      <TextareaForm
        text={newMessage}
        setText={setNewMessage}
        placeholder="Write your message"
        submitFunction={submitHandler}
        disabled={disabled}
      />
    </div>
  );
};
export default MessageForm;
