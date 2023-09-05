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
    <div className='flex flex-col gap-5'>
      {
        users.map(user =>
          <SuggestedUser key={user.id} image={user.image} fullName={user.fullName} followers={user.followers} />
        )
      }
    </div>
  );
};

export default SuggestedUsers;