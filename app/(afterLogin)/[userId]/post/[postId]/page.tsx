import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from '@tanstack/react-query';

import { IPostParams } from '@/app/_types/post';
import SinglePost from '@/app/(afterLogin)/[userId]/post/[postId]/_components/SinglePost';
import CommentList from '@/app/(afterLogin)/[userId]/post/[postId]/_components/CommentList';
import WriteComment from '@/app/(afterLogin)/[userId]/post/[postId]/_components/WriteComment';
import { getPost } from '@/app/(afterLogin)/[userId]/post/[postId]/_services/getPost';

interface PostPageProps {
  params: IPostParams;
}

const PostPage = async ({ params }: PostPageProps) => {
  const { userId, postId } = params;
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['post', postId],
    queryFn: () => getPost({ postId }),
  });
  const dehydratedState = dehydrate(queryClient);

  return (
    <div className="flex h-full w-full flex-col">
      <div className="flex flex-grow flex-col p-4">
        <HydrationBoundary state={dehydratedState}>
          <SinglePost postId={postId} />
        </HydrationBoundary>
        <WriteComment postId={postId} />
        <CommentList userId={userId} postId={postId} />
      </div>
    </div>
  );
};

export default PostPage;
