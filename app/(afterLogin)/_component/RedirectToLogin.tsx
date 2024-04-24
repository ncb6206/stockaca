'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

import useOnAuth from '@/app/_lib/useOnAuth';

export default function RedirectToLogin() {
  const { user, loading } = useOnAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.replace('/login');
    }
  }, [user, loading, router]);

  return null;
}
