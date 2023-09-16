import { useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../store/slices/authSlice";
import axios from "axios";
import { BookmarkPostType } from "../Types/BookmarkPost.types";
import BookmarkPosts from "../components/Post/BookmarkPosts";
import Loading from "../ui/Loading";

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

  if (isLoading) return <Loading />;
  if (error) return <p>An error occurred</p>;
  if (bookmarkPosts!.length === 0) return <p>You have no bookmarks</p>;

  return (
    <BookmarkPosts posts={bookmarkPosts!} reFetchFunction={getUserBookmarks} />
  );
};

export default Bookmarks;
