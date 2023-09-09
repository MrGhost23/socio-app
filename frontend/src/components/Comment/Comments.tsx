import Comment from "./Comment";

type Props = {
  comments: {
    id: string;
    text: string;
    date: string;
    authorId: string;
    authorFullName: string;
    authorImage: string;
  }[];
}

const Comments: React.FC<Props> = ({ comments }) => {
  if (!comments) return;

  return (
    <div className="mb-5 flex flex-col gap-4">
      {
        comments.map(comment =>
          <Comment key={comment.id} comment={comment} />  
        )
      }
    </div>
  );
};

export default Comments;