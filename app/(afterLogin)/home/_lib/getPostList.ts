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

export const getPostListFirst = async () => {
  console.log('first 실행');
  const first = query(
    collection(db, 'Feed'),
    where('parentFeedId', '==', ''),
    orderBy('createdAt', 'desc'),
    limit(10),
  );

  const postSnap = await getDocs(first);

  return postSnap;
};

export const getPostListNext = async (
  pageParam: QueryDocumentSnapshot<DocumentData, DocumentData>,
) => {
  console.log('next 실행');
  const next = query(
    collection(db, 'Feed'),
    where('parentFeedId', '==', ''),
    orderBy('createdAt', 'desc'),
    startAfter(pageParam),
    limit(10),
  );

  const nextSnap = await getDocs(next);

  return nextSnap;
};
