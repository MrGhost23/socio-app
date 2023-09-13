import { useState } from "react";
import CommentForm from "./CommentForm";
import UserImage from "../User/UserImage";
import UserFullName from "../User/UserFullName";
import CommentDate from "./CommentDate";
import CommentMenu from "./CommentMenu";
import CommentText from "./CommentText";
import { formatDistanceToNow } from "date-fns";

type Props = {
  comment: {
    id: string;
    text: string;
    date: string;
    authorUsername: string;
    authorFullName: string;
    authorImage: string;
  };
};

const Comment: React.FC<Props> = ({ comment }) => {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <>
      {isEditing ? (
        <CommentForm
          commentId={comment.id}
          commentText={comment.text}
          setIsEditing={setIsEditing}
        />
      ) : (
        <div className="flex flex-row items-start gap-2">
          <UserImage
            className="min-w-[2.5rem] min-h-[2.5rem] w-10 h-10 !mb-0"
            src={comment.author.userPicture}
            alt={comment.author.firstName + " " + comment.author.lastName}
            username={comment.author.username}
          />
          <div className="flex flex-col gap-2 sm:gap-0.5">
            <div className="relative w-fit flex flex-col sm:flex-row sm:items-center sm:gap-2">
              <UserFullName
                className="!text-base"
                fullName={
                  comment.author.firstName + " " + comment.author.lastName
                }
                username={comment.author.username}
              />
              <CommentDate
                date={formatDistanceToNow(new Date(comment.createdAt), {
                  addSuffix: true,
                })}
              />
              <CommentMenu
                commentId={comment.id}
                commentAuthorUsername={comment.author.username}
                setIsEditing={setIsEditing}
              />
            </div>
            <CommentText text={comment.text} />
          </div>
        </div>
      )}
    </>
  );
};

export default Comment;
