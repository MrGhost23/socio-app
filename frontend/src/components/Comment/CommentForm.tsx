import { PiNavigationArrowFill } from 'react-icons/pi';
import UserImage from '../User/UserImage';
import { useState } from 'react';

type Props = {
  postId: string;
  currentUserId: string;
  currentUserImage: string;
  currentUserFullName: string;
}

const CommentForm: React.FC<Props> = ({ postId, currentUserId, currentUserImage, currentUserFullName }) => {
  const [text, setText] = useState("");
  const [showSendIcon, setShowSendIcon] = useState(false);

  const iconClasses = "absolute bottom-4 right-6 text-xl text-sky-500 opacity-0 cursor-pointer rotate-[135deg] transition duration-500 hover:text-sky-600 hover:scale-110";

  const changeHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value)

    setShowSendIcon(e.target.value.trim().length !== 0);
  };

  const submitHandler = () => {
    console.log(text, postId, currentUserId);
    setText("");
  }

  return (
    <div className='flex flex-row gap-3'>
      <UserImage className='w-10 !mb-0' src={currentUserImage} alt={currentUserFullName} id={currentUserId} />
      <form className="w-full">
        <div className="relative w-full">
          <textarea
            className='w-full min-h-[2.5rem] h-10 max-h-[8rem] resize-y px-4 py-1.5 border rounded-xl outline-none'
            placeholder='Write your comment'
            value={text}
            onChange={changeHandler}
          />
          <PiNavigationArrowFill className={showSendIcon ? iconClasses + ' !opacity-100' : iconClasses} onClick={submitHandler} />
        </div>
      </form>
    </div>
  );
};

export default CommentForm;