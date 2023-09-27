import { useEffect, useState, useCallback } from "react";
import { Socket } from "socket.io-client";
import { PostType } from "../Types/Post.types";
import PostForm from "../components/Post/PostForm";
import Posts from "../components/Post/Posts";
import PostsSkeleton from "../skeletons/PostsSkeleton";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";
import PostSkeleton from "../skeletons/PostSkeleton";
import NoDataMessage from "../components/NoDataMessage";

type Props = {
  socket: Socket;
};

const Timeline: React.FC<Props> = ({ socket }) => {
  const [feedPosts, setFeedPosts] = useState<PostType[]>([]);
  const [feedPostsIsLoading, setFeedPostsIsLoading] = useState(true);

  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchData = useCallback(
    async (p?: number) => {
      const response = await axios.get(
        `http://localhost:5000/api/v1/posts?page=${p || page}`
      );
      const data = await response.data;

      setFeedPosts((prevData) => [...prevData, ...data]);
      setFeedPostsIsLoading(false);
      setHasMore(data.length === 10);
    },
    [page]
  );

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const reFetchPosts = () => {
    setFeedPostsIsLoading(true);
    setFeedPosts([]);
    setPage(1);
    fetchData(1);
  };

  const fetchMorePosts = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const removePost = (postId: string) => {
    setFeedPosts((prevState) =>
      prevState.filter((post: PostType) => post._id !== postId)
    );
  };

  const updatePost = (postId: string, description: string, image: string) => {
    setFeedPosts((prevState) => {
      const updatedPosts: PostType[] = [];
      prevState.forEach((post) => {
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
      <PostForm fetchPosts={reFetchPosts} />
      {feedPostsIsLoading ? (
        <PostsSkeleton postsNumber={2} />
      ) : feedPosts.length > 0 ? (
        <InfiniteScroll
          dataLength={feedPosts.length}
          next={fetchMorePosts}
          hasMore={hasMore}
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
