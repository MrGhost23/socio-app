import { UserType } from "../../Types/User.types";
import User from "./User";

type Props = {
  users: UserType[];
};

const SuggestedUsers: React.FC<Props> = ({ users }) => {
  return (
    <div className='pb-5 xl:pb-0 flex flex-row xl:flex-col gap-5 md:gap-8 xl:gap-3 overflow-x-auto'>
      {
        users.map(user =>
          <User key={user.username} user={user} changeStyle={true} mode='follow' center={true} />
        )
      }
    </div>
  );
};

export default SuggestedUsers;