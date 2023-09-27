import { HiOutlineLocationMarker } from "react-icons/hi";

type Props = {
  country: string;
};

const UserCounty: React.FC<Props> = ({ country }) => {
  return (
    <div className="mb-2 flex flex-row items-center gap-1 text-lg dark:text-textLighter">
      <HiOutlineLocationMarker className="text-xl dark:text-textLighter" />
      <p>{country}</p>
    </div>
  );
};

export default UserCounty;
