import { useState } from "react";
import { useSelector } from "react-redux";
import { PiNavigationArrowFill } from "react-icons/pi";
import { selectUser } from "../../store/slices/authSlice";
import useCommentActions from "../../hooks/useCommentActions";
import UserImage from "../User/UserImage";

type Props = {
  reFetchFunction?: () => void;
  editCommentFunction?: (commentId: string, text: string) => void;
  postId?: string;
  commentId?: string;
  commentText?: string;
  setIsEditing?: React.Dispatch<React.SetStateAction<boolean>>;
};

const CommentForm: React.FC<Props> = ({
  reFetchFunction,
  editCommentFunction,
  postId,
  commentId,
  commentText,
  setIsEditing,
}) => {
  let classes =
    "absolute bottom-4 right-6 text-lg sm:text-xl text-gray-600 opacity-0 cursor-pointer rotate-[135deg] transition duration-500";

  if (commentId) {
    classes += " !text-sky-500 opacity-100 hover:text-sky-600 hover:scale-110";
  }

  const currentUser = useSelector(selectUser);

  const [text, setText] = useState(commentText ?? "");
  const [showSendIcon, setShowSendIcon] = useState(false);
  const [iconClasses, setIconClasses] = useState(classes);

  const changeHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);

    setShowSendIcon(true);
    setIconClasses(
      e.target.value.trim().length !== 0 && !commentId
        ? classes + " !text-sky-500 hover:text-sky-600 hover:scale-110"
        : classes
    );
  };

  const focusHandler = () => {
    setIconClasses(classes + " !opacity-100");
  };

  const { submitComment, editComment } = useCommentActions();

  const submitHandler = async () => {
    if (text) {
      await submitComment(postId!, text);
      reFetchFunction!();
      setText("");
      setIconClasses(classes);
    }
  };

  const editHandler = async () => {
    if (text) {
      await editComment(commentId!, text);
      editCommentFunction!(commentId!, text);
      setIsEditing!(false);
    }
  };

  return (
    <div className="flex flex-row gap-0 sm:gap-3">
      <UserImage
        className="hidden sm:block w-10 !mb-0"
        src={currentUser!.userPicture}
        alt={""}
        username={currentUser!.username}
      />
      <form className="w-full">
        <div className="relative w-full">
          <textarea
            className="w-full min-h-[2.5rem] h-fit max-h-[8rem] resize-y pl-4 pr-7 py-1.5 border rounded-xl outline-none text-sm sm:text-base"
            placeholder="Write your comment"
            value={text}
            onChange={changeHandler}
            onFocus={focusHandler}
          />
          <PiNavigationArrowFill
            className={
              showSendIcon && !commentId
                ? iconClasses + " !opacity-100"
                : iconClasses
            }
            onClick={commentId ? editHandler : submitHandler}
          />
        </div>
      </form>
    </div>
  );
};

export default CommentForm;
