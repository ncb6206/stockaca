import { ReactNode } from 'react';

import NavigationBar from '@/app/_components/layout/NavigationBar';
import RQProvider from '@/app/_components/common/RQProvider';
import Header from '@/app/_components/layout/Header';
import RedirectUser from '@/app/_components/utils/RedirectUser';

type Props = { children: ReactNode };

const AfterLoginLayout = ({ children }: Props) => {
  return (
    <RQProvider>
      <Header />
      <RedirectUser />
      <div className="relative my-16 flex h-full w-full max-w-screen-sm flex-col items-center justify-center bg-background">
        {children}
      </div>
      <NavigationBar />
    </RQProvider>
  );
};

export default AfterLoginLayout;
