import React, { ReactNode } from 'react';

import RedirectToHome from '@/app/(beforeLogin)/_component/RedirectToHome';

type Props = { children: ReactNode };

const BeforeLoginLayout = ({ children }: Props) => {
  return (
    <>
      <RedirectToHome />
      <div className="relative flex h-dvh w-full max-w-screen-sm flex-row justify-center bg-background">
        {children}
      </div>
    </>
  );
};

export default BeforeLoginLayout;
