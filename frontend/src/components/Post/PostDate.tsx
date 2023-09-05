type Props = {
  date: string;
}

const PostDate: React.FC<Props> = ({ date }) => {
  return (
    <p className='text-xs'>{date}</p>
  );
};

export default PostDate;