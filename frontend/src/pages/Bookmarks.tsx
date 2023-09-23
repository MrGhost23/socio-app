import { useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../store/slices/authSlice";
import axios from "axios";
import { BookmarkPostType } from "../Types/BookmarkPost.types";
import BookmarkPosts from "../components/Post/BookmarkPosts";
import BookmarkPostsSkeleton from "../skeletons/BookmarkPostsSkeleton";

const Bookmarks = () => {
  const currentUser = useSelector(selectUser);

  const [bookmarkPosts, setBookmarkPosts] = useState<BookmarkPostType[]>();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  const getUserBookmarks = useCallback(async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/v1/users/${
          currentUser!.username
        }/bookmarked-posts`
      );
      setBookmarkPosts(response.data);
    } catch (error) {
      setError(!!error);
    }
    setIsLoading(false);
  }, [currentUser]);

  useEffect(() => {
    getUserBookmarks();
  }, [getUserBookmarks]);

  if (error) return <p>An error occurred</p>;

  return (
    <>
      {isLoading ? (
        <BookmarkPostsSkeleton postsNumber={2} />
      ) : bookmarkPosts!.length > 0 ? (
        <BookmarkPosts
          posts={bookmarkPosts!}
          reFetchFunction={getUserBookmarks}
        />
      ) : (
        <div className="text-center text-gray-800 text-xl">
          You have no bookmarks.
        </div>
      )}
    </>
  );
};

export default Bookmarks;
