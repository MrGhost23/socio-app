import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";
import { RootState } from "../store/store";
import { fetchFeedPosts, selectFeedPosts } from "../store/slices/postsSlice";
import Posts from "../components/Post/Posts";
import PostForm from "../components/Post/PostForm";
import {PostType} from '../Types/Post.types';
import Loading from "../ui/Loading";

const Timeline = () => {
  const posts = useSelector(selectFeedPosts);
  const [feedPosts, setFeedPosts] = useState(posts);
  const [loading, setLoading] = useState(true);

  const dispatch: ThunkDispatch<RootState, void, AnyAction> = useDispatch();

  useEffect(() => {
    dispatch(fetchFeedPosts());
    setLoading(false);
  }, [dispatch]);

  useEffect(() => {
    setFeedPosts(posts);
  }, [posts])

  const removePost = (postId: string) => {
    setFeedPosts(prevState => prevState.filter((post: PostType )=> post._id !== postId));
  };

  const updatePost = (postId: string, description: string, image: object) => {
    setFeedPosts((prevState) => {
      const updatedPosts: PostType[] = [];
      prevState.forEach(post => {
        if (post._id === postId) {
          updatedPosts.push({
            ...post,
            description: description,
            postImage: image && URL.createObjectURL(image)
          });
        } else {
          updatedPosts.push(post);
        }
      });
      return updatedPosts;
    });
  };

  if (loading) return <Loading />

  return (
    <>
      <PostForm />
      {
        feedPosts.length > 0 ?
          <Posts posts={feedPosts} removePost={removePost} updatePost={updatePost} />
        :
          <div className="text-center text-gray-800 text-xl">
            There are no posts yet.
          </div>
        }
    </>
  );
};

export default Timeline;
