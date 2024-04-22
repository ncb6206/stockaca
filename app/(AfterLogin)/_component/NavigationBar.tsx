'use client';

import { usePathname } from 'next/navigation';
import { AiOutlineSearch } from 'react-icons/ai';
import { GoHome } from 'react-icons/go';
import { HiOutlinePencilAlt } from 'react-icons/hi';
import { FaRegComments } from 'react-icons/fa6';
import { FaRegCircleUser } from 'react-icons/fa6';

import NavigationItem from './NavigationItem';
import onAuth from '@/app/_lib/onAuth';
import { NavigationDataType } from '@/app/types/navigation';

const navigationItems: NavigationDataType[] = [
  { icon: GoHome, href: '/home' },
  { icon: AiOutlineSearch, href: '/search' },
  { icon: HiOutlinePencilAlt, href: '/post' },
  { icon: FaRegComments, href: '/messages' },
  { icon: FaRegCircleUser, href: '/users' },
];

const NavigationBar = () => {
  const { user } = onAuth();
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 z-[1] m-auto grid h-16 w-full max-w-screen-sm grid-cols-5 grid-rows-1 items-center backdrop-filter">
      {navigationItems.map(({ icon: Icon, href }, index) => (
        <NavigationItem
          key={index}
          icon={Icon}
          href={href === '/users' ? `/users/${user?.email}` : href}
          pathname={pathname}
        />
      ))}
    </nav>
  );
};

export default NavigationBar;
