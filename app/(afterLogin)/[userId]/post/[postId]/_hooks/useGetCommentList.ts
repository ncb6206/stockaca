import { useCallback, useEffect } from 'react';
import _ from 'lodash';
import { useInView } from 'react-intersection-observer';
import { useInfiniteQuery, InfiniteData } from '@tanstack/react-query';
import {
  QuerySnapshot,
  DocumentData,
  QueryDocumentSnapshot,
} from 'firebase/firestore';

import {
  getCommentListNext,
  getCommentListFirst,
} from '@/app/(afterLogin)/[userId]/post/[postId]/_services/getCommentList';
import { IPostId } from '@/app/_types/post';
import useGetSinglePost from '@/app/(afterLogin)/[userId]/post/[postId]/_hooks/useGetSinglePost';

const useGetCommentList = ({ postId }: IPostId) => {
  const { data: post } = useGetSinglePost({ postId });

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
  });

  const { ref, inView } = useInView({
    threshold: 0.5,
  });

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const throttledFetchNextPage = useCallback(_.throttle(fetchNextPage, 500), [
    fetchNextPage,
  ]);

  useEffect(() => {
    if (inView && !isFetching && hasNextPage) {
      throttledFetchNextPage();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView]);

  const comments = data?.pages
    .flatMap(page => page.docs)
    .map(doc => ({ commentId: doc.id, comment: doc.data() }));

  return { post, comments, hasNextPage, ref };
};

export default useGetCommentList;
