'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import onAuth from '@/app/_lib/onAuth';
import Loading from '@/app/loading';

export default function RedirectToLogin() {
  const { user, loading } = onAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.replace('/login');
    }
  }, [user, loading]);

  if (loading) {
    return (
      <div className="fixed z-50 h-full w-full bg-white">
        <Loading />
      </div>
    );
  }

  return null;
}
