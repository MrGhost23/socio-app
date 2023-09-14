import { FaBookmark } from 'react-icons/fa6';
import usePostActions from '../../hooks/usePostActions';

type Props = {
  postId: string;
  reFetchFunction: () => void;
};

const PostBookmarkIcon: React.FC<Props> = ({ postId, reFetchFunction }) => {
  const { toggleBookmarkPost } = usePostActions();

  const toggleBookmark = async () => {
    await toggleBookmarkPost(postId);
    reFetchFunction();
  };

  const classes = 'absolute top-1 right-0 text-2xl scale-y-110 cursor-pointer transition duration-500 hover:scale-x-110 hover:scale-y-[1.2]';

  return (
    <FaBookmark className={classes + ' text-sky-500  hover:text-sky-500'} onClick={toggleBookmark} />
  );
};

export default PostBookmarkIcon;