import { useState } from "react";
import { useSelector } from "react-redux";
import { BsThreeDots } from "react-icons/bs";
import { FaPen, FaRegBookmark, FaRegTrashAlt } from "react-icons/fa";
import { FaBookmark } from 'react-icons/fa6';
import { ImBlocked } from "react-icons/im";
import { PiWarningBold } from "react-icons/pi";
import { selectUser } from "../../store/slices/authSlice";
import useProfileActions from '../../hooks/useProfileActions';
import usePostActions from "../../hooks/usePostActions";
import Button from "../../ui/Button";

type Props = {
  postId: string;
  username: string;
  userFirstName: string;
  userLastName: string;
  setIsEditing:  React.Dispatch<React.SetStateAction<boolean>>;
};

const PostMenu: React.FC<Props> = ({ postId, username, userFirstName, userLastName, setIsEditing }) => {
  const [menuOpened, setMenuOpened] = useState(false);

  const currentUser = useSelector(selectUser);

  const [inBookmarks, setInBookmarks] = useState(currentUser!.bookmarks?.includes(postId));

  const {
    blockUser,
    reportUser
  } = useProfileActions(username, userFirstName, userLastName);

  const {
    bookmarkPost,
    unBookmarkPost,
    deletePost
  } = usePostActions(postId);

  const bookmarkHandler = () => {
    bookmarkPost();
    setInBookmarks(true);
    setMenuOpened(false);
  };

  const unBookmarkHandler = () => {
    unBookmarkPost();
    setInBookmarks(false);
    setMenuOpened(false);
  };

  const editHandler = () => {
    setIsEditing(true);
    setMenuOpened(false);
  };

  const deleteHandler = () => {
    deletePost();
    setMenuOpened(false);
  };

  const blockHandler = () => {
    blockUser();
    setMenuOpened(false);
  };

  const reportHandler = () => {
    reportUser();
    setMenuOpened(false);
  };

  return (
    <>
      <BsThreeDots className="text-xl cursor-pointer" onClick={() => setMenuOpened((prevState) => !prevState)} />
        {
          menuOpened && (
          <ul className="absolute top-6 right-0 px-4 py-5 bg-white rounded border border-gray-10 shadow-md flex flex-col gap-4">
            <li className="flex flex-row items-center gap-2 cursor-pointer group">
              {
                inBookmarks ?
                  <>
                    <FaBookmark className="transition duration-500 group-hover:text-sky-500" />
                    <Button className="group-hover:text-sky-500" text="Unbookmark" bg={false} onClick={unBookmarkHandler} />
                  </>
                :
                  <>
                    <FaRegBookmark className="transition duration-500 group-hover:text-sky-500" />
                    <Button className="group-hover:text-sky-500" text="Bookmark" bg={false} onClick={bookmarkHandler} />
                  </>
              }
            </li>
            {
              currentUser!.username === username &&
              <>
                <li className="flex flex-row items-center gap-2 cursor-pointer group">
                <FaPen className="transition duration-500 group-hover:text-sky-500" />
                <Button className="group-hover:text-sky-500" text="Edit Post" bg={false} onClick={editHandler} />
              </li>
              <li className="flex flex-row items-center gap-2 cursor-pointer group">
                <FaRegTrashAlt className="transition duration-500 group-hover:text-sky-500" />
                <Button className="group-hover:text-sky-500" text="Delete Post" bg={false} onClick={deleteHandler} />
              </li>
              </>
            }
            {
              currentUser!.username !== username &&
              <>
                <li className="flex flex-row items-center gap-2 cursor-pointer group">
                  <ImBlocked className="transition duration-500 group-hover:text-sky-500" />
                  <Button className="group-hover:text-sky-500" text="Block User" bg={false} onClick={blockHandler} />
                </li>
                <li className="flex flex-row items-center gap-2 cursor-pointer group">
                  <PiWarningBold  className="text-lg transition duration-500 group-hover:text-sky-500" />
                  <Button className="group-hover:text-sky-500" text="Report User" bg={false} onClick={reportHandler} />
                </li>
              </>
            }
          </ul>
        )}
    </>
  );
};

export default PostMenu;