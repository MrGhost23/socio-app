import { useState } from "react";
import { useSelector } from "react-redux";
import { FaRegTrashAlt, FaPen } from "react-icons/fa";
import { selectUser } from "../../store/slices/authSlice";
import useCommentActions from "../../hooks/useCommentActions";
import Menu from "../../ui/Menu";

type Props = {
  commentId: string;
  commentAuthorUsername: string;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
  removeCommentFunction: (commentId: string) => void;
  editCommentFunction: (commentId: string, text: string) => void;
};

const CommentMenu: React.FC<Props> = ({
  commentId,
  commentAuthorUsername,
  setIsEditing,
  removeCommentFunction,
}) => {
  const currentUser = useSelector(selectUser);

  const { deleteComment } = useCommentActions();

  const editHandler = () => {
    setIsEditing(true);
    setMenuOpened(false);
  };

  const deleteHandler = async () => {
    await deleteComment(commentId);
    removeCommentFunction(commentId);
    setMenuOpened(false);
  };

  const [menuOpened, setMenuOpened] = useState(false);

  const menuList = [
    {
      id: 1,
      text: "Edit",
      action: editHandler,
      icon: FaPen,
      buttonClasses: "text-sm",
      showIf: true,
    },
    {
      id: 2,
      text: "Delete",
      action: deleteHandler,
      icon: FaRegTrashAlt,
      buttonClasses: "text-sm",
      showIf: true,
    },
  ];

  return (
    <>
      {currentUser!.username === commentAuthorUsername && (
        <Menu isOpen={menuOpened} setIsOpen={setMenuOpened} list={menuList} />
      )}
    </>
  );
};

export default CommentMenu;
