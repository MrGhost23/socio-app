import { useState } from "react";
import { FaChevronUp, FaChevronDown } from "react-icons/fa";
import { Comment as CommentType } from "../../Types/Comment.types";
import Comment from "./Comment";
import { Socket } from "socket.io-client";

type Props = {
  comments: CommentType[];
  removeCommentFunction: (commentId: string) => void;
  editCommentFunction: (commentId: string, text: string) => void;
  fetchMoreComments: () => void;
  commentsHasMore: boolean;
  socket: Socket;
};

const Comments: React.FC<Props> = ({
  comments,
  removeCommentFunction,
  editCommentFunction,
  fetchMoreComments,
  commentsHasMore,
  socket,
}) => {
  const max = 2;
  const [commentsSliced, setCommentsSliced] = useState(comments?.length > max);

  const showMore = () => {
    if (commentsSliced) {
      setCommentsSliced(false);
    } else if (commentsHasMore) {
      fetchMoreComments();
    }
  };

  const showLess = () => {
    setCommentsSliced(true);
  };

  if (!comments) return;

  return (
    <div className="mb-5 flex flex-col gap-4">
      {commentsSliced || commentsHasMore ? (
        <p
          className="flex flex-row items-center gap-2 text-base text-gray-500 font-semibold cursor-pointer transition duration-500 hover:text-sky-500 dark:text-gray-300 dark:hover:text-sky-500"
          onClick={showMore}
        >
          <FaChevronUp />
          Show More
        </p>
      ) : (
        <p
          className="flex flex-row items-center gap-2 text-base text-gray-500 font-semibold cursor-pointer transition duration-500 hover:text-sky-500 dark:text-gray-300 dark:hover:text-sky-500"
          onClick={showLess}
        >
          <FaChevronDown />
          Show Less
        </p>
      )}
      {commentsSliced
        ? comments
            .slice(-2)
            .map((comment) => (
              <Comment
                key={comment._id}
                comment={comment}
                removeCommentFunction={removeCommentFunction}
                editCommentFunction={editCommentFunction}
                socket={socket}
              />
            ))
        : comments?.map((comment) => (
            <Comment
              key={comment._id}
              comment={comment}
              removeCommentFunction={removeCommentFunction}
              editCommentFunction={editCommentFunction}
              socket={socket}
            />
          ))}
    </div>
  );
};

export default Comments;
