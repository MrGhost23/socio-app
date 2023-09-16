import { IconType } from "react-icons";
import { BsThreeDots } from "react-icons/bs";
import useClickOutside from "../hooks/useClickOutside";
import Button from "./Button";

type Props = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  list: {
    id: number;
    text: string;
    action: () => void;
    icon: IconType;
    buttonClasses?: string;
    iconClasses?: string;
    showIf: boolean;
  }[];
  menuIcon?: IconType;
  menuClasses?: string;
  menuIconClasses?: string;
};

const Menu: React.FC<Props> = ({
  isOpen,
  setIsOpen,
  list,
  menuIcon,
  menuClasses,
  menuIconClasses,
}) => {
  let iconClasses =
    "text-gray-500 text-lg cursor-pointer transition duration-500";

  if (menuIconClasses) {
    iconClasses += " " + menuIconClasses;
  }

  let ulClasses =
    "absolute top-6 right-0 z-40 px-4 py-5 bg-white rounded border border-gray-10 shadow-md flex flex-col gap-2 sm:gap-4";

  if (menuIconClasses) {
    ulClasses += " " + menuClasses;
  }

  const MenuIcon = menuIcon || BsThreeDots;

  const onClickOutside = () => {
    setIsOpen(false);
  };

  const selectBoxRef = useClickOutside(onClickOutside);

  return (
    <div>
      <MenuIcon
        className={iconClasses}
        onClick={() => setIsOpen((prevState) => !prevState)}
      />
      {isOpen && (
        <ul className={ulClasses} ref={selectBoxRef}>
          {list.map(
            (item) =>
              item.showIf && (
                <li key={item.id}>
                  <Button
                    text={item.text}
                    bg={false}
                    onClick={item.action}
                    className={item.buttonClasses || ""}
                    icon={item.icon}
                    iconClasses={item.iconClasses || ""}
                  />
                </li>
              )
          )}
        </ul>
      )}
    </div>
  );
};

export default Menu;
