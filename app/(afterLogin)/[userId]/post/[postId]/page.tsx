import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from '@tanstack/react-query';

import { getPostServer } from '@/app/(afterLogin)/[userId]/post/[postId]/_lib/getPostServer';
import SinglePost from '@/app/(afterLogin)/[userId]/post/[postId]/_component/SinglePost';
import CommentList from '@/app/(afterLogin)/[userId]/post/[postId]/_component/CommentList';
import WriteComment from '@/app/(afterLogin)/[userId]/post/[postId]/_component/WriteComment';

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
      <div className="flex flex-grow flex-col p-4">
        <HydrationBoundary state={dehydratedState}>
          <SinglePost userId={userId} postId={postId} />
        </HydrationBoundary>
        <WriteComment postId={postId} />
        <CommentList userId={userId} postId={postId} />
      </div>
    </div>
  );
};

export default PostPage;
