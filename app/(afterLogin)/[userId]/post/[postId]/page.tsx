import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from '@tanstack/react-query';

import { getPostServer } from '@/app/(afterLogin)/[userId]/post/[postId]/_lib/getPostServer';
import SinglePost from '@/app/(afterLogin)/[userId]/post/[postId]/_component/SinglePost';

interface PostPageProps {
  params: { userId: string; postId: string };
}

const PostPage = async ({ params }: PostPageProps) => {
  const { userId, postId } = params;
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: [userId, 'post', postId],
    queryFn: getPostServer,
  });
  const dehydratedState = dehydrate(queryClient);

  return (
    <div className="flex h-full w-full flex-col">
      <div className="flex-grow p-4">
        <HydrationBoundary state={dehydratedState}>
          <SinglePost userId={userId} postId={postId} />
        </HydrationBoundary>
        <div>
          {userId}의 {postId}게시물 페이지입니다.
        </div>
      </div>
    </div>
  );
};

export default PostPage;
