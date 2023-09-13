import { useState } from 'react';
import { FaBookmark, FaRegBookmark } from 'react-icons/fa6';
import usePostActions from '../../hooks/usePostActions';
import { useSelector } from 'react-redux';
import { selectUser } from '../../store/slices/authSlice';

type Props = {
  postId: string;
};

const PostBookmarkIcon: React.FC<Props> = ({ postId }) => {
  const currentUser = useSelector(selectUser);
  console.log(currentUser)

  const [inBookmarks, setInBookmarks] = useState(false);

  const {
    bookmarkPost,
    unBookmarkPost,
  } = usePostActions();

  const toggleBookmark = () => {
    if (inBookmarks) {
      unBookmarkPost(postId);
    } else {
      bookmarkPost(postId);
    }

    setInBookmarks(prevState => !prevState);
  };

  const classes = 'absolute top-1 right-0 text-2xl scale-y-110 cursor-pointer transition duration-500 hover:scale-x-110 hover:scale-y-[1.2]';

  return (
    <>
      {
        inBookmarks ?
          <FaBookmark className={classes + ' text-sky-500  hover:text-sky-500'} onClick={toggleBookmark} />
        :
          <FaRegBookmark className={classes + ' text-gray-500 hover:text-sky-500'} onClick={toggleBookmark} />
      }
    </>
  );
};

export default PostBookmarkIcon;