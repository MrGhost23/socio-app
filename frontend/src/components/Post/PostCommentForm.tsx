import UserImage from '../User/UserImage';

type Props = {
  currentUserImage: string;
  currentUserFullName: string;
}

const PostCommentForm: React.FC<Props> = ({ currentUserImage, currentUserFullName }) => {
  return (
    <div className='flex flex-row gap-3'>
      <UserImage className='w-10' src={currentUserImage} alt={currentUserFullName} />
      <textarea className='w-full h-10 mb-3 px-4 py-1.5 border rounded-xl outline-none resize-none' placeholder='Write your comment' />
    </div>
  );
};

export default PostCommentForm;