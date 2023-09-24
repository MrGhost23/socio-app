import { Link } from "react-router-dom";
import isArabic from "../../utils/isArabic";

type Props = {
  text: string;
  id: string;
};

const BookmarkText: React.FC<Props> = ({ text, id }) => {
  const textIsInArabic = isArabic(text);

  return (
    <Link to={`/post/${id}`}>
      <p
        className={
          textIsInArabic
            ? "text-lg md:text-xl text-gray-500 font-medium text-right"
            : "text-lg md:text-xl text-gray-500 font-medium text-left"
        }
      >
        {text.length > 120 ? text.slice(0, 117) + "..." : text}
      </p>
    </Link>
  );
};

export default BookmarkText;
