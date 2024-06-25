"use client";

import { useState, FormEvent, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { auth, db } from '@/server/auth/firebase';
import { collection, addDoc, query, where, getDocs } from 'firebase/firestore';
import toast from 'react-hot-toast';
import Link from 'next/link';

import styles from './Dashboard.module.css'; // CSSモジュールをインポート
import { Input } from '@/components/input';
import { Button } from '@/components/button';
import { Sts_Event_Status } from '@/server/status/event_status';

const Dashboard = () => {
  const [eventName, setEventName] = useState<string>('');
  const [eventDate, setEventDate] = useState<string>('');
  const [events, setEvents] = useState<any[]>([]); // イベントリスト用のステート
  const router = useRouter();
  const user = auth.currentUser;

  useEffect(() => {
    if (!user) {
      router.push('/host/login'); // 未認証の場合はログインページにリダイレクト
    } else {
      fetchEvents(); // ユーザーが認証された後にイベントを取得
    }
  }, [user, router]);

  // イベントをFirestoreから取得する関数
  const fetchEvents = async () => {
    if (user) {
      const q = query(collection(db, 'events'), where('hostId', '==', user.uid));
      const querySnapshot = await getDocs(q);
      const fetchedEvents: any[] = [];
      querySnapshot.forEach((doc) => {
        fetchedEvents.push({ id: doc.id, ...doc.data() });
      });
      setEvents(fetchedEvents);
    }
  };

  // 新しいイベントを作成する関数
  const createEvent = async (e: FormEvent) => {
    e.preventDefault();
    if (user) {
      try {
        await addDoc(collection(db, 'events'), {
          name: eventName,
          date: new Date(eventDate),
          hostId: user.uid,
          participants: [],
          status: Sts_Event_Status.NOT_STARTED,
        });
        setEventName('');
        setEventDate('');
        toast.success('Event created successfully');
        fetchEvents(); // 新しいイベント作成後にイベントを再取得
      } catch (e) {
        console.error('Error adding document: ', e);
        toast.error('Failed to create event');
      }
    }
  };

  if (!user) return null;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Host Dashboard</h1>
      <form onSubmit={createEvent} className={styles.form}>
        <Input
          type="text"
          value={eventName}
          onChange={(e) => setEventName(e.target.value)}
          placeholder="Event Name"
          required
        />
        <Input
          type="date"
          value={eventDate}
          onChange={(e) => setEventDate(e.target.value)}
          placeholder="Event Date"
          required
        />
        <Button type="submit">Create Event</Button>
      </form>
      <h2 className={styles.subtitle}>Your Events</h2>
      <ul className={styles.list}>
        {events.map(event => (
          <li key={event.id} className={styles.listItem}>
            <Link href={`/host/event/${event.id}`}>
              {event.name} - {new Date(event.date.seconds * 1000).toLocaleDateString()}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
