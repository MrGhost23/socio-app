import {GrLocation} from 'react-icons/gr';

type Props = {
  country: string;
}

const UserCounty: React.FC<Props> = (props) => {
  return (
    <div className='mb-2 flex flex-row items-center gap-1 text-lg'>
      <GrLocation className="text-xl" />
      <p>{props.country}</p>
    </div>
  );
};

export default UserCounty;