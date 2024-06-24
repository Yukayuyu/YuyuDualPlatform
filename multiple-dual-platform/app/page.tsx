"use client"

import { useEffect } from 'react';

import { redirect } from 'next/navigation';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import type { AppProps } from 'next/app';

const MyApp = ({ Component, pageProps }: AppProps) => {

  // const auth = getAuth();

  // useEffect(() => {
  //   const unsubscribe = onAuthStateChanged(auth, (user) => {
  //     if (!user) {
  //       redirect('/login');
  //     }
  //   });

  //   return () => unsubscribe();
  // }, [auth]);

  return <Component {...pageProps} />;
};

export default MyApp;