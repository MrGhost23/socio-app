import PostForm from "../components/Post/PostForm";
import Posts from "../components/Post/Posts";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import useUserProfile from "../hooks/useUserProfile";
import { selectUser } from "../store/slices/authSlice";
import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";
import { RootState } from "../store/store";
import noAvatar from "../assets/noAvatar.png";

import { fetchUserPosts, selectUserPosts } from "../store/slices/postsSlice";
import { useEffect } from "react";

const Profile = () => {
  const user = useSelector(selectUser);
  const userPosts = useSelector(selectUserPosts);
  const posts = useSelector(selectUserPosts);

  const { id: userId } = useParams();
  const { profile, loading, error } = useUserProfile(userId);
  const dispatch: ThunkDispatch<RootState, void, AnyAction> = useDispatch();

  useEffect(() => {
    dispatch(fetchUserPosts(userId));
  }, [dispatch, posts]);

  const isMyProfile = user?.username === profile?.username;
  const currentUserId = profile?.userId;
  const currentUserFullName = profile?.firstName;
  const currentUserImage = profile?.userPicture || noAvatar;

  if (loading) {
    return <div>Loading...</div>;
  } else if (error) {
    return <div>Error: {error}</div>;
  } else {
    return (
      <>
        {isMyProfile && <PostForm src={currentUserImage} />}
        {userPosts.length > 0 ? (
          <Posts
            currentUserFullName={user?.firstName + " " + user?.lastName}
            currentUserId={user?.userId}
            currentUserImage={user?.userPicture || noAvatar}
            posts={userPosts}
          />
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
