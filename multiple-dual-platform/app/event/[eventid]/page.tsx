"use client";

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import styles from './EventDetail.module.css'; // CSSモジュールをインポート
import {
  getEventById,
  getRoundsByEventId,
  updateEventStatus,
  addPlayerToEvent,
  createRound,
} from '@/server/lib/service/eventService'; // サービスをインポート
import { Input } from '@/components/Input';
import { Button } from '@/components/Button';
import toast from 'react-hot-toast';
import { Player } from '@/server/lib/types/event';

const EventDetail = () => {
  const router = useRouter();
  const pathname = usePathname();
  const eventId = pathname.split('/').pop();
  const [event, setEvent] = useState<any>(null);
  const [rounds, setRounds] = useState<any[]>([]);
  const [roundName, setRoundName] = useState<string>('');
  const [playerName, setPlayerName] = useState<string>('');
  const [players, setPlayers] = useState<Player[]>([]);

  useEffect(() => {
    console.log('Event ID:', eventId);
    if (eventId) {
      fetchEvent();
      fetchRounds();
    }
  }, [eventId]);

  const fetchEvent = async () => {
    const eventData = await getEventById(eventId!);
    if (eventData) {
      setEvent(eventData);
      setPlayers((eventData as any).players || []);
    }
  };

  const fetchRounds = async () => {
    const fetchedRounds = await getRoundsByEventId(eventId!);
    setRounds(fetchedRounds);
  };

  const addPlayer = async () => {
    if (eventId && playerName) {
      const newPlayer: Player = {
        _no: players.length + 1,
        id: `${eventId}-${players.length + 1}`,
        player_name: playerName,
        wins: 0,
        points: 0,
        win_rate: 0,
        result_list: [],
        opponent_list: [],
        round_now: 0,
        match_id_now: null,
      };

      await addPlayerToEvent(eventId, newPlayer);
      setPlayers([...players, newPlayer]);
      setPlayerName('');
      toast.success('Player added successfully');
    }
  };

  const createRoundHandler = async () => {
    if (eventId && roundName) {
      await createRound(eventId, roundName, players);
      setRoundName('');
      toast.success('Round and matches created');
      fetchRounds();
    }
  };

  if (!event) return <div>Loading...</div>;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Event Details</h1>
      <p><strong>Name:</strong> {event.name}</p>
      <p><strong>Date:</strong> {new Date(event.date.seconds * 1000).toLocaleDateString()}</p>
      <p><strong>Status:</strong> {event.status}</p>

      {event.status === 'In Progress' && (
        <div>
          <h2>Create Round</h2>
          <Input
            type="text"
            value={roundName}
            onChange={(e) => setRoundName(e.target.value)}
            placeholder="Round Name"
            required
          />
          <Button onClick={createRoundHandler}>Create Round</Button>
          <h2>Rounds</h2>
          <ul className={styles.list}>
            {rounds.map((round) => (
              <li key={round.id}>
                <a className={styles.link} href={`/host/event/${eventId}/round/${round.id}`}>{round.name}</a>
              </li>
            ))}
          </ul>
        </div>
      )}
      <Button onClick={() => router.push(`/host/event/${eventId}/players`)}>View Players</Button>
      <Button back>Back</Button>
    </div>
  );
};

export default EventDetail;
