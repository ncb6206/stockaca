'use client';

import { useEffect, useState } from 'react';
import { auth } from '@/app/firebase';
import { User } from 'firebase/auth';

export default function onAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(authUser => {
      setUser(authUser);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  return { user, loading };
}
