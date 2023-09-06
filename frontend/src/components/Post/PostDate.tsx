type Props = {
  date: string;
}

const PostDate: React.FC<Props> = ({ date }) => {
  return (
    <p className='text-sm text-gray-500 font-medium tracking-tight'>{date}</p>
  );
};

export default PostDate;