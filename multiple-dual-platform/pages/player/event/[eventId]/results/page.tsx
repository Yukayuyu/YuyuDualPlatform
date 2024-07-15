"use client";

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import styles from './Results.module.css'; // CSSモジュールをインポート
import { Button } from '@/components/Button';
import { getEventById } from '@/server/lib/service/eventService';

const PlayerResults = () => {
  const router = useRouter();
  const pathname = usePathname();
  const pathSegments = pathname.split('/');
  const eventId = pathSegments[pathSegments.indexOf('event') + 1];
  const [players, setPlayers] = useState<any[]>([]);

  useEffect(() => {
    fetchEvent();
  }, [eventId]);

  const fetchEvent = async () => {
    const eventData = await getEventById(eventId!);
    if (eventData) {
      const sortedPlayers = eventData.players.sort((a: any, b: any) => b.points - a.points);
      setPlayers(sortedPlayers);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Event Results</h1>
      <ul className={styles.list}>
        {players.map((player, index) => (
          <li key={player.id} className={styles.listItem}>
            <span className={styles.rank}>{index + 1}</span>
            <span className={styles.name}>{player.player_name}</span>
            <span className={styles.points}>{player.points} points</span>
          </li>
        ))}
      </ul>
      <Button back>Back</Button>
    </div>
  );
};

export default PlayerResults;
