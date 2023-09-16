type Props = {
  bio: string;
};

const UserBio: React.FC<Props> = ({ bio }) => {
  return <p className="mb-4 tracking-wide">{bio}</p>;
};

export default UserBio;
