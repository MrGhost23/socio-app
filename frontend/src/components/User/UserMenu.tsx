import { useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { ImBlocked } from "react-icons/im";
import { PiWarningBold } from "react-icons/pi";
import useProfileActions from "../../hooks/useProfileActions";
import Button from "../../ui/Button";

type Props = {
  isMyProfile: boolean;
  profileUsername: string;
};

const UserMenu: React.FC<Props> = ({ isMyProfile, profileUsername }) => {
  const { toggleBlockUser, reportUser } = useProfileActions();

  const toggleBlockHandler = () => {
    toggleBlockUser(profileUsername);
    setMenuOpened(false);
  };

  const reportHandler = () => {
    reportUser();
    setMenuOpened(false);
  };

  const [menuOpened, setMenuOpened] = useState(false);

  return (
    <>
      {!isMyProfile && (
        <BsThreeDotsVertical
          className={
            menuOpened
              ? "absolute text-xl text-sky-500 cursor-pointer"
              : "absolute text-xl text-gray-500 cursor-pointer transition duration-500 hover:text-sky-500"
          }
          onClick={() => setMenuOpened((prevState) => !prevState)}
        />
      )}
      {menuOpened && (
        <ul className="absolute top-7 -right-2 md:translate-x-full px-6 py-4 bg-white rounded border border-gray-10 shadow-md flex flex-col gap-4">
          <li>
            <Button
              text="Block"
              bg={false}
              onClick={toggleBlockHandler}
              icon={ImBlocked}
            />
          </li>
          <li>
            <Button
              text="Report"
              bg={false}
              onClick={reportHandler}
              icon={PiWarningBold}
              iconClasses="!text-lg"
            />
          </li>
        </ul>
      )}
    </>
  );
};

export default UserMenu;
