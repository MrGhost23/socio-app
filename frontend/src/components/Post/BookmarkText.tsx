import {Link} from 'react-router-dom';

type Props = {
  text: string;
  id: string
}

const BookmarkText: React.FC<Props> = ({ text, id }) => {
  return (
    <Link to={`/post/${id}`}>
      <p className="text-xl text-gray-500 font-medium">
        {
          text.length > 120 ?
            text.slice(0, 117) + '...'
          :
            text
        }
      </p>
    </Link>
  );
};

export default BookmarkText;