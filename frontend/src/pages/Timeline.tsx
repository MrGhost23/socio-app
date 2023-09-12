import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";
import { RootState } from "../store/store";
import {
  fetchFeedPosts,
  selectFeedPosts,
  selectPost,
} from "../store/slices/postsSlice";
import Posts from "../components/Post/Posts";
import PostForm from "../components/Post/PostForm";

const Timeline = () => {
  const [loading, setLoading] = useState(true);
  const feedPosts = useSelector(selectFeedPosts);
  const posts = useSelector(selectPost);

  const dispatch: ThunkDispatch<RootState, void, AnyAction> = useDispatch();

  useEffect(() => {
    dispatch(fetchFeedPosts());
    setLoading(false);
  }, [dispatch, posts]);

  return (
    <>
      {loading ? (
        <div>Loading</div>
      ) : (
        <div>
          <PostForm />
          <Posts posts={feedPosts} />
          {/* {feedPosts.map((post) => (
            <div
              key={post._id}
              className="mx-auto bg-white rounded-xl shadow-md overflow-hidden py-2 my-8"
            >
              {post.postImage && (
                <img
                  className="w-full h-64 object-cover"
                  src={post.postImage}
                  alt="Post"
                />
              )}
              <div className="px-6 py-4">
                <div className="flex items-center">
                  <img
                    className="w-10 h-10 rounded-full mr-4"
                    src={post.userPicture}
                    alt={`Avatar of ${post.username}`}
                  />
                  <div>
                    <div className="text-xl font-medium">
                      {post.firstName + " " + post.lastName}
                    </div>
                    <div className="text-sm text-gray-400 font-medium">
                      {post.username}
                    </div>
                  </div>
                </div>
                <p className="mt-4 text-gray-800">{post.description}</p>
              </div>
              <div className="px-6 py-2 border-t border-gray-200">
                <div className="flex justify-between">
                  <div className="flex items-center my-2 space-x-4">
                    <span>{Object.keys(post.likes).length} Likes</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span>{post.comments.length} Comments</span>
                  </div>
                </div>
              </div>
            </div>
          ))} */}
        </div>
      )}
    </>
  );
};

export default Timeline;
