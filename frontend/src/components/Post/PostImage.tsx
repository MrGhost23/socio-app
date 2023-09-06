type Props = {
  src: string;
  alt: string;
}

const PostImage: React.FC<Props> = ({ src, alt }) => {
  return (
    <img className='w-full h-96 mt-3 mb-4 bg-contain cursor-pointer' src={src} alt={alt} />
  );
};

export default PostImage;