type Props = {
  bio: string;
};

const UserBio: React.FC<Props> = ({ bio }) => {
  return <p className="mb-4 tracking-wide break-all">{bio}</p>;
};

export default UserBio;
