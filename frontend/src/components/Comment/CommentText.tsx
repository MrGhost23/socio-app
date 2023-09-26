import isArabic from "../../utils/isArabic";
import { useState } from "react";

type Props = {
  text: string;
};

const CommentText: React.FC<Props> = ({ text }) => {
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
          ? "text-sm text-gray-800 text-right dark:text-textLighter"
          : "text-sm text-gray-800 text-left dark:text-textLighter"
      }
    >
      {textSliced ? text?.slice(0, max - 3) + "... " : text}

      {textSliced && (
        <span
          className="description-sm description-gray-500 font-semibold cursor-pointer transition duration-500 hover:description-sky-500 dark:text-textLighter"
          onClick={seeMore}
        >
          See more
        </span>
      )}
    </p>
  );
};

export default CommentText;
