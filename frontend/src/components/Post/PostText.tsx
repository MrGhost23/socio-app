import { useState } from "react";

type Props = {
  description: string;
};

const PostText: React.FC<Props> = ({ description }) => {
  const max = 300;
  const [textSliced, setTextSliced] = useState(description?.length > max);

  const seeMore = () => {
    setTextSliced(false);
  };

  return (
    <p>
      {textSliced ? description?.slice(0, max - 3) + "... " : description}

      {textSliced && (
        <span
          className="description-sm description-gray-500 font-semibold cursor-pointer transition duration-500 hover:description-sky-500"
          onClick={seeMore}
        >
          See more
        </span>
      )}
    </p>
  );
};

export default PostText;
