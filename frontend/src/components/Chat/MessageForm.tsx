import TextareaForm from "../../ui/TextareaForm";

type Props = {
  setNewMessage: React.Dispatch<React.SetStateAction<string>>;
  newMessage: string;
  submitHandler: () => void;
};

const MessageForm: React.FC<Props> = ({
  newMessage,
  setNewMessage,
  submitHandler,
}) => {
  return (
    <div className="sticky bottom-0 right-0 left-0 w-full py-5 bg-white rounded-md lg:flex items-center">
      <TextareaForm
        text={newMessage}
        setText={setNewMessage}
        placeholder="Write your message"
        submitFunction={submitHandler}
      />
    </div>
  );
};
export default MessageForm;
