'use client';

import { usePathname } from 'next/navigation';
import BackButton from '@/app/(afterLogin)/_component/BackButton';

const Header = () => {
  const pathname = usePathname();

  const hiddenBackButtonRoutes = ['/search', '/home', '/messages'];
  const hiddenBackButton = hiddenBackButtonRoutes.includes(pathname);

  return (
    <header className="fixed z-10 flex h-16 w-full max-w-screen-sm items-center bg-background px-4">
      {!hiddenBackButton && <BackButton />}
    </header>
  );
};

export default Header;
