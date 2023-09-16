import { useState } from "react";
import { FaChevronUp } from "react-icons/fa";
import { Comment as CommentType } from "../../Types/Comment.types";
import Comment from "./Comment";

type Props = {
  comments: CommentType[];
  removeCommentFunction: (commentId: string) => void;
  editCommentFunction: (commentId: string, text: string) => void;
};

const Comments: React.FC<Props> = ({
  comments,
  removeCommentFunction,
  editCommentFunction,
}) => {
  const max = 2;
  const [commentsSliced, setCommentsSliced] = useState(comments?.length > max);

  const showAll = () => {
    setCommentsSliced(false);
  };

  if (!comments) return;

  return (
    <div className="mb-5 flex flex-col gap-4">
      {commentsSliced ? (
        <>
          <p
            className="flex flex-row items-center gap-2 text-base text-gray-500 font-semibold cursor-pointer transition duration-500 hover:text-sky-500"
            onClick={showAll}
          >
            <FaChevronUp />
            Show all
          </p>
          {comments?.slice(-2).map((comment) => (
            <Comment
              key={comment._id}
              comment={comment}
              removeCommentFunction={removeCommentFunction}
              editCommentFunction={editCommentFunction}
            />
          ))}
        </>
      ) : (
        comments?.map((comment) => (
          <Comment
            key={comment._id}
            comment={comment}
            removeCommentFunction={removeCommentFunction}
            editCommentFunction={editCommentFunction}
          />
        ))
      )}
    </div>
  );
};

export default Comments;
