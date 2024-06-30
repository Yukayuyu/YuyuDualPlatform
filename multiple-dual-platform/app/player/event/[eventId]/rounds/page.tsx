"use client";

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import styles from './Rounds.module.css'; // CSSモジュールをインポート
import { Button } from '@/components/Button';
import { getRoundsByEventId } from '@/server/lib/service/eventService';

const PlayerRounds = () => {
  const router = useRouter();
  const pathname = usePathname();
  const pathSegments = pathname.split('/');
  const eventId = pathSegments[pathSegments.indexOf('event') + 1];
  const [rounds, setRounds] = useState<any[]>([]);
  const [player, setPlayer] = useState<any>(null);

  useEffect(() => {
    const storedPlayer = sessionStorage.getItem('player');
    const storedEventId = sessionStorage.getItem('eventId');
    if (storedPlayer && storedEventId === eventId) {
      setPlayer(JSON.parse(storedPlayer));
      fetchRounds();
    } else {
      router.push(`/player/login?eventid=${eventId}`);
    }
  }, [eventId]);

  const fetchRounds = async () => {
    const fetchedRounds = await getRoundsByEventId(eventId!);
    setRounds(fetchedRounds);
  };

  if (!rounds.length) return <div>Loading...</div>;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Rounds</h1>
      <ul className={styles.list}>
        {rounds.map((round) => (
          <li key={round.id}>
            <a className={styles.link} href={`/player/event/${eventId}/rounds/${round.id}`}>{round.name}</a>
          </li>
        ))}
      </ul>
      <Button back>Back</Button>
    </div>
  );
};

export default PlayerRounds;
