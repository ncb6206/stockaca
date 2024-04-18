import { ReactNode } from 'react';

type Props = { children: ReactNode; modal: ReactNode };

const Layout = ({ children }: Props) => {
  return (
    <div className="flex h-dvh w-full flex-row justify-center bg-background">
      {children}
    </div>
  );
};

export default Layout;
