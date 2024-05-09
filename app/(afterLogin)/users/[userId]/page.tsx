import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from '@tanstack/react-query';

import UserProfile from '@/app/(afterLogin)/users/[userId]/_component/UserProfile';
import { getUserServer } from '@/app/(afterLogin)/users/[userId]/_lib/getUserServer';

interface UserPageProps {
  params: { userId: string };
}

const UserPage = async ({ params }: UserPageProps) => {
  const { userId } = params;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['users', userId],
    queryFn: () => getUserServer({ userId }),
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <div className="flex h-full w-full flex-col">
      <div className="flex-grow p-4">
        <HydrationBoundary state={dehydratedState}>
          <UserProfile userId={userId} />
        </HydrationBoundary>
      </div>
      <hr />
    </div>
  );
};

export default UserPage;
