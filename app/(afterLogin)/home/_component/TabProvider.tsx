'use client';

import { ReactNode, createContext, useState } from 'react';

export const TabContext = createContext({
  tab: 'main',
  setTab: (value: 'main' | 'fol') => {},
});

type Props = { children: ReactNode };

const TabProvider = ({ children }: Props) => {
  const [tab, setTab] = useState('main');

  return (
    <TabContext.Provider value={{ tab, setTab }}>
      {children}
    </TabContext.Provider>
  );
};

export default TabProvider;
