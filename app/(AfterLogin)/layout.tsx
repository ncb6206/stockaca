import { ReactNode } from 'react';

import RedirectToLogin from '@/app/(AfterLogin)/_component/RedirectToLogin';
import NavigationBar from '@/app/(AfterLogin)/_component/NavigationBar';

type Props = { children: ReactNode };

const AfterLoginLayout = ({ children }: Props) => {
  return (
    <>
      <RedirectToLogin />
      <div className="relative flex h-dvh w-full max-w-screen-sm flex-col justify-center bg-background ">
        {children}
      </div>
      <NavigationBar />
    </>
  );
};

export default AfterLoginLayout;
