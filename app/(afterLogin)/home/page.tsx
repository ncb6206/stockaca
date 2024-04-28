import { Metadata } from 'next';

import PostList from '@/app/(afterLogin)/home/_component/PostList';

export const metadata: Metadata = {
  title: '홈 / Stockaca',
  description: '홈',
};

const HomePage = async () => {
  return (
    <>
      <PostList />
    </>
  );
};

export default HomePage;
