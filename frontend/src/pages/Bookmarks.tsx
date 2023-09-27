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
    loading: bookmarkPostsIsLoading,
    fetchMoreData: fetchMorePosts,
    hasMore: bookmarkPostsHasMore,
    reFetch: reFetchPosts,
  } = useInfiniteFetch<BookmarkPostType>(
    `http://localhost:5000/api/v1/users/${
      currentUser!.username
    }/bookmarked-posts`,
    "get",
    10,
    true
  );

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
          <BookmarkPosts posts={bookmarkPosts} reFetchFunction={reFetchPosts} />
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
