import { useState } from 'react';
import Modal from '../../ui/Modal';

type Props = {
  src: string;
  alt: string;
}

const PostImage: React.FC<Props> = ({ src, alt }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <img className='w-full h-96 mt-3 mb-4 bg-contain cursor-pointer' src={src} alt={alt} onClick={() => setOpen(true)} />
      {
        open &&
        <Modal className='noBg' isOpen={true} onClose={() => setOpen(false)}>
          <img className='w-full mt-3 mb-4 bg-contain cursor-pointer' src={src} alt={alt} />
        </Modal>
      }
    </>
  );
};

export default PostImage;