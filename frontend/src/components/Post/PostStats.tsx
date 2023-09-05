import {RiHeart3Line} from 'react-icons/ri';
import {FaRegCommentDots} from 'react-icons/fa';

type Props = {
  likes: number;
  comments: number
}

const PostStats: React.FC<Props> = ({ likes, comments }) => {
  return (
    <div className='mb-4 flex flex-row gap-4 text-gray-600'>
    <div className='flex flex-row items-center gap-1'>
      <RiHeart3Line className='text-xl' />
      <span className='text-lg'>{likes}</span>
    </div>
    <div className='flex flex-row items-center gap-1'>
      <FaRegCommentDots className='text-xl' />
      <span className='text-lg'>{comments}</span>
    </div>
  </div>
  );
};

export default PostStats;