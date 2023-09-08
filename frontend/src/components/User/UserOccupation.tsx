import { PiSuitcaseSimple } from "react-icons/pi"

type Props = {
  occupation: string;
}

const UserOccupation: React.FC<Props> = (props) => {
  return (
    <div className='mt-2 mb-1 flex flex-row items-center gap-1 text-lg'>
      <PiSuitcaseSimple className="text-xl" />
      <p>{props.occupation}</p>
    </div>
  );
};

export default UserOccupation;