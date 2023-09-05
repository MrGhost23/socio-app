import Card from "../ui/Card";
import UserInfo from "../components/User/UserInfo";
import Button from "../ui/Button";
import PostForm from "../components/Post/PostForm";
import Posts from "../components/Post/Posts";

const Profile = () => {
  const currentUserFullName = 'Omar Adel';
  const currentUserImage = 'https://cdn.discordapp.com/avatars/683014296342364286/30889b16f6a06a146378d9d10554582b.png?size=1024';

  const userInfo = {
    username: 'Heisenberg',
    firstName: 'Omar',
    lastName: 'Adel',
    image: 'https://cdn.discordapp.com/avatars/683014296342364286/30889b16f6a06a146378d9d10554582b.png?size=1024',
    country: 'Russia',
    bio: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolores, fugiat.',
    followers: 500,
    following: 400
  }

  const userPosts = [
    {
      id: 1,
      text: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nesciunt qui placeat ducimus minima praesentium necessitatibus deserunt repudiandae ut incidunt! Deleniti numquam maxime ipsa, explicabo iure nesciunt dolores perspiciatis deserunt fugiat sapiente placeat repellendus rem, obcaecati dignissimos illum culpa hic sed accusamus fuga, similique quia optio voluptatem nam? Dolor, nostrum omnis!',
      image: 'https://i.pcmag.com/imagery/articles/00Iy7r4lqzdcLM9vUdFIZoN-25..v1628272383.jpg',
      likes: 250,
      comments: 40,
      authorFullName: 'Omar Adel',
      authorTag: 'Heisenberg',
      authorImage: 'https://cdn.discordapp.com/avatars/683014296342364286/30889b16f6a06a146378d9d10554582b.png?size=1024',
      date: '2 hours ago',
    },
    {
      id: 2,
      text: 'Repudiandae ut incidunt! Deleniti numquam maxime ipsa, explicabo iure nesciunt dolores perspiciatis deserunt fugiat sapiente placeat repellendus rem, obcaecati dignissimos illum culpa hic sed accusamus fuga, similique quia optio voluptatem nam? Dolor, nostrum omnis!',
      likes: 400,
      comments: 80,
      authorFullName: 'Omar Adel',
      authorTag: 'Heisenberg',
      authorImage: 'https://cdn.discordapp.com/avatars/683014296342364286/30889b16f6a06a146378d9d10554582b.png?size=1024',
      date: '10 hours ago',
    }
  ]

  return (
    <>
      <div className='col-span-1'>
        <Card className='sticky top-10 px-8 py-4 pb-6 flex flex-col items-center'>
          <UserInfo userInfo={userInfo} />
          <div className='w-full flex flex-col gap-4'>
            <Button text='Follow' />
            <Button text='Report' />
          </div>
        </Card>
      </div>
      <div className="col-span-2">
          <PostForm />
          <Posts currentUserFullName={currentUserFullName} currentUserImage={currentUserImage} posts={userPosts} />
      </div>
    </>
  );
};

export default Profile;