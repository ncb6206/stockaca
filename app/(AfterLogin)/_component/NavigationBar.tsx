'use client';

import { AiOutlineSearch } from 'react-icons/ai';
import { GoHome } from 'react-icons/go';
import { HiOutlinePencilAlt } from 'react-icons/hi';
import { FaRegComments } from 'react-icons/fa6';
import { FaRegCircleUser } from 'react-icons/fa6';

import NavigationItem from './NavigationItem';
import onAuth from '@/app/_lib/onAuth';

const NavigationBar = () => {
  const { user } = onAuth();

  return (
    <nav className="fixed bottom-0 z-[1] m-auto grid h-16 w-full max-w-screen-sm grid-cols-5 grid-rows-1 items-center backdrop-filter">
      <NavigationItem icon={GoHome} href={'/home'} />
      <NavigationItem icon={AiOutlineSearch} href={'/search'} />
      <NavigationItem icon={HiOutlinePencilAlt} href={'/post'} />
      <NavigationItem icon={FaRegComments} href={'/messages'} />
      <NavigationItem icon={FaRegCircleUser} href={`/users/${user?.email}`} />
    </nav>
  );
};

export default NavigationBar;
