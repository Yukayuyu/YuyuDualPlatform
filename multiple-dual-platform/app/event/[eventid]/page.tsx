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
import { Player } from '@/server/lib/types/event';
import toast from 'react-hot-toast';

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
      setPlayers((eventData as any).participants || []);
    }
  };

  const fetchRounds = async () => {
    const fetchedRounds = await getRoundsByEventId(eventId!);
    setRounds(fetchedRounds);
  };

  const startPlayerRegistration = async () => {
    if (eventId) {
      await updateEventStatus(eventId, 'Player Registration');
      toast.success('Player registration started');
      fetchEvent(); // 更新後に再取得
    }
  };

  const startEvent = async () => {
    if (eventId) {
      await updateEventStatus(eventId, 'In Progress');
      toast.success('Event started');
      fetchEvent(); // 更新後に再取得
    }
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
      {event.status === 'Not Started' && (
        <button className={styles.button} onClick={startPlayerRegistration}>Start Player Registration</button>
      )}
      {event.status === 'Player Registration' && (
        <div>
          <h2>Player Registration</h2>
          <input
            type="text"
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
            placeholder="Player Name"
            required
            className={styles.input}
          />
          <button className={styles.button} onClick={addPlayer}>Add Player</button>
          <h2>Players</h2>
          <ul className={styles.list}>
            {players.map((player) => (
              <li key={player.id}>{player.player_name}</li>
            ))}
          </ul>
          <button className={styles.button} onClick={startEvent}>Start Event</button>
        </div>
      )}
      {event.status === 'In Progress' && (
        <div>
          <h2>Create Round</h2>
          <input
            type="text"
            value={roundName}
            onChange={(e) => setRoundName(e.target.value)}
            placeholder="Round Name"
            required
            className={styles.input}
          />
          <button className={styles.button} onClick={createRoundHandler}>Create Round</button>
          <h2>Rounds</h2>
          <ul className={styles.list}>
            {rounds.map((round) => (
              <li key={round.id}>
                <a className={styles.link} href={`/event/${eventId}/round/${round.id}`}>{round.name}</a>
              </li>
            ))}
          </ul>
        </div>
      )}
      {/* イベントの他の詳細をここに追加 */}
    </div>
  );
};

export default EventDetail;
