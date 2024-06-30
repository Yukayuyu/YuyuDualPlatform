"use client";

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Player } from '@/server/lib/types/event';
import styles from './Players.module.css'; // CSSモジュールをインポート
import { Button } from '@/components/Button';
import { getEventById } from '@/server/lib/service/eventService';
import PlayerList from '@/components/PlayerList';

const Players = () => {
  const router = useRouter();
  const pathname = usePathname();
  const pathSegments = pathname.split('/');
  const eventId = pathSegments[pathSegments.indexOf('event') + 1];
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
      <PlayerList players={players} onViewDetails={viewPlayerDetails} editable />
      <Button back>Back</Button>
    </div>
  );
};

export default Players;
