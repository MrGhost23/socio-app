type Props = {
  bio: string;
}

const UserBio: React.FC<Props> = (props) => {
  return (
    <p className='mb-4 tracking-wide'>{props.bio}</p>
  );
};

export default UserBio;