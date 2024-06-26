import { useEffect, useState } from 'react';
import { User } from 'firebase/auth';

import { auth } from '@/app/firebase';

export default function useOnAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(authUser => {
      setUser(authUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return { user, loading };
}
