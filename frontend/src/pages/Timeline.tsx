import { Socket } from "socket.io-client";
import { PostType } from "../Types/Post.types";
import PostForm from "../components/Post/PostForm";
import Posts from "../components/Post/Posts";
import PostsSkeleton from "../skeletons/PostsSkeleton";
import InfiniteScroll from "react-infinite-scroll-component";
import PostSkeleton from "../skeletons/PostSkeleton";
import NoDataMessage from "../components/NoDataMessage";
import useInfiniteFetch from "../hooks/useInfiniteFetch";

type Props = {
  socket: Socket;
};

const Timeline: React.FC<Props> = ({ socket }) => {
  const {
    data: feedPosts,
    loading: feedPostsIsLoading,
    setData: setFeedPosts,
    fetchMoreData: fetchMorePosts,
    hasMore: feedPostsHasMore,
  } = useInfiniteFetch<PostType>(
    `https://socio-irdl.onrender.com/api/v1/posts`,
    "get",
    10,
    "_id",
    true
  );

  const addPost = (postData: PostType) => {
    setFeedPosts((prevState) => {
      return [postData, ...prevState!];
    });
  };

  const removePost = (postId: string) => {
    setFeedPosts((prevState) =>
      prevState!.filter((post: PostType) => post._id !== postId)
    );
  };

  const updatePost = (postId: string, description: string, image: string) => {
    setFeedPosts((prevState) => {
      const updatedPosts: PostType[] = [];
      prevState!.forEach((post) => {
        if (post._id === postId) {
          updatedPosts.push({
            ...post,
            description: description,
            postImage: image,
          });
        } else {
          updatedPosts.push(post);
        }
      });
      return updatedPosts;
    });
  };

  return (
    <>
      <PostForm addPost={addPost} />
      {feedPostsIsLoading ? (
        <PostsSkeleton postsNumber={2} />
      ) : feedPosts && feedPosts?.length > 0 ? (
        <InfiniteScroll
          dataLength={feedPosts.length}
          next={fetchMorePosts}
          hasMore={feedPostsHasMore}
          loader={<PostSkeleton className="mt-8" />}
        >
          <Posts
            posts={feedPosts}
            socket={socket}
            removePost={removePost}
            updatePost={updatePost}
          />
        </InfiniteScroll>
      ) : (
        <NoDataMessage message="There are no posts yet." />
      )}
    </>
  );
};

export default Timeline;
