"use client";

import { useState } from 'react';
import { sendPasswordResetEmail } from 'firebase/auth';
import toast from 'react-hot-toast';
import styles from './ResetPassword.module.css'; // CSSモジュールをインポート
import { auth } from '@/server/auth/firebase';
import { Input } from '@/components/input';
import { Button } from '@/components/button';

const ResetPassword = () => {
  const [email, setEmail] = useState('');

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await sendPasswordResetEmail(auth, email);
      toast.success('Password reset email sent');
    } catch (error: any) {
      toast.error(error?.message);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Reset Password</h1>
      <form onSubmit={handleResetPassword} className={styles.form}>
        <Input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
          className={styles.input}
        />
        <Button type="submit" className={styles.button}>Send Reset Email</Button>
      </form>
    </div>
  );
};

export default ResetPassword;
