import { useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { ImBlocked } from "react-icons/im";
import { PiWarningBold } from "react-icons/pi";
import useProfileActions from "../../hooks/useProfileActions";
import Menu from "../../ui/Menu";
import { toggleBlockUser } from "../../store/slices/authSlice";
import { useDispatch } from "react-redux";
import { RootState } from "../../store/store";
import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";

type Props = {
  isMyProfile: boolean;
  profileUsername: string;
};

const UserMenu: React.FC<Props> = ({ isMyProfile, profileUsername }) => {
  const dispatch: ThunkDispatch<RootState, void, AnyAction> = useDispatch();

  const { reportUser } = useProfileActions();

  const toggleBlockHandler = () => {
    dispatch(toggleBlockUser({ username: profileUsername }));
    setMenuOpened(false);
  };

  const reportHandler = () => {
    reportUser();
    setMenuOpened(false);
  };

  const [menuOpened, setMenuOpened] = useState(false);

  const menuList = [
    {
      id: 1,
      text: "Block",
      action: toggleBlockHandler,
      icon: ImBlocked,
      showIf: true,
    },
    {
      id: 2,
      text: "Report",
      action: reportHandler,
      icon: PiWarningBold,
      iconClasses: "!text-lg",
      showIf: true,
    },
  ];

  return (
    <>
      {!isMyProfile && (
        <Menu
          isOpen={menuOpened}
          setIsOpen={setMenuOpened}
          list={menuList}
          menuIcon={BsThreeDotsVertical}
          menuClasses="!top-7 !-right-2 lg:translate-x-full"
          menuIconClasses={
            menuOpened
              ? "absolute !text-xl text-sky-500 cursor-pointer"
              : "absolute !text-xl hover:text-sky-500"
          }
        />
      )}
    </>
  );
};

export default UserMenu;
