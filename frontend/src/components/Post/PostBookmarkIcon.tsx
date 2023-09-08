import { useState } from 'react';
import { BsBookmark, BsBookmarkFill } from 'react-icons/bs';

const PostBookmarkIcon = () => {
  // This should be done in the parent component actually
  const [inBookmarks, setInBookmarks] = useState(false);

  const toggleBookmark = () => {
    setInBookmarks(prevState => !prevState);
  };

  const classes = 'absolute top-0 right-0 text-2xl cursor-pointer transition duration-500 hover:scale-110';

  return (
    <>
      {
        inBookmarks ?
          <BsBookmarkFill className={classes + ' text-sky-500  hover:text-sky-500'} onClick={toggleBookmark} />
        :
          <BsBookmark className={classes + ' hover:text-sky-500'} onClick={toggleBookmark} />
      }
    </>
  );
};

export default PostBookmarkIcon;