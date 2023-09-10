import PostForm from "../components/Post/PostForm";
import Posts from "../components/Post/Posts";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import useUserProfile from "../hooks/useUserProfile";
import { selectUser } from "../store/slices/authSlice";
import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";
import { RootState } from "../store/store";
import { fetchUserPosts, selectUserPosts } from "../store/slices/postsSlice";
import { useEffect } from "react";

const Profile = () => {
  const user = useSelector(selectUser);
  const userPosts = useSelector(selectUserPosts);
  console.log(userPosts);
  const { id: userId } = useParams();
  const { profile, loading, error } = useUserProfile(userId);
  const dispatch: ThunkDispatch<RootState, void, AnyAction> = useDispatch();

  useEffect(() => {
    dispatch(fetchUserPosts(userId));
  }, [dispatch]);

  const isMyProfile = user?.username === profile?.username;
  const currentUserId = profile?.userId;
  const currentUserFullName = profile?.firstName;
  const currentUserImage = profile?.userPicture;

  if (loading) {
    return <div>Loading...</div>;
  } else if (error) {
    return <div>Error: {error}</div>;
  } else {
    return (
      <>
        {isMyProfile && <PostForm src={currentUserImage} />}
        {userPosts.length > 0 ? (
          userPosts.map((post) => (
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
                    <span>0 Likes</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span>0 Comments</span>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-gray-800 text-xl">
            There are no posts yet for this user.
          </div>
        )}
      </>
    );
  }
};

export default Profile;
