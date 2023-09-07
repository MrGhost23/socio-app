import PostForm from "../components/Post/PostForm";
import Posts from "../components/Post/Posts";

const Profile = () => {
  const currentUserId = '618237294201';
  const currentUserFullName = "Omar Adel";
  const currentUserImage =
    "https://cdn.discordapp.com/avatars/683014296342364286/30889b16f6a06a146378d9d10554582b.png?size=1024";

  const userPosts = [
    {
      id: '1',
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
      id: '2',
      text: "Repudiandae ut incidunt! Deleniti numquam maxime ipsa, explicabo iure nesciunt dolores perspiciatis deserunt fugiat sapiente placeat repellendus rem, obcaecati dignissimos illum culpa hic sed accusamus fuga, similique quia optio voluptatem nam? Dolor, nostrum omnis!",
      likes: 400,
      comments: 80,
      authorFullName: "Omar Adel",
      authorTag: "Heisenberg",
      authorImage:
        "https://cdn.discordapp.com/avatars/683014296342364286/30889b16f6a06a146378d9d10554582b.png?size=1024",
      date: "10 hours ago",
    },
  ];

  return (
    <>
      <PostForm />
      <Posts
        currentUserId={currentUserId}
        currentUserFullName={currentUserFullName}
        currentUserImage={currentUserImage}
        posts={userPosts}
      />
    </>
  );
};

export default Profile;
