import { FaRegHeart, FaRegCommentDots } from 'react-icons/fa';
import { FaHeart} from 'react-icons/fa6';
import { useState } from 'react';

type Props = {
  likes: number;
  comments: number
}

const PostStats: React.FC<Props> = ({ likes, comments }) => {
  const [liked, setLiked] = useState(false);

  const likeClickHandler = () => {
    setLiked(prevState => !prevState);
  };


  return (
    <div className='mb-5 flex flex-row gap-4 text-gray-500 font-medium'>
      <div className='flex flex-row items-center gap-1.5'>
        {
          liked ?
            <FaHeart className='text-xl text-indigo-700 cursor-pointer transition duration-500 hover:scale-110' onClick={likeClickHandler} />
          :
            <FaRegHeart className='text-xl cursor-pointer transition duration-500 hover:text-indigo-700 hover:scale-110' onClick={likeClickHandler} />
        }
        <span className='text-lg'>{likes}</span>
      </div>
      <div className='flex flex-row items-center gap-1.5'>
        <FaRegCommentDots className='text-xl'/>
        <span className='text-lg'>{comments}</span>
      </div>
    </div>
  );
};

export default PostStats;