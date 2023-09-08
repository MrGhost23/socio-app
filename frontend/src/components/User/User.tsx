import Button from '../../ui/Button';
import UserImage from './UserImage';
import UserFullName from './UserFullName';

type Props = {
  image: string;
  id: string;
  fullName: string;
  followers: number;
  changeStyle: boolean;
};

const SuggestedUser: React.FC<Props> = ({ image, id, fullName, followers, changeStyle }) => {
  const mainContainerClasses = 'flex items-center gap-2'
  const infoContainerClasses = 'flex flex-col text-gray-600'

  return (
    <div className={changeStyle ? mainContainerClasses + ' flex-col xl:flex-row' : mainContainerClasses + ' flex-row'}>
      <UserImage className='w-16 h-16 !mb-0' src={image} alt={fullName} id={id} />
      <div className={changeStyle ? infoContainerClasses + ' items-center xl:items-start' : infoContainerClasses}>
        <UserFullName className='!text-base font-medium whitespace-nowrap' fullName={fullName} id={id} />
        <p className='text-sm whitespace-nowrap'>{followers} followers</p>
        <Button text='Follow' bg={false} className='!text-sm' />
      </div>
    </div>
  );
};

export default SuggestedUser;