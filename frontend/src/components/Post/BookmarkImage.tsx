import { Link } from "react-router-dom";

type Props = {
  src: string;
  alt: string;
  id: string;
};

const BookmarkImage: React.FC<Props> = ({ src, alt, id }) => {
  return (
    <Link to={`/post/${id}`} className="w-36 h-36 min-w-[9rem] min-h[9rem]">
      <img className="w-full h-full rounded-xl" src={src} alt={alt} />
    </Link>
  );
};

export default BookmarkImage;
