'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

import useOnAuth from '@/app/_hooks/common/useOnAuth';

export default function RedirectUser() {
  const { user, loading } = useOnAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (user) {
        router.replace('/home');
      } else {
        router.replace('/login');
      }
    }
  }, [user, loading, router]);

  return null;
}
