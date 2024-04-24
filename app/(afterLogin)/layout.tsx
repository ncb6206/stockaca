import { ReactNode } from 'react';

import RedirectToLogin from '@/app/(afterLogin)/_component/RedirectToLogin';
import NavigationBar from '@/app/(afterLogin)/_component/NavigationBar';
import RQProvider from '@/app/(afterLogin)/_component/RQProvider';
import Header from '@/app/(afterLogin)/_component/Header';

type Props = { children: ReactNode };

const AfterLoginLayout = ({ children }: Props) => {
  return (
    <RQProvider>
      <Header />
      <RedirectToLogin />
      <div className="relative mb-16 mt-16 flex h-full w-full max-w-screen-sm flex-col items-center justify-center bg-background">
        {children}
      </div>
      <NavigationBar />
    </RQProvider>
  );
};

export default AfterLoginLayout;
