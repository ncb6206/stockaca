'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

import onAuth from '@/app/_lib/onAuth';
import Loading from '@/app/loading';

export default function RedirectToHome() {
  const { user, loading } = onAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user) {
      router.replace('/home');
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
