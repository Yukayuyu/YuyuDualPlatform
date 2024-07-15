"use client";

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import styles from './Login.module.css'; // CSSモジュールをインポート
import { Input } from '@/components/Input';
import { Button } from '@/components/Button';
import toast from 'react-hot-toast';
import { getEventById } from '@/server/lib/service/eventService';

const PlayerLogin = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const eventId = searchParams.get('eventid') || '';
  const [eventName, setEventName] = useState<string>('');
  const [playerName, setPlayerName] = useState<string>('');
  const [registrationNumber, setRegistrationNumber] = useState<string>('');

  useEffect(() => {
    if (eventId) {
      fetchEventName(eventId);
    }
  }, [eventId]);

  const fetchEventName = async (eventId: string) => {
    const eventData = await getEventById(eventId);
    if (eventData) {
      setEventName((eventData as any).event_name);
    } else {
      toast.error('Event not found');
    }
  };

  const handleLogin = async () => {
    if (!playerName || !registrationNumber) {
      toast.error('Please fill in all fields');
      return;
    }

    const eventData = await getEventById(eventId);
    if (!eventData) {
      toast.error('Event not found');
      return;
    }

    const player = (eventData as any).players.find(
      (p: any) => p.player_name === playerName && p._no.toString() === registrationNumber
    );

    if (player) {
      // プレイヤーの情報をセッションストレージに保存
      sessionStorage.setItem('player', JSON.stringify(player));
      sessionStorage.setItem('eventId', eventId);
      router.push(`/player/event/${eventId}`);
    } else {
      toast.error('Invalid player name or registration number');
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Player Login</h1>
      <p><strong>Event:</strong> {eventName}</p>
      <Input
        type="text"
        value={playerName}
        onChange={(e) => setPlayerName(e.target.value)}
        placeholder="Player Name"
        required
      />
      <Input
        type="text"
        value={registrationNumber}
        onChange={(e) => setRegistrationNumber(e.target.value)}
        placeholder="Registration Number"
        required
      />
      <Button onClick={handleLogin}>Login</Button>
    </div>
  );
};

export default PlayerLogin;
