'use client';

import { Suspense, useEffect } from 'react';
import {
  DocumentData,
  QueryDocumentSnapshot,
  QuerySnapshot,
} from 'firebase/firestore';
import { InfiniteData, useInfiniteQuery } from '@tanstack/react-query';
import { useInView } from 'react-intersection-observer';
import _ from 'lodash';

import {
  getPostListFirst,
  getPostListNext,
} from '@/app/(afterLogin)/home/_lib/getPostList';
import PostCard from '@/app/(afterLogin)/_component/PostCard';
import { IPostData } from '@/app/types/post';
import Loading from '@/app/(afterLogin)/home/loading';

const PostList = () => {
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

  return (
    <div className="flex h-full w-full flex-col">
      <Suspense fallback={<Loading />}>
        {data?.pages.flatMap(page =>
          page.docs
            .map(doc => ({ postId: doc.id, post: doc.data() }))
            .map(post => (
              <PostCard
                key={post.postId}
                postId={post.postId}
                post={post.post as IPostData}
              />
            )),
        )}
      </Suspense>
      {hasNextPage && (
        <div ref={ref} className="flex h-16 items-center justify-center">
          <Loading />
        </div>
      )}
    </div>
  );
};

export default PostList;
