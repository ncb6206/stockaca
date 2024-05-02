import { Metadata } from 'next';

import TabProvider from '@/app/(afterLogin)/home/_component/TabProvider';
import Tab from '@/app/(afterLogin)/home/_component/Tab';
import TabDecider from '@/app/(afterLogin)/home/_component/TabDecider';

export const metadata: Metadata = {
  title: '홈 / Stockaca',
  description: '홈',
};

const HomePage = async () => {
  return (
    <TabProvider>
      <Tab />
      <TabDecider />
    </TabProvider>
  );
};

export default HomePage;
