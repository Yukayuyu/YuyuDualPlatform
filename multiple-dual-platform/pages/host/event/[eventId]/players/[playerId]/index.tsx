"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import styles from '@/styles/host/PlayerDetails.module.css'; // CSSモジュールをインポート
import { Input } from '@/components/Input';
import { Button } from '@/components/Button';
import toast from 'react-hot-toast';
import { Player } from '@/server/lib/types/event';
import { getEventById, updatePlayerInEvent } from '@/server/lib/service/eventService';

const PlayerDetails = () => {
  const router = useRouter();
  const {eventId, playerId} = router.query;
  const [player, setPlayer] = useState<Player | null>(null);
  const [playerName, setPlayerName] = useState<string>('');

  useEffect(() => {
    if (eventId!! && playerId!!) {
      fetchPlayerDetails();
    }
  }, [eventId, playerId]);

  const fetchPlayerDetails = async () => {
    const eventData = await getEventById(eventId!);
    if (eventData) {
      const playerData = (eventData as any).players.find((p: Player) => p.id === playerId);
      if (playerData) {
        setPlayer(playerData);
        setPlayerName(playerData.player_name);
      }
    }
  };

  const updatePlayer = async () => {
    if (eventId && player) {
      const updatedPlayer = { ...player, player_name: playerName };
      await updatePlayerInEvent(eventId, updatedPlayer);
      toast.success('Player updated successfully');
      router.back();
    }
  };

  if (!player) return <div>Loading...</div>;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Player Details</h1>
      <div>
        <Input
          type="text"
          value={playerName}
          onChange={(e) => setPlayerName(e.target.value)}
          placeholder="Player Name"
          required
        />
        <Button onClick={updatePlayer}>Save</Button>
      </div>
      <Button back>Back</Button>
    </div>
  );
};

export default PlayerDetails;
