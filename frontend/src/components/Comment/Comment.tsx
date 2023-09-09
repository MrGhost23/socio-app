import UserFullName from "../User/UserFullName";
import UserImage from "../User/UserImage";

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
  return (
    <div className="flex flex-row items-start gap-2">
      <UserImage className="min-w-[2.5rem] min-h-[2.5rem] w-10 h-10 !mb-0" src={comment.authorImage} alt={comment.authorFullName} id={comment.authorId} />
      <div className="flex flex-col gap-0.5">
        <div className="flex flex-row items-center gap-2">
          <UserFullName className="text-base" fullName={comment.authorFullName} id={comment.authorId} />
          <span className="text-sm text-gray-600 tracking-tight">{comment.date}</span>
        </div>
        <p className="text-sm text-gray-700">{comment.text}</p>
      </div>
    </div>
  );
};

export default Comment;