'use client';

import Link from 'next/link';

import { NavigationItemType } from '@/app/types/navigation';
import { usePostStore } from '@/app/store/usePost';

const NavigationItem = ({ icon: Icon, href, pathname }: NavigationItemType) => {
  const { reset } = usePostStore();

  const onReset = () => {
    if (href === '/post') reset();
  };

  return (
    <div className="relative h-full w-full">
      <Link
        href={`${href}`}
        className="m-auto p-0"
        aria-label={href}
        onClick={onReset}
      >
        <div className="m-1 flex h-5/6 w-[calc(100%-8px)] items-center justify-center hover:cursor-pointer hover:rounded-lg hover:bg-gray-100">
          <Icon size={30} color={pathname === href ? '#000000' : '#c5c0c0'} />
        </div>
      </Link>
    </div>
  );
};

export default NavigationItem;
