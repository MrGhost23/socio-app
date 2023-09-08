import User from '../components/User/User';
import Card from '../ui/Card';

const FindFriends = () => {
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
    <Card className='p-8 !text-left'>
      <h3 className="mb-5 text-xl">Find Friends</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {
          suggestedUsers.map(user =>
            <User key={user.id} image={user.image} id={user.id} fullName={user.fullName} followers={user.followers} changeStyle={false} mode='follow' />
          )
        }
      </div>
    </Card>
  );
};

export default FindFriends;