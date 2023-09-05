type Props = {
  src: string;
  alt: string;
}

const PostImage: React.FC<Props> = ({ src, alt }) => {
  return (
    <img className='mt-3 mb-4' src={src} alt={alt} />
  );
};

export default PostImage;