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
import { IPostData, IPostId } from '@/app/_types/post';

const useGetCommentList = ({ postId }: IPostId) => {
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

  const comments = data?.pages
    .flatMap(page => page.docs)
    .map(doc => ({ postId: doc.id, post: doc.data() as IPostData }));

  return { comments, hasNextPage, fetchNextPage, isFetching };
};

export default useGetCommentList;
