import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";
import { RootState } from "../store/store";
import { selectUser } from "../store/slices/authSlice";
import { fetchUserPosts, selectUserPosts } from "../store/slices/postsSlice";
import useUserProfile from "../hooks/useUserProfile";
import PostForm from "../components/Post/PostForm";
import Posts from "../components/Post/Posts";

const Profile = () => {
  const user = useSelector(selectUser);
  const userPosts = useSelector(selectUserPosts);

  const { username } = useParams();
  const { profile, loading, error } = useUserProfile(username!);
  const dispatch: ThunkDispatch<RootState, void, AnyAction> = useDispatch();

  useEffect(() => {
    dispatch(fetchUserPosts(username));
  }, [dispatch, username]);

  const isMyProfile = user?.username === profile?.username;

  if (loading) {
    return <div>Loading...</div>;
  } else if (error) {
    return <div>Error: {error}</div>;
  } else {
    return (
      <>
        {isMyProfile && <PostForm />}
        {userPosts.length > 0 ? (
          <Posts posts={userPosts} />
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
