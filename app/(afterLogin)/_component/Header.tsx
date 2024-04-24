'use client';

import { useRouter } from 'next/navigation';
import { IoArrowBack } from 'react-icons/io5';

const Header = () => {
  const router = useRouter();

  const goBack = () => {
    router.back();
  };

  return (
    <header className="fixed left-0 top-0 z-10 flex h-16 w-full items-center bg-background px-4">
      <IoArrowBack className="h-8 w-8 hover:cursor-pointer" onClick={goBack} />
    </header>
  );
};

export default Header;
