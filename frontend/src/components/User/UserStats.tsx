type Props = {
  followers: number;
  following: number;
}

const UserStats: React.FC<Props> = (props) => {
  return (
    <div className='mb-5 flex flex-row gap-3 tracking-wide'>
      <div className='flex flex-col gap-1'>
        <p>Followers</p>
        <p className='text-lg font-semibold'>{props.followers}</p>
      </div>
      <div className='w-0.5 h-16 bg-gray-200'></div>
      <div className='flex flex-col gap-1'>
        <p>Following</p>
        <p className='text-lg font-semibold'>{props.following}</p>
      </div>
    </div>
  );
};

export default UserStats;