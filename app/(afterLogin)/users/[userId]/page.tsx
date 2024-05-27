import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from '@tanstack/react-query';

import { IUserId } from '@/app/_types/user';
import UserProfile from '@/app/(afterLogin)/users/[userId]/_components/UserProfile';
import { getUser } from '@/app/(afterLogin)/users/[userId]/_services/getUser';

interface UserPageProps {
  params: IUserId;
}

const UserPage = async ({ params }: UserPageProps) => {
  const { userId } = params;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['users', userId],
    queryFn: () => getUser({ userId }),
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
