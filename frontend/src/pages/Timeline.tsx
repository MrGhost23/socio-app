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
        </div>
      )}
    </>
  );
};

export default Timeline;
