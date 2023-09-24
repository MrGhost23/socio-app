import { useSelector } from "react-redux";
import { selectUser } from "../store/slices/authSlice";
import { BookmarkPostType } from "../Types/BookmarkPost.types";
import useAxios from "../hooks/useAxios";
import BookmarkPosts from "../components/Post/BookmarkPosts";
import BookmarkPostsSkeleton from "../skeletons/BookmarkPostsSkeleton";

const Bookmarks = () => {
  const currentUser = useSelector(selectUser);

  const {
    data: bookmarkPosts,
    loading: bookmarkPostsIsLoading,
    reFetch: reFetchPosts,
  } = useAxios<BookmarkPostType[]>(
    `http://localhost:5000/api/v1/users/${
      currentUser!.username
    }/bookmarked-posts`,
    "get"
  );

  return (
    <>
      {bookmarkPostsIsLoading ? (
        <BookmarkPostsSkeleton postsNumber={2} />
      ) : bookmarkPosts!.length > 0 ? (
        <BookmarkPosts
          posts={bookmarkPosts!}
          reFetchFunction={reFetchPosts}
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
