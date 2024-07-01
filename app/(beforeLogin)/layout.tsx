import React, { ReactNode } from 'react';

import RedirectUser from '@/app/_components/utils/RedirectUser';

type Props = { children: ReactNode };

const BeforeLoginLayout = ({ children }: Props) => {
  return (
    <>
      <RedirectUser />
      <div className="relative flex h-dvh w-full max-w-screen-sm flex-row justify-center bg-background">{children}</div>
    </>
  );
};

export default BeforeLoginLayout;
