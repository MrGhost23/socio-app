import ScrollableDiv from '../../ui/ScrollableDiv';
import User from './User';

type Props = {
  users: {
    username: string
    image: string;
    fullName: string;
    followers: string[];
  }[];
  mode: string;
};

const Users:React.FC<Props> = ({ users, mode }) => {
  const classes = mode === "follow" ? "md:grid-cols-2" : "lg:grid-cols-2 xl:grid-cols-1";

  return (
    <ScrollableDiv className="h-fit max-h-[80vh]">
      <div className={`grid grid-cols-1 ${classes} gap-3`}>
      {
        users.map(user =>
          <User key={user.username} {...user} changeStyle={false} mode={mode} />
        )
      }
    </div>
    </ScrollableDiv>
  );
};

export default Users;