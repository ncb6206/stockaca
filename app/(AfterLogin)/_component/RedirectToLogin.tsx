'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import onAuth from '@/app/_lib/onAuth';

export default function RedirectToLogin() {
  const { user, loading } = onAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.replace('/login');
    }
  }, [user, loading]);

  return null;
}
