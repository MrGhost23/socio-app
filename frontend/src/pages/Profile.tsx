import axios from "axios";
import PostForm from "../components/Post/PostForm";
import Posts from "../components/Post/Posts";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ProfileType } from "../Types/Profile.types";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

const Profile = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const { id: userId } = useParams();
  const [profile, setProfile] = useState<ProfileType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    const fetchToken = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/v1/users/${userId}`
        );
        setProfile(response.data[0]);
        setLoading(false);
      } catch (error) {
        setError("Error fetching profile data.");
        setLoading(false);
      }
    };

    try {
      fetchToken();
    } catch (error) {
      setError("Error fetching profile data.");
      setLoading(false);
    }
  }, [userId]);

  const isMyProfile = user?.username === profile?.username;
  const currentUserId = profile?.userId;
  const currentUserFullName = profile?.firstName;
  const currentUserImage = profile?.userPicture;
  const userPosts = [
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
      postComments: [],
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

  if (loading) {
    return <div>Loading...</div>;
  } else if (error) {
    return <div>Error: {error}</div>;
  } else {
    return (
      <>
        {isMyProfile && <PostForm src={currentUserImage} />}
        <Posts
          currentUserId={currentUserId}
          currentUserFullName={currentUserFullName}
          currentUserImage={currentUserImage}
          posts={userPosts}
        />
      </>
    );
  }
};

export default Profile;
