import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "../store/slices/authSlice";
import { PostType } from "../Types/Post.types";
import PostForm from "../components/Post/PostForm";
import Posts from "../components/Post/Posts";
import PostsSkeleton from "../skeletons/PostsSkeleton";
import { Socket } from "socket.io-client";
import NoDataMessage from "../components/NoDataMessage";
import useInfiniteFetch from "../hooks/useInfiniteFetch";
import InfiniteScroll from "react-infinite-scroll-component";
import PostSkeleton from "../skeletons/PostSkeleton";

type Props = {
  socket: Socket;
};

const Profile: React.FC<Props> = ({ socket }) => {
  const { username } = useParams();
  const navigate = useNavigate();

  const currentUser = useSelector(selectUser);
  const isMyProfile = currentUser?.username === username;

  const {
    data: profilePosts,
    loading: profilePostsIsLoading,
    error: profilePostsHasError,
    setData: setFeedPosts,
    hasMore: feedPostsHasMore,
    fetchMoreData: fetchMorePosts,
    reFetch: reFetchPosts,
  } = useInfiniteFetch<PostType>(
    `http://localhost:5000/api/v1/posts/user/${username}`,
    "get",
    10
  );

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

  useEffect(() => {
    if (profilePostsHasError) {
      navigate("/error");
    }
  }, [navigate, profilePostsHasError]);

  if (profilePostsHasError) return;

  return (
    <>
      {isMyProfile && <PostForm fetchPosts={reFetchPosts} />}
      {profilePostsIsLoading ? (
        <PostsSkeleton postsNumber={2} />
      ) : profilePosts && profilePosts.length > 0 ? (
        <InfiniteScroll
          dataLength={profilePosts.length}
          next={fetchMorePosts}
          hasMore={feedPostsHasMore}
          loader={<PostSkeleton className="mt-8" />}
        >
          <Posts
            posts={profilePosts}
            removePost={removePost}
            updatePost={updatePost}
            socket={socket}
          />
        </InfiniteScroll>
      ) : (
        <NoDataMessage
          message={`${
            isMyProfile ? "You" : "This user"
          } didn't post anything yet.`}
          className="text-center text-gray-800 text-xl"
        />
      )}
    </>
  );
};

export default Profile;
