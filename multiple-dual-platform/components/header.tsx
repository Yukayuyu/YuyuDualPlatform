'use client'

import { signOut, onAuthStateChanged } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { auth } from '@/server/auth/firebase';
import { Button } from '@/components/Button';
import { useEffect, useState } from 'react';

export function Header() {
  const router = useRouter();
  const [user, setUser] = useState(auth.currentUser);
  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push('/host');
    } catch (error) {
      console.error('Failed to logout', error);
    }
  };

  return (
    <header className="sticky top-0 z-50 flex items-center justify-between w-full h-16 px-4 border-b shrink-0 bg-gradient-to-b from-background/10 via-background/50 to-background/80 backdrop-blur-xl">
      <div className="flex items-center">
        {}
      </div>
      <div>
        {user && <Button variant="outline" onClick={handleLogout}>
          Logout
        </Button>}
      </div>
    </header>
  );
}
