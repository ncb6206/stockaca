import { ReactNode } from 'react';

import RedirectToLogin from '@/app/(afterLogin)/_component/RedirectToLogin';
import NavigationBar from '@/app/(afterLogin)/_component/NavigationBar';
import RQProvider from '@/app/(afterLogin)/_component/RQProvider';

type Props = { children: ReactNode };

const AfterLoginLayout = ({ children }: Props) => {
  return (
    <RQProvider>
      <RedirectToLogin />
      <div className="relative flex h-dvh w-full max-w-screen-sm flex-col items-center justify-center bg-background ">
        {children}
      </div>
      <NavigationBar />
    </RQProvider>
  );
};

export default AfterLoginLayout;
