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
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
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
            <li>
              {
                inBookmarks ?
                  <Button text="Unbookmark" bg={false} onClick={unBookmarkHandler} icon={FaBookmark} />
                :
                  <Button text="Bookmark" bg={false} onClick={bookmarkHandler} icon={FaRegBookmark} />
              }
            </li>
            {
              currentUser!.username === username &&
              <>
              <li>
                <Button text="Edit Post" bg={false} onClick={editHandler} icon={FaPen} />
              </li>
              <li>
                <Button text="Delete Post" bg={false} onClick={deleteHandler} icon={FaRegTrashAlt} />
              </li>
              </>
            }
            {
              currentUser!.username !== username &&
              <>
                <li>
                  <Button text="Block" bg={false} onClick={blockHandler} icon={ImBlocked} />
                </li>
                <li>
                  <Button text="Report" bg={false} onClick={reportHandler} icon={PiWarningBold} iconClasses="!text-lg" />
                </li>
              </>
            }
          </ul>
        )}
    </>
  );
};

export default PostMenu;