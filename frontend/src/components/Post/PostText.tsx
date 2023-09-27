import { useState } from "react";
import isArabic from "../../utils/isArabic";

type Props = {
  text: string;
};

const PostText: React.FC<Props> = ({ text }) => {
  const textIsInArabic = isArabic(text);
  const max = 300;
  const [textSliced, setTextSliced] = useState(text?.length > max);

  const seeMore = () => {
    setTextSliced(false);
  };

  return (
    <p
      className={
        textIsInArabic
          ? "text-right break-all dark:text-textLighter"
          : "text-left break-all dark:text-textLighter"
      }
    >
      {textSliced ? text?.slice(0, max - 3) + "... " : text}

      {textSliced && (
        <span
          className="description-sm description-gray-500 font-semibold whitespace-nowrap cursor-pointer transition duration-500 hover:description-sky-500"
          onClick={seeMore}
        >
          See more
        </span>
      )}
    </p>
  );
};

export default PostText;
