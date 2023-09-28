import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../../store/slices/authSlice";
import useCommentActions from "../../hooks/useCommentActions";
import UserImage from "../User/UserImage";
import TextareaForm from "../../ui/TextareaForm";
import { Socket } from "socket.io-client";
import { Comment as CommentType } from "../../Types/Comment.types";

type Props = {
  addCommentFunction?: (commentData: CommentType) => void;
  editCommentFunction?: (commentId: string, text: string) => void;
  postId?: string;
  commentId?: string;
  commentText?: string;
  setIsEditing?: React.Dispatch<React.SetStateAction<boolean>>;
  socket: Socket;
  postAuthorUsername: string;
};

const CommentForm: React.FC<Props> = ({
  addCommentFunction,
  editCommentFunction,
  postId,
  commentId,
  commentText,
  setIsEditing,
  socket,
  postAuthorUsername,
}) => {
  const currentUser = useSelector(selectUser);
  const { submitComment, editComment } = useCommentActions();

  const [text, setText] = useState(commentText ?? "");
  const [showFormIcon, setShowFormIcon] = useState(false);

  useEffect(() => {
    if (!!commentId && !!commentText) {
      setShowFormIcon(true);
    }
  }, [commentId, commentText]);

  const submitHandler = async () => {
    if (text) {
      const newCommentData = await submitComment(postId!, text);
      addCommentFunction!(newCommentData);
      setText("");
      socket.emit("sendNotification", {
        senderUsername: currentUser?.username,
        receiverUsername: postAuthorUsername,
        actionType: "comment",
        postId: postId,
      });
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
        className="hidden sm:block min-w-[2.5rem] w-10 min-h-[2.5rem] h-10"
        src={currentUser!.userPicture}
        username={currentUser!.username}
      />
      <TextareaForm
        text={text}
        setText={setText}
        placeholder="Write your comment"
        submitFunction={commentId ? editHandler : submitHandler}
        showFormIcon={showFormIcon}
      />
    </div>
  );
};

export default CommentForm;
