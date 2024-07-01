import { Metadata } from 'next';

import Tab from '@/app/_components/common/Tab';
import TabDecider from '@/app/_components/common/TabDecider';

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
