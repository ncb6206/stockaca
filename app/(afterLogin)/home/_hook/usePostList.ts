import { useInfiniteQuery, InfiniteData } from '@tanstack/react-query';
import {
  QuerySnapshot,
  DocumentData,
  QueryDocumentSnapshot,
} from 'firebase/firestore';
import _ from 'lodash';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

import {
  getPostListNext,
  getPostListFirst,
} from '@/app/(afterLogin)/home/_lib/getPostList';

const usePostList = () => {
  const { data, fetchNextPage, hasNextPage, isFetching } = useInfiniteQuery<
    QuerySnapshot<DocumentData, DocumentData>,
    Object,
    InfiniteData<QuerySnapshot<DocumentData, DocumentData>>,
    [_1: string],
    QueryDocumentSnapshot<DocumentData, DocumentData> | undefined
  >({
    queryKey: ['posts'],
    queryFn: ({ pageParam }) => {
      return pageParam ? getPostListNext(pageParam) : getPostListFirst();
    },
    initialPageParam: undefined,
    getNextPageParam: querySnapshots => {
      if (querySnapshots.size < 10) return undefined;
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

  const posts = data?.pages
    .flatMap(page => page.docs)
    .map(doc => ({ postId: doc.id, post: doc.data() }));

  return { posts, hasNextPage, ref };
};

export default usePostList;
