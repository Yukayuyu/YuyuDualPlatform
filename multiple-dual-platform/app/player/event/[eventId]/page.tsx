"use client";

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { getEventById } from '@/server/lib/service/eventService'; // サービスをインポート
import styles from './EventDetail.module.css'; // CSSモジュールをインポート
import { Button } from '@/components/Button';

const PlayerEventDetail = () => {
  const router = useRouter();
  const pathname = usePathname();
  const pathSegments = pathname.split('/');
  const eventId = pathSegments[pathSegments.indexOf('event') + 1];
  const [event, setEvent] = useState<any>(null);
  const [player, setPlayer] = useState<any>(null);

  useEffect(() => {
    const storedPlayer = sessionStorage.getItem('player');
    const storedEventId = sessionStorage.getItem('eventId');
    if (storedPlayer && storedEventId === eventId) {
      setPlayer(JSON.parse(storedPlayer));
      fetchEvent();
    } else {
      router.push(`/player/login?eventid=${eventId}`);
    }
  }, [eventId]);

  const fetchEvent = async () => {
    const eventData = await getEventById(eventId!);
    if (eventData) {
      setEvent(eventData);
    }
  };

  if (!event || !player) return <div>Loading...</div>;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Event Details</h1>
      <p><strong>Event Name:</strong> {event.event_name}</p>
      <p><strong>Date:</strong> {new Date(event.date).toLocaleDateString()}</p>
      <p><strong>Player:</strong> {player.player_name}</p>
      <p><strong>Registration Number:</strong> {player._no}</p>
      <Button onClick={() => router.push(`/player/event/${eventId}/rounds`)}>View Rounds</Button>
      <Button onClick={() => router.push(`/player/event/${eventId}/results`)}>View Results</Button>
      <Button onClick={() => router.push(`/player/login?eventid=${eventId}`)}>Logout</Button>
    </div>
  );
};

export default PlayerEventDetail;
