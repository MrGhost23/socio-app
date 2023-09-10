import { useState } from 'react';
import { FaBookmark, FaRegBookmark } from 'react-icons/fa6';


const PostBookmarkIcon = () => {
  // This should be done in the parent component actually
  const [inBookmarks, setInBookmarks] = useState(false);

  const toggleBookmark = () => {
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