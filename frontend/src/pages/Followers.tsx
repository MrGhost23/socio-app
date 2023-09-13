import Users from "../components/User/Users";
import Card from '../ui/Card';
import SearchInput from "../ui/SearchInput";

const Followers = () => {
  const suggestedUsers = [
    {
      username: 'MrGhost',
      image:
        "https://cdn.discordapp.com/attachments/700993218850062381/1140480477833203742/ce7ca87cc7bd870fc40642fd245b011b.png",
      fullName: "Omar Mohamed",
      followers: [],
    },
    {
      username: 'TomasaRunolfsson',
      image:
        "https://cdn.discordapp.com/attachments/700993218850062381/1140480078644531220/352a1b49195bfa773765b4fdfb17da42.png",
      fullName: "Tomasa Runolfsson",
      followers: [],
    },
    {
      username: 'HubertWhite',
      image:
        "https://cdn.discordapp.com/attachments/700993218850062381/1140479590012309534/50e2e84b6427e2112ea02507b5bc849f.png",
      fullName: "Hubert White",
      followers: [],
    },
    {
      username: 'AdelbertSawayn',
      image:
        "https://cdn.discordapp.com/attachments/700993218850062381/1140477104467742791/6183b49eced8a25862b25a0f2f110f94.png",
      fullName: "Adelbert Sawayn",
      followers: [],
    },
    {
      username: 'YvetteMayer',
      image:
        "https://cdn.discordapp.com/attachments/700993218850062381/1140476544339427468/38f761c6e7dd7701cacaa81409ffbaa2.png",
      fullName: "Yvette Mayer",
      followers: [],
    },
  ];

  return (
    <Card className="sticky top-32 px-8 py-4 pb-6 flex flex-col !text-left">
      <h3 className="mb-5 text-xl">Followers</h3>
      <SearchInput className="mb-5" />
      <Users users={suggestedUsers} mode='follow' />
    </Card>
  );
};

export default Followers;
