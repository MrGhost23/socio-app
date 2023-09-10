import { useState } from 'react';
import { FaChevronUp } from "react-icons/fa";
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
  
  const max = 2;
  const [commentsSliced, setCommentsSliced] = useState(comments.length > max)
  
  const showAll = () => {
    setCommentsSliced(false);
  }
  
  if (!comments) return;

  return (
    <div className="mb-5 flex flex-col gap-4">
      {
        commentsSliced ?
         (
           <>
            <p className='flex flex-row items-center gap-2 text-base text-gray-500 font-semibold cursor-pointer transition duration-500 hover:text-sky-500' onClick={showAll}>
              <FaChevronUp />
              Show all
            </p>
            {
              comments.slice(-2).map(comment =>
                <Comment key={comment.id} comment={comment} />  
              )
            }
          </>
         )
        :
          comments.map(comment =>
            <Comment key={comment.id} comment={comment} />  
          )
      }
    </div>
  );
};

export default Comments;