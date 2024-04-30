import {
  DocumentData,
  QueryDocumentSnapshot,
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
  where,
} from 'firebase/firestore';

import { db } from '@/app/firebase';

export const getCommentListFirst = async (postId: string) => {
  console.log('first comment 실행');
  const first = query(
    collection(db, 'Feed'),
    where('parentFeedId', '==', postId),
    orderBy('createdAt', 'desc'),
    limit(20),
  );

  const postSnap = await getDocs(first);

  return postSnap;
};

export const getCommentListNext = async (
  postId: string,
  pageParam: QueryDocumentSnapshot<DocumentData, DocumentData>,
) => {
  console.log('next comment 실행');
  const next = query(
    collection(db, 'Feed'),
    where('parentFeedId', '==', postId),
    orderBy('createdAt', 'desc'),
    startAfter(pageParam),
    limit(20),
  );

  const nextSnap = await getDocs(next);

  return nextSnap;
};
