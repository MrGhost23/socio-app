import React from "react";

type Props = {
  type: string;
  className?: string;
  repeat?: number;
};

const SkeletonElement: React.FC<Props> = ({ type, className, repeat }) => {
  let classes = "bg-[#ddd] overflow-hidden rounded-sm";
  switch (type) {
    case "title":
      classes += " w-1/2 h-5";
      break;
    case "text":
      classes += " w-full h-[.95rem]";
      break;
    case "name":
      classes += " w-1/4 h-[0.8rem]";
      break;
    case "date":
      classes += " w-1/4 h-[0.8rem]";
      break;
    case "avatar":
      classes += " !rounded-full";
      break;
    default:
      break;
  }
  if (className) {
    classes += " " + className;
  }

  return (
    <>
      {repeat ? (
        <div className="flex flex-col gap-2">
          {Array.from({ length: repeat }, (_, index) => (
            <div key={index} className={classes}></div>
          ))}
        </div>
      ) : (
        <div className={classes}></div>
      )}
    </>
  );
};

export default SkeletonElement;
