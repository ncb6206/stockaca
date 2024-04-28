'use client';

import { usePathname, useRouter } from 'next/navigation';
import { IoArrowBack } from 'react-icons/io5';

const Header = () => {
  const router = useRouter();
  const pathname = usePathname();

  const showBackButtonRoutes = ['/post', '/home/'];
  const shouldShowBackButton = showBackButtonRoutes.some(path =>
    pathname.startsWith(path),
  );

  const goBack = () => {
    router.back();
  };

  return (
    <header className="fixed z-10 flex h-16 w-full max-w-screen-sm items-center bg-background px-4">
      {shouldShowBackButton && (
        <IoArrowBack
          className="h-8 w-8 hover:cursor-pointer"
          onClick={goBack}
        />
      )}
    </header>
  );
};

export default Header;
