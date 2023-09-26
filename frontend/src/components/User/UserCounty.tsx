import { GrLocation } from "react-icons/gr";

type Props = {
  country: string;
};

const UserCounty: React.FC<Props> = ({ country }) => {
  return (
    <div className="mb-2 flex flex-row items-center gap-1 text-lg dark:text-textLighter">
      <GrLocation className="text-xl dark:text-textLighter" />
      <p>{country}</p>
    </div>
  );
};

export default UserCounty;
