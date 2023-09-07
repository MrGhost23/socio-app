import User from "./User";

type Props = {
  users: {
    id: string
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
          <User key={user.id} image={user.image} id={user.id} fullName={user.fullName} followers={user.followers} changeStyle={true} />
        )
      }
    </div>
  );
};

export default SuggestedUsers;