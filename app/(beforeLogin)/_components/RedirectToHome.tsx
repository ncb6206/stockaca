'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

import useOnAuth from '@/app/_hooks/useOnAuth';

export default function RedirectToHome() {
  const { user, loading } = useOnAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user) {
      router.replace('/home');
    }
  }, [user, loading, router]);

  return null;
}
