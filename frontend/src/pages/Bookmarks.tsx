import { useSelector } from "react-redux";
import { selectUser } from "../store/slices/authSlice";
import { BookmarkPostType } from "../Types/BookmarkPost.types";
import BookmarkPosts from "../components/Post/BookmarkPosts";
import BookmarkPostsSkeleton from "../skeletons/BookmarkPostsSkeleton";
import NoDataMessage from "../components/NoDataMessage";
import useInfiniteFetch from "../hooks/useInfiniteFetch";
import InfiniteScroll from "react-infinite-scroll-component";
import PostSkeleton from "../skeletons/PostSkeleton";

const Bookmarks = () => {
  const currentUser = useSelector(selectUser);

  const {
    data: bookmarkPosts,
    setData: setBookmarkPosts,
    loading: bookmarkPostsIsLoading,
    fetchMoreData: fetchMorePosts,
    hasMore: bookmarkPostsHasMore,
  } = useInfiniteFetch<BookmarkPostType>(
    `https://socio-irdl.onrender.com/api/v1/users/${
      currentUser!.username
    }/bookmarked-posts`,
    "get",
    10,
    "_id",
    true
  );

  const removeBookmark = (postId: string) => {
    setBookmarkPosts((prevState) =>
      prevState!.filter((post: BookmarkPostType) => post._id !== postId)
    );
  };

  return (
    <>
      {bookmarkPostsIsLoading ? (
        <BookmarkPostsSkeleton postsNumber={2} />
      ) : bookmarkPosts && bookmarkPosts.length > 0 ? (
        <InfiniteScroll
          dataLength={bookmarkPosts.length}
          next={fetchMorePosts}
          hasMore={bookmarkPostsHasMore}
          loader={<PostSkeleton className="mt-8" />}
        >
          <BookmarkPosts
            posts={bookmarkPosts}
            removeBookmarkFunction={removeBookmark}
          />
        </InfiniteScroll>
      ) : (
        <NoDataMessage
          message="You have no bookmarks."
          className="text-center text-gray-800 text-xl"
        />
      )}
    </>
  );
};

export default Bookmarks;
