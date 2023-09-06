import Card from "../ui/Card";
import UserInfo from "../components/User/UserInfo";
import Button from "../ui/Button";
import PostForm from "../components/Post/PostForm";
import Posts from "../components/Post/Posts";
import SuggestedUsers from "../components/User/SuggestedUsers";
import { BsThreeDotsVertical } from "react-icons/bs";

const Profile = () => {
  const currentUserFullName = "Omar Adel";
  const currentUserImage =
    "https://cdn.discordapp.com/avatars/683014296342364286/30889b16f6a06a146378d9d10554582b.png?size=1024";

  const userInfo = {
    username: "Heisenberg",
    firstName: "Omar",
    lastName: "Adel",
    image:
      "https://cdn.discordapp.com/avatars/683014296342364286/30889b16f6a06a146378d9d10554582b.png?size=1024",
    country: "Russia",
    bio: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolores, fugiat.",
    followers: 500,
    following: 400,
  };

  const userPosts = [
    {
      id: 1,
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
      id: 2,
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
      id: 1,
      image:
        "https://cdn.discordapp.com/attachments/700993218850062381/1140480477833203742/ce7ca87cc7bd870fc40642fd245b011b.png",
      fullName: "Omar Mohamed",
      followers: 400,
    },
    {
      id: 2,
      image:
        "https://cdn.discordapp.com/attachments/700993218850062381/1140480078644531220/352a1b49195bfa773765b4fdfb17da42.png",
      fullName: "Tomasa Runolfsson",
      followers: 400,
    },
    {
      id: 3,
      image:
        "https://cdn.discordapp.com/attachments/700993218850062381/1140479590012309534/50e2e84b6427e2112ea02507b5bc849f.png",
      fullName: "Hubert White",
      followers: 400,
    },
    {
      id: 4,
      image:
        "https://cdn.discordapp.com/attachments/700993218850062381/1140477104467742791/6183b49eced8a25862b25a0f2f110f94.png",
      fullName: "Adelbert Sawayn",
      followers: 400,
    },
    {
      id: 5,
      image:
        "https://cdn.discordapp.com/attachments/700993218850062381/1140476544339427468/38f761c6e7dd7701cacaa81409ffbaa2.png",
      fullName: "Yvette Mayer",
      followers: 400,
    },
  ];

  return (
    <>
      <div className="col-span-1 order-1">
        <Card className="sticky top-10 px-8 py-8 flex flex-col items-center">
          <BsThreeDotsVertical className="absolute top-10 right-6 text-xl text-gray-500 cursor-pointer transition duration-500 hover:text-indigo-700" />
          <UserInfo userInfo={userInfo} />
          <div className="w-full flex flex-col gap-4">
            <Button text="Follow" />
            <Button text="Edit profile" />
          </div>
        </Card>
      </div>
      <div className="col-span-2 order-3 lg:order-2">
        <PostForm />
        <Posts
          currentUserFullName={currentUserFullName}
          currentUserImage={currentUserImage}
          posts={userPosts}
        />
      </div>
      <div className="col-span-1 order-2 xl:order-3">
        <Card className="sticky top-10 px-8 py-4 pb-6 flex flex-col !text-left">
          <h3 className="mb-5 text-xl">Suggested for you</h3>
          <SuggestedUsers users={suggestedUsers} />
        </Card>
      </div>
    </>
  );
};

export default Profile;
