import { useDispatch, useSelector } from "react-redux";
import Posts from "../components/Post/Posts";
import { RootState } from "../store/store";
import { fetchFeedPosts } from "../store/slices/postsSlice";
import { useEffect, useState } from "react";
import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";
import { FaHeartCircleExclamation } from "react-icons/fa6";
import { FaCommentMedical } from "react-icons/fa";

const Timeline = () => {
  const [loading, setLoading] = useState(true);
  const user = useSelector((state: RootState) => state.auth.user);
  const feedPosts = useSelector((state: RootState) => state.posts.feedPosts);
  console.log(feedPosts);

  const dispatch: ThunkDispatch<RootState, void, AnyAction> = useDispatch();
  const currentUserId = user?.username;
  const currentUserFullName = user?.firstName + " " + user?.lastName;
  const currentUserImage = user?.userPicture;

  const posts = [
    {
      id: "1",
      text: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nesciunt qui placeat ducimus minima praesentium necessitatibus deserunt repudiandae ut incidunt! Deleniti numquam maxime ipsa, explicabo iure nesciunt dolores perspiciatis deserunt fugiat sapiente placeat repellendus rem, obcaecati dignissimos illum culpa hic sed accusamus fuga, similique quia optio voluptatem nam? Dolor, nostrum omnis!",
      image:
        "https://i.pcmag.com/imagery/articles/00Iy7r4lqzdcLM9vUdFIZoN-25..v1628272383.jpg",
      likes: 250,
      comments: 40,
      authorFullName: "Omar Adel",
      authorTag: "Heisenberg",
      authorImage:
        "https://cdn.discordapp.com/avatars/683014296342364286/30889b16f6a06a146378d9d10554582b.png?size=1024",
      date: "2 hours ago",
    },
    {
      id: "2",
      text: "Repudiandae ut incidunt! Deleniti numquam maxime ipsa, explicabo iure nesciunt dolores perspiciatis deserunt fugiat sapiente placeat repellendus rem, obcaecati dignissimos illum culpa hic sed accusamus fuga, similique quia optio voluptatem nam? Dolor, nostrum omnis!",
      likes: 400,
      comments: 80,
      authorFullName: "Omar Adel",
      authorTag: "Heisenberg",
      authorImage:
        "https://cdn.discordapp.com/avatars/683014296342364286/30889b16f6a06a146378d9d10554582b.png?size=1024",
      date: "10 hours ago",
      postComments: [
        {
          id: "1",
          text: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Placeat vero veritatis eligendi quidem obcaecati quae a nostrum labore dolore nisi!",
          date: "3 hours ago",
          authorId: "32893273821",
          authorFullName: "Domenica Dicki",
          authorImage:
            "https://cdn.discordapp.com/attachments/700993218850062381/1140479590012309534/50e2e84b6427e2112ea02507b5bc849f.png",
        },
        {
          id: "2",
          text: "Lorem ipsum dolor sit, amet consectetur adipisicing elit.",
          date: "2 hours ago",
          authorId: "43849384921",
          authorFullName: "Chaya Reichert",
          authorImage:
            "https://cdn.discordapp.com/attachments/700993218850062381/1140477104467742791/6183b49eced8a25862b25a0f2f110f94.png",
        },
        {
          id: "3",
          text: "Lorem ipsum dolor sit, amet consectetur adipisicing elit.",
          date: "40 minutes ago",
          authorId: "43849384921",
          authorFullName: "Soledad Graham",
          authorImage:
            "https://cdn.discordapp.com/attachments/700993218850062381/1140476544339427468/38f761c6e7dd7701cacaa81409ffbaa2.png",
        },
      ],
    },
  ];

  useEffect(() => {
    dispatch(fetchFeedPosts());
    setLoading(false);
  }, [dispatch]);

  return (
    <>
      {loading ? (
        <div>Loading</div>
      ) : (
        <div>
          {feedPosts.map((post) => (
            <div className="mx-auto bg-white rounded-xl shadow-md overflow-hidden py-2 my-8">
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
          ))}
        </div>
      )}
    </>
  );
};

export default Timeline;
