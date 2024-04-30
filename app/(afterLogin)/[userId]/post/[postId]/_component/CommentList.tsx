'use client';

import {
  DocumentData,
  QueryDocumentSnapshot,
  QuerySnapshot,
} from 'firebase/firestore';
import { useInView } from 'react-intersection-observer';
import { useEffect } from 'react';
import {
  InfiniteData,
  useInfiniteQuery,
  useQueryClient,
} from '@tanstack/react-query';
import _ from 'lodash';

import {
  getCommentListFirst,
  getCommentListNext,
} from '@/app/(afterLogin)/[userId]/post/[postId]/_lib/getCommentList';
import Loading from '@/app/loading';
import PostCard from '@/app/(afterLogin)/_component/PostCard';
import { IPostCommentProps, IPostData } from '@/app/types/post';

const CommentList = ({ userId, postId }: IPostCommentProps) => {
  const queryClient = useQueryClient();
  const post = queryClient.getQueriesData({
    queryKey: [userId, 'post', postId],
  });

  const { data, fetchNextPage, hasNextPage, isFetching } = useInfiniteQuery<
    QuerySnapshot<DocumentData, DocumentData>,
    Object,
    InfiniteData<QuerySnapshot<DocumentData, DocumentData>>,
    [_1: string, _2: string, _3: string],
    QueryDocumentSnapshot<DocumentData, DocumentData> | undefined
  >({
    queryKey: ['post', postId, 'comments'],
    queryFn: ({ pageParam }) => {
      return pageParam
        ? getCommentListNext(postId, pageParam)
        : getCommentListFirst(postId);
    },
    initialPageParam: undefined,
    getNextPageParam: querySnapshots => {
      if (querySnapshots.size < 20) return undefined;
      else return querySnapshots.docs[querySnapshots.docs.length - 1];
    },
    staleTime: 60 * 1000,
    gcTime: 300 * 1000,
  });

  const { ref, inView } = useInView({
    threshold: 0.5,
  });

  const throttledFetchNextPage = _.throttle(fetchNextPage, 500);

  useEffect(() => {
    if (inView && !isFetching && hasNextPage) {
      throttledFetchNextPage();
    }
  }, [hasNextPage, inView, isFetching, throttledFetchNextPage]);

  const comments = data?.pages
    .flatMap(page => page.docs)
    .map(doc => ({ commentId: doc.id, comment: doc.data() }));

  if (post) {
    return (
      <div className="flex h-full w-full flex-col">
        {comments?.map(comment => (
          <PostCard
            key={comment.commentId}
            postId={comment.commentId}
            post={comment.comment as IPostData}
            parentPostUserId={userId}
          />
        ))}
        {hasNextPage && (
          <div ref={ref} className="flex h-16 items-center justify-center">
            <Loading />
          </div>
        )}
      </div>
    );
  }
};

export default CommentList;
