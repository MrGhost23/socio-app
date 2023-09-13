import { useState } from 'react';
import { useSelector } from 'react-redux';
import { BsThreeDots } from 'react-icons/bs';
import { FaRegTrashAlt, FaPen } from 'react-icons/fa';
import { selectUser } from '../../store/slices/authSlice';
import useCommentActions from '../../hooks/useCommentActions';
import Button from '../../ui/Button';

type Props = {
  commentId: string;
  commentAuthorUsername: string;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
  reFetchFunction: () => void;
};

const CommentMenu: React.FC<Props> = ({
  commentId,
  commentAuthorUsername,
  setIsEditing,
  reFetchFunction
}) => {
  const [menuOpened, setMenuOpened] = useState(false);

  const currentUser = useSelector(selectUser);

  const {
    deleteComment
  } = useCommentActions();

  const editHandler = () => {
    setIsEditing(true);
    setMenuOpened(false);
  };

  const deleteHandler = async () => {
    await deleteComment(commentId);
    reFetchFunction();
    setMenuOpened(false);
  };


  return (
    <>
      {
        currentUser!.username === commentAuthorUsername &&
        <>
          <BsThreeDots className="text-gray-500 text-lg cursor-pointer md:opacity-0 transition duration-500 group-hover:text-gray-700 group-hover:opacity-100" onClick={() => setMenuOpened((prevState) => !prevState)} />
          {
            menuOpened &&
            <ul className="absolute top-6 right-0 z-40 px-4 py-5 bg-white rounded border border-gray-10 shadow-md flex flex-col gap-4">
              <li>
                <Button className="text-sm" text="Edit" bg={false} onClick={editHandler} icon={FaPen} />
              </li>
              <li>
                <Button className="text-sm" text="Delete" bg={false} onClick={deleteHandler} icon={FaRegTrashAlt} />
              </li>
            </ul>
          }
        </>
      }
    </>
  );
};

export default CommentMenu;