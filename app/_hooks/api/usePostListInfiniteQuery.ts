import { InfiniteData, useInfiniteQuery } from '@tanstack/react-query';
import { QuerySnapshot, DocumentData, QueryDocumentSnapshot } from 'firebase/firestore';

import { getPostListNext, getPostListFirst } from '@/app/_api/post/getPostList';
import { IPostData } from '@/app/_types/post';

const usePostListInfiniteQuery = () => {
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
  });

  const posts = data?.pages.flatMap(page => page.docs).map(doc => ({ postId: doc.id, post: doc.data() as IPostData }));

  return { posts, hasNextPage, isFetching, fetchNextPage };
};

export default usePostListInfiniteQuery;
