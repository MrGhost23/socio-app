import { useState, useEffect } from 'react';
import User from '../components/User/User';
import Card from '../ui/Card';
import axios from 'axios';
import Loading from '../ui/Loading';
import { UserType } from '../Types/User.types';
import { useSelector } from 'react-redux';
import { selectUser } from '../store/slices/authSlice';

const FindFriends = () => {
  const currentUser = useSelector(selectUser);

  const[suggestedUsers, setSuggestedUsers] = useState<UserType[]>();
  const[suggestedUsersLoading, setSuggestedUsersLoading] = useState<boolean>(true);
  const[suggestedUsersError, setSuggestedUsersError] = useState<boolean>(false);

  useEffect(() => {
    const fetchSuggestedUsers = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/v1/users/${currentUser!.username}/find-friends`
        );
        setSuggestedUsers(response.data);
      } catch (error) {
        setSuggestedUsersError(!!error);
      }
      setSuggestedUsersLoading(false);
    };
    fetchSuggestedUsers();
  }, [currentUser]);

  return (
    <Card className='p-8 !text-left'>
      <h3 className="mb-5 text-xl">Find Friends</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
        {
          suggestedUsersLoading ?
            <Loading />
          : suggestedUsersError ?
            'An error occurred'
          : suggestedUsers?.length ?
            suggestedUsers.map(user => (
              <User key={user.username} user={user} changeStyle={false} mode='follow' />
            ))
          :
            'Found no users to suggest'
        }
      </div>
    </Card>
  );
};

export default FindFriends;