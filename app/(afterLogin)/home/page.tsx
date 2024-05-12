import { Metadata } from 'next';

import Tab from '@/app/(afterLogin)/home/_components/Tab';
import TabDecider from '@/app/(afterLogin)/home/_components/TabDecider';

export const metadata: Metadata = {
  title: '홈 / Stockaca',
  description: '홈',
};

const HomePage = async () => {
  return (
    <>
      <Tab />
      <TabDecider />
    </>
  );
};

export default HomePage;
