import Posts from "../components/Post/Posts";
import Sidebar from "../components/Sidebar";
import SuggestedUsers from "../components/User/SuggestedUsers";
import Card from "../ui/Card";

const Timeline = () => {
  const currentUserId = '618237294201';
  const currentUserFullName = "Omar Adel";
  const currentUserImage =
    "https://cdn.discordapp.com/avatars/683014296342364286/30889b16f6a06a146378d9d10554582b.png?size=1024";

  const posts = [
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

  const suggestedUsers = [
    {
      id: '1',
      image:
        "https://cdn.discordapp.com/attachments/700993218850062381/1140480477833203742/ce7ca87cc7bd870fc40642fd245b011b.png",
      fullName: "Omar Mohamed",
      followers: 400,
    },
    {
      id: '2',
      image:
        "https://cdn.discordapp.com/attachments/700993218850062381/1140480078644531220/352a1b49195bfa773765b4fdfb17da42.png",
      fullName: "Tomasa Runolfsson",
      followers: 400,
    },
    {
      id: '3',
      image:
        "https://cdn.discordapp.com/attachments/700993218850062381/1140479590012309534/50e2e84b6427e2112ea02507b5bc849f.png",
      fullName: "Hubert White",
      followers: 400,
    },
    {
      id: '4',
      image:
        "https://cdn.discordapp.com/attachments/700993218850062381/1140477104467742791/6183b49eced8a25862b25a0f2f110f94.png",
      fullName: "Adelbert Sawayn",
      followers: 400,
    },
    {
      id: '5',
      image:
        "https://cdn.discordapp.com/attachments/700993218850062381/1140476544339427468/38f761c6e7dd7701cacaa81409ffbaa2.png",
      fullName: "Yvette Mayer",
      followers: 400,
    },
  ];

  return (
    <div className="w-full pr-20 grid grid-cols-4 gap-16">
      <Sidebar />
      <div className="col-span-2 pt-10">
        <Posts
          currentUserId={currentUserId}
          currentUserFullName={currentUserFullName}
          currentUserImage={currentUserImage}
          posts={posts}
        />
      </div>
      <div>
        <Card className="sticky top-32 px-8 py-4 pb-6 flex flex-col !text-left">
          <h3 className="mb-5 text-xl">Suggested for you</h3>
          <SuggestedUsers users={suggestedUsers} />
        </Card>
      </div>
    </div>
  );
};

export default Timeline;
