import { useState } from "react";
import { useSelector } from "react-redux";
import { FaPen, FaRegBookmark, FaRegTrashAlt } from "react-icons/fa";
import { FaBookmark } from "react-icons/fa6";
import { ImBlocked } from "react-icons/im";
import { PiWarningBold } from "react-icons/pi";
import { selectUser } from "../../store/slices/authSlice";
import useProfileActions from "../../hooks/useProfileActions";
import usePostActions from "../../hooks/usePostActions";
import Menu from "../../ui/Menu";

type Props = {
  postId: string;
  username: string;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
  removePost: (postId: string) => void;
};

const PostMenu: React.FC<Props> = ({
  postId,
  username,
  setIsEditing,
  removePost,
}) => {
  const currentUser = useSelector(selectUser);

  const [inBookmarks, setInBookmarks] = useState<boolean>(
    currentUser!.bookmarks?.includes(postId)
  );

  const { toggleBlockUser, reportUser } = useProfileActions();

  const { toggleBookmarkPost, deletePost } = usePostActions();

  const toggleBookmarkHandler = () => {
    toggleBookmarkPost(postId);
    setInBookmarks((prevState) => !prevState);
    setMenuOpened(false);
  };

  const editHandler = () => {
    setIsEditing(true);
    setMenuOpened(false);
  };

  const deleteHandler = async () => {
    await deletePost(postId);
    setMenuOpened(false);
    removePost(postId);
  };

  const toggleBlockHandler = () => {
    toggleBlockUser(username);
    setMenuOpened(false);
  };

  const reportHandler = () => {
    reportUser();
    setMenuOpened(false);
  };

  const [menuOpened, setMenuOpened] = useState(false);

  const menuList = [
    {
      id: 1,
      text: inBookmarks ? "Unbookmark" : "Bookmark",
      action: toggleBookmarkHandler,
      icon: inBookmarks ? FaBookmark : FaRegBookmark,
      buttonClasses: "text-sm sm:text-base",
      iconClasses: "!text-xs sm:!text-sm",
      showIf: true,
    },
    {
      id: 2,
      text: "Edit Post",
      action: editHandler,
      icon: FaPen,
      buttonClasses: "text-sm sm:text-base",
      iconClasses: "!text-xs sm:!text-sm",
      showIf: currentUser!.username === username,
    },
    {
      id: 3,
      text: "Delete Post",
      action: deleteHandler,
      icon: FaRegTrashAlt,
      buttonClasses: "text-sm sm:text-base",
      iconClasses: "!text-xs sm:!text-sm",
      showIf: currentUser!.username === username,
    },
    {
      id: 4,
      text: "Block",
      action: toggleBlockHandler,
      icon: ImBlocked,
      buttonClasses: "text-sm sm:text-base",
      iconClasses: "!text-xs sm:!text-sm",
      showIf: currentUser!.username !== username,
    },
    {
      id: 3,
      text: "Report",
      action: reportHandler,
      icon: PiWarningBold,
      buttonClasses: "text-sm sm:text-base",
      iconClasses: "!text-xs sm:!text-lg",
      showIf: currentUser!.username !== username,
    },
  ];

  return <Menu isOpen={menuOpened} setIsOpen={setMenuOpened} list={menuList} />;
};

export default PostMenu;
