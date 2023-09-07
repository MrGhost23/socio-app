import User from './User';

type Props = {
  users: {
    id: string
    image: string;
    fullName: string;
    followers: number;
  }[]
};

const Users:React.FC<Props> = ({ users }) => {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
      {
        users.map(user =>
          <User key={user.id} id={user.id} image={user.image} fullName={user.fullName} followers={user.followers} changeStyle={false} />
        )
      }
    </div>
  );
};

export default Users;