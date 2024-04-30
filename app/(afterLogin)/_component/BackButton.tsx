'use client';

import { IoArrowBack } from 'react-icons/io5';
import { useRouter } from 'next/navigation';

const BackButton = () => {
  const router = useRouter();

  const goBack = () => {
    router.back();
  };

  return (
    <IoArrowBack className="h-8 w-8 hover:cursor-pointer" onClick={goBack} />
  );
};

export default BackButton;
