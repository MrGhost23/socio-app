import { useState } from "react";
import UserFullName from "../User/UserFullName";
import UserImage from "../User/UserImage";
import {BsThreeDots} from 'react-icons/bs';
import {FaRegTrashAlt, FaPen} from 'react-icons/fa';
import Button from '../../ui/Button';
import useCommentActions from "../../hooks/useCommentActions";
import { useSelector } from "react-redux";
import { selectUser } from "../../store/slices/authSlice";
import CommentForm from "./CommentForm";

type Props = {
  comment: {
    id: string;
    text: string;
    date: string;
    authorId: string;
    authorFullName: string;
    authorImage: string;
  };
}

const Comment: React.FC<Props> = ({ comment }) => {
  const [menuOpened, setMenuOpened] = useState(false);

  const currentUser = useSelector(selectUser);

  const [isEditing, setIsEditing] = useState(false);

  const {
    deleteComment
  } = useCommentActions(comment.id);

  const editHandler = () => {
    setIsEditing(true);
    setMenuOpened(false);
  };

  const deleteHandler = () => {
    deleteComment();
    setMenuOpened(false);
  };

  return (
    <>
      {
      isEditing ?
        <CommentForm commentId={comment.id} commentText={comment.text} setIsEditing={setIsEditing} />
      :
        <div className="flex flex-row items-start gap-2">
          <UserImage className="min-w-[2.5rem] min-h-[2.5rem] w-10 h-10 !mb-0" src={comment.authorImage} alt={comment.authorFullName} id={comment.authorId} />
          <div className="flex flex-col gap-2 sm:gap-0.5">
            <div className="relative w-fit flex flex-col sm:flex-row sm:items-center sm:gap-2">
              <UserFullName className="!text-base" fullName={comment.authorFullName} id={comment.authorId} />
              <span className="text-sm text-gray-600 tracking-tight">{comment.date}</span>
              {
                currentUser!.username === comment.authorId &&
                <>
                  <BsThreeDots className="text-gray-500 text-lg cursor-pointer transition duration-500 hover:text-gray-700" onClick={() => setMenuOpened((prevState) => !prevState)} />
                  {
                    menuOpened &&
                    <ul className="absolute top-6 right-0 z-40 px-4 py-5 bg-white rounded border border-gray-10 shadow-md flex flex-col gap-4">
                      <li className="flex flex-row items-center gap-2 cursor-pointer group">
                        <FaPen className="text-sm transition duration-500 group-hover:text-sky-500" />
                        <Button className="text-sm group-hover:text-sky-500" text="Edit" bg={false} onClick={editHandler} />
                      </li>
                      <li className="flex flex-row items-center gap-2 cursor-pointer group">
                        <FaRegTrashAlt className="text-sm transition duration-500 group-hover:text-sky-500" />
                        <Button className="text-sm group-hover:text-sky-500" text="Delete" bg={false} onClick={deleteHandler} />
                      </li>
                    </ul>
                  }
                </>
              }
            </div>
            <p className="text-sm text-gray-700">{comment.text}</p>
          </div>
        </div>
        }
    </>
  );
};

export default Comment;