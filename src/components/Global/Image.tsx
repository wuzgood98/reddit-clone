import Image from 'next/image';
import React, { useEffect, useState } from 'react';

type UseImageProps = {
  imageURL: string
  alt?: string
  className: string
  onLoad?: () => void
};

const UseImage: React.FC<UseImageProps> = ({ imageURL, alt, className, onLoad }) => {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const img = document.createElement("img");
    img.src = imageURL as typeof img.src;
    img.onload = () => {
      setDimensions({ width: img.width, height: img.height });
      onLoad?.()
    };
  }, [imageURL, onLoad]);

  return (
    <Image
      src={imageURL}
      alt={`${alt || ''}`}
      height={dimensions.height}
      width={dimensions.width}
      className={className}
      priority
    />
  )
}
export default UseImage;