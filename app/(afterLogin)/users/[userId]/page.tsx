import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from '@tanstack/react-query';

import LogoutButton from '@/app/(afterLogin)/users/[userId]/_component/LogoutButton';
import UserProfile from '@/app/(afterLogin)/users/[userId]/_component/UserProfile';
import { getUserServer } from '@/app/(afterLogin)/users/[userId]/_lib/getUserServer';

interface UserPageProps {
  params: { userId: string };
}

const UserPage = async ({ params }: UserPageProps) => {
  const userId = decodeURIComponent(params.userId);
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['users', userId],
    queryFn: getUserServer,
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <div className="flex h-full w-full flex-col">
      <div className="flex-grow p-4">
        <HydrationBoundary state={dehydratedState}>
          <UserProfile userId={userId} />
        </HydrationBoundary>
        <LogoutButton userId={userId} />
      </div>
    </div>
  );
};

export default UserPage;
