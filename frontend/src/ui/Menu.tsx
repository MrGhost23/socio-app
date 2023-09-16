import { IconType } from "react-icons";
import { BsThreeDots } from "react-icons/bs";
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
  menuIconClasses?: string;
};

const Menu: React.FC<Props> = ({
  isOpen,
  setIsOpen,
  list,
  menuIconClasses,
}) => {
  let iconClasses =
    "text-gray-500 text-lg cursor-pointer transition duration-500";

  if (menuIconClasses) {
    iconClasses += " " + menuIconClasses;
  }

  return (
    <>
      <BsThreeDots
        className={iconClasses}
        onClick={() => setIsOpen((prevState) => !prevState)}
      />
      {isOpen && (
        <ul className="absolute top-6 right-0 z-40 px-4 py-5 bg-white rounded border border-gray-10 shadow-md flex flex-col gap-2 sm:gap-4">
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
    </>
  );
};

export default Menu;
