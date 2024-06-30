"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signInWithEmailAndPassword } from 'firebase/auth';

import toast from 'react-hot-toast';
import styles from './Login.module.css'; // CSSモジュールをインポート
import { auth } from '@/server/auth/firebase';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';

const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success('Login successful');
      router.push('/host/dashboard');
    } catch (error: any) {
      toast.error(error?.message);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Login</h1>
      <form onSubmit={handleLogin} className={styles.form}>
        <Input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
          className={styles.input}
        />
        <Input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
          className={styles.input}
        />
        <Button type="submit" className={styles.button}>Login</Button>
      </form>
      <div className={styles.links}>
        <a href="/host/register" className={styles.link}>Register</a>
        <a href="/host/reset-password" className={styles.link}>Forgot Password?</a>
      </div>
    </div>
  );
};

export default Login;
