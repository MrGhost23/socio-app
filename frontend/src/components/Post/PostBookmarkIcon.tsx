import { useState } from 'react';
import { BsBookmark, BsBookmarkFill } from 'react-icons/bs';

const PostBookmarkIcon = () => {
  // This should be done in the parent component actually
  const [inBookmarks, setInBookmarks] = useState(false);

  const toggleBookmark = () => {
    setInBookmarks(prevState => !prevState);
  };

  const classes = 'text-2xl cursor-pointer transition duration-500 hover:scale-110';

  return (
    <>
      {
        inBookmarks ?
          <BsBookmarkFill className={classes + ' text-indigo-600  hover:text-indigo-700'} onClick={toggleBookmark} />
        :
          <BsBookmark className={classes + ' hover:text-indigo-600'} onClick={toggleBookmark} />
      }
    </>
  );
};

export default PostBookmarkIcon;