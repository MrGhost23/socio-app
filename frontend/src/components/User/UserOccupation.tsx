import { PiSuitcaseSimple } from "react-icons/pi";

type Props = {
  occupation?: string;
};

const UserOccupation: React.FC<Props> = ({ occupation }) => {
  return (
    <>
      {occupation && (
        <div className="mt-2 mb-1 flex flex-row items-center gap-1 text-lg">
          <PiSuitcaseSimple className="text-xl" />
          <p>{occupation}</p>
        </div>
      )}
    </>
  );
};

export default UserOccupation;
