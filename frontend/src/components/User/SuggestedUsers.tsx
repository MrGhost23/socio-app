import SuggestedUser from "./SuggestedUser";

type Props = {
  users: {
    id: number
    image: string;
    fullName: string;
    followers: number;
  }[]
};

const SuggestedUsers: React.FC<Props> = ({ users }) => {
  return (
    <div className='pb-5 xl:pb-0 flex flex-row xl:flex-col gap-5 md:gap-8 xl:gap-5 overflow-x-auto'>
      {
        users.map(user =>
          <SuggestedUser key={user.id} image={user.image} fullName={user.fullName} followers={user.followers} />
        )
      }
    </div>
  );
};

export default SuggestedUsers;