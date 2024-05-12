import { ReactNode } from 'react';
import dynamic from 'next/dynamic';

import RedirectToLogin from '@/app/(afterLogin)/_components/RedirectToLogin';
import NavigationBar from '@/app/(afterLogin)/_components/NavigationBar';
import RQProvider from '@/app/(afterLogin)/_components/RQProvider';
import Header from '@/app/(afterLogin)/_components/Header';

type Props = { children: ReactNode };

const FollowModal = dynamic(
  () => import('@/app/(afterLogin)/users/[userId]/_components/FollowModal'),
  { ssr: false },
);

const AfterLoginLayout = ({ children }: Props) => {
  return (
    <RQProvider>
      <Header />
      <RedirectToLogin />
      <div className="relative my-16 flex h-full w-full max-w-screen-sm flex-col items-center justify-center bg-background">
        {children}
      </div>
      <NavigationBar />
      <FollowModal />
    </RQProvider>
  );
};

export default AfterLoginLayout;
