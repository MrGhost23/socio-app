import { useState } from 'react'

type Props = {
  text: string;
}

const PostText: React.FC<Props> = ({ text }) => {
  const max = 300;
  const [textSliced, setTextSliced] = useState(text.length > max)

  const seeMore = () => {
    setTextSliced(false);
  }

  return (
    <p>
      {
        textSliced ?
          text.slice(0, max - 3) + '... '
        :
          text
      }

      {
        textSliced &&
        <span className='text-sm text-gray-500 font-semibold cursor-pointer transition duration-500 hover:text-sky-500' onClick={seeMore}>See more</span>
      }
    </p>
  );
};

export default PostText;