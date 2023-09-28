import { useState, useEffect } from "react";
import { PostType } from "../../Types/Post.types";
import { Comment } from "../../Types/Comment.types";
import Card from "../../ui/Card";
import UserImage from "../User/UserImage";
import UserTag from "../User/UserTag";
import UserFullName from "../User/UserFullName";
import PostText from "./PostText";
import PostImage from "./PostImage";
import PostDate from "./PostDate";
import PostStats from "./PostStats";
import CommentForm from "../Comment/CommentForm";
import PostForm from "./PostForm";
import HorizontalLine from "../../ui/HorizontalLine";
import Comments from "../Comment/Comments";
import PostMenu from "./PostMenu";
import { useSelector } from "react-redux";
import { selectUser } from "../../store/slices/authSlice";
import { Socket } from "socket.io-client";
import useInfiniteFetch from "../../hooks/useInfiniteFetch";

interface Likes {
  [key: string]: boolean;
}

type Props = {
  post: PostType;
  updatePost: (postId: string, description: string, image: string) => void;
  removePost: (postId: string) => void;
  socket: Socket;
};

const Post: React.FC<Props> = ({ post, removePost, updatePost, socket }) => {
  const { username } = useSelector(selectUser)!;
  const [likes, setLikes] = useState<Likes>(post.likes);

  const likeFunction = () => {
    setLikes((prevState) => {
      return {
        ...prevState,
        [username]: true,
      };
    });
    socket.emit("sendNotification", {
      senderUsername: username,
      receiverUsername: post.username,
      actionType: "like",
      postId: post._id,
    });
  };

  const unLikeFunction = () => {
    setLikes((prevState) => {
      const updatedLikes = { ...prevState };
      delete updatedLikes[username];
      return updatedLikes;
    });
  };

  const [isEditing, setIsEditing] = useState(false);
  const [total, setTotal] = useState(0);

  const {
    data: comments,
    total: totalComments,
    loading: feedPostsIsLoading,
    setData: setComments,
    fetchMoreData: fetchMoreComments,
    hasMore: commentsHasMore,
  } = useInfiniteFetch<Comment>(
    `http://localhost:5000/api/v1/posts/${post._id}/comments`,
    "get",
    10,
    "_id",
    true,
    true,
    true
  );

  useEffect(() => {
    setTotal(totalComments);
  }, [totalComments]);

  const addCommentFunction = (commentData: Comment) => {
    setComments((prevState) => {
      return [...prevState!, commentData];
    });

    setTotal((prevValue) => prevValue + 1);
  };

  const removeCommentFunction = (commentId: string) => {
    setComments((prevState) =>
      prevState!.filter((comment: Comment) => comment._id !== commentId)
    );

    setTotal((prevValue) => prevValue - 1);
  };

  const editCommentFunction = (commentId: string, text: string) => {
    setComments((prevState) => {
      const updatedComments: Comment[] = [];
      prevState!.forEach((comment) => {
        if (comment._id === commentId) {
          updatedComments.push({ ...comment, text });
        } else {
          updatedComments.push(comment);
        }
      });
      return updatedComments;
    });
  };

  if (feedPostsIsLoading) return;

  return (
    <Card className="px-8 py-6 !text-left dark:bg-primarylessDark">
      <div className="relative mb-2 flex flex-row justify-between gap-3">
        <div className="flex flex-row gap-3">
          <UserImage
            className="min-w-[3rem] sm:min-w-[3.5rem] w-12 sm:w-14 min-h-[3rem] sm:min-h-[3.5rem] h-12 sm:h-14"
            src={post.userPicture}
            username={post.username}
            link={true}
          />
          <div className="flex flex-col items-start gap-1">
            <div className="flex flex-col">
              <div className="flex flex-col md:flex-row md:items-center md:gap-2">
                <UserFullName
                  fullName={post.firstName + " " + post.lastName}
                  username={post.username}
                  className="!text-base sm:!text-lg"
                />
                <UserTag
                  username={post.username}
                  className="!text-xs sm:!text-sm"
                />
              </div>
              <PostDate
                date={post.createdAt}
                id={post._id}
                className="!text-xs sm:!text-sm"
              />
            </div>
          </div>
        </div>
        <PostMenu
          postId={post._id}
          username={post.username}
          setIsEditing={setIsEditing}
          removePost={removePost}
        />
      </div>
      <div className="flex flex-col">
        {isEditing ? (
          <PostForm
            text={post.description}
            postImage={post.postImage}
            postId={post._id}
            setIsEditing={setIsEditing}
            updatePost={updatePost}
          />
        ) : (
          <>
            <PostText text={post.description} />
            {post.postImage && (
              <PostImage
                src={`http://localhost:5000/post_assets/${encodeURIComponent(
                  post.postImage
                )}`}
                alt=""
              />
            )}
          </>
        )}
        <HorizontalLine className="my-2" />
        <PostStats
          likes={likes}
          comments={total}
          postId={post._id}
          likeFunction={likeFunction}
          unLikeFunction={unLikeFunction}
        />
        <HorizontalLine className="mb-5" />
        <Comments
          comments={comments!}
          removeCommentFunction={removeCommentFunction}
          editCommentFunction={editCommentFunction}
          fetchMoreComments={fetchMoreComments}
          commentsHasMore={commentsHasMore}
          socket={socket}
        />
        <CommentForm
          socket={socket}
          postId={post._id}
          addCommentFunction={addCommentFunction}
          postAuthorUsername={post.username}
        />
      </div>
    </Card>
  );
};

export default Post;
