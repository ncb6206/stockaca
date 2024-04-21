import Link from 'next/link';
import { IconType } from 'react-icons/lib';

interface NavigationItemProps {
  icon: IconType;
  href: string;
}

const NavigationItem = ({ icon: Icon, href }: NavigationItemProps) => {
  return (
    <div className="relative h-full w-full">
      <Link href={`${href}`} className="m-auto p-0">
        <div className="m-1 flex h-5/6 w-[calc(100%-8px)] items-center justify-center hover:cursor-pointer hover:rounded-lg hover:bg-gray-100">
          <Icon size={30} color="#c5c0c0" />
        </div>
      </Link>
    </div>
  );
};

export default NavigationItem;
