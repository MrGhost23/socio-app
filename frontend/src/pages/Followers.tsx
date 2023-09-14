import { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import axios from 'axios';
import { UserType } from '../Types/User.types';
import Users from "../components/User/Users";
import Card from '../ui/Card';
import SearchInput from "../ui/SearchInput";
import Loading from '../ui/Loading';

const Followers = () => {
  const { username } = useParams();

  const [followers, setFollowers] = useState<UserType[]>();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchPostData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/v1/users/${username}/followers`);
        setFollowers(response.data);
      } catch (error) {
        setError(!!error)
      }
      setIsLoading(false);
    }

    fetchPostData();
  }, [username])

  if (isLoading) return <Loading />;
  if (error) return <p>An error occurred</p>;

  return (
    <Card className="sticky top-32 px-8 py-4 pb-6 flex flex-col !text-left">
      <h3 className="mb-5 text-xl">Followers</h3>
      <SearchInput className="mb-5" />
      <Users users={followers!} mode='follow' />
    </Card>
  );
};

export default Followers;
