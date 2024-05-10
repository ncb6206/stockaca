'use client';

import { usePathname } from 'next/navigation';
import { AiOutlineSearch } from 'react-icons/ai';
import { GoHome } from 'react-icons/go';
import { HiOutlinePencilAlt } from 'react-icons/hi';
import { FaRegComments, FaRegCircleUser } from 'react-icons/fa6';

import NavigationItem from '@/app/(afterLogin)/_components/NavigationItem';
import useOnAuth from '@/app/_hooks/useOnAuth';
import { NavigationDataType } from '@/app/_types/navigation';

const navigationItems: NavigationDataType[] = [
  { icon: GoHome, href: '/home' },
  { icon: AiOutlineSearch, href: '/search' },
  { icon: HiOutlinePencilAlt, href: '/post' },
  { icon: FaRegComments, href: '/messages' },
  { icon: FaRegCircleUser, href: '/users' },
];

const NavigationBar = () => {
  const { user } = useOnAuth();
  const pathname = usePathname();

  if (pathname === '/post') {
    return null;
  }

  return (
    <nav className="fixed bottom-0 z-10 m-auto grid h-16 w-full max-w-screen-sm grid-cols-5 grid-rows-1 items-center bg-white/85 backdrop-blur-2xl ">
      {navigationItems.map(({ icon: Icon, href }, index) => (
        <NavigationItem
          key={index}
          icon={Icon}
          href={href === '/users' ? `/users/${user?.displayName}` : href}
          pathname={pathname}
        />
      ))}
    </nav>
  );
};

export default NavigationBar;
