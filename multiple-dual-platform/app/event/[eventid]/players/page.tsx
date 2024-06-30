"use client";

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import styles from './Players.module.css'; // CSSモジュールをインポート
import { getEventById } from '@/server/lib/service/eventService'; // サービスをインポート
import { Button } from '@/components/Button';
import { Player } from '@/server/lib/types/event';

const Players = () => {
  const router = useRouter();
  const pathname = usePathname();
  const eventId = pathname.split('/').pop();
  const [players, setPlayers] = useState<Player[]>([]);

  useEffect(() => {
    if (eventId) {
      fetchPlayers();
    }
  }, [eventId]);

  const fetchPlayers = async () => {
    const eventData = await getEventById(eventId!);
    if (eventData) {
      setPlayers((eventData as any).players || []);
    }
  };

  const viewPlayerDetails = (playerId: string) => {
    router.push(`/host/event/${eventId}/players/${playerId}`);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Players</h1>
      <ul className={styles.list}>
        {players.map(player => (
          <li key={player.id} className={styles.listItem}>
            <span>{player.player_name}</span>
            <Button variant="link" onClick={() => viewPlayerDetails(player.id)}>View Details</Button>
          </li>
        ))}
      </ul>
      <Button back>Back</Button>
    </div>
  );
};

export default Players;
