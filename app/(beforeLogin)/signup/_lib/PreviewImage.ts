'use client';

import { useEffect, useState } from 'react';

interface PreviewImageProps {
  watchImage: FileList;
}

export const PreviewImage = ({ watchImage }: PreviewImageProps) => {
  const [previewImage, setPreviewImage] = useState<string | ArrayBuffer | null>(
    null,
  );

  useEffect(() => {
    if (watchImage && watchImage.length > 0) {
      const file = watchImage[0];
      const reader = new FileReader();

      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };

      reader.readAsDataURL(file);
    } else {
      setPreviewImage(null);
    }
  }, [watchImage]);

  return previewImage;
};
