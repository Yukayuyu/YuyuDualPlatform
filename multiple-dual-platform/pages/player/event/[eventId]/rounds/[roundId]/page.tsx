"use client";

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import styles from './RoundDetail.module.css'; // CSSモジュールをインポート
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import toast from 'react-hot-toast';
import { getMatchesByRoundId, getRoundById, updateMatchResult } from '@/server/lib/service/roundService';

const PlayerRoundDetail = () => {
  const router = useRouter();
  const pathname = usePathname();
  const pathSegments = pathname.split('/');
  const eventId = pathSegments[pathSegments.indexOf('event') + 1];
  const roundId = pathSegments[pathSegments.indexOf('rounds') + 1];
  const [round, setRound] = useState<any>(null);
  const [matches, setMatches] = useState<any[]>([]);
  const [player, setPlayer] = useState<any>(null);

  useEffect(() => {
    const storedPlayer = sessionStorage.getItem('player');
    const storedEventId = sessionStorage.getItem('eventId');
    if (storedPlayer && storedEventId === eventId) {
      setPlayer(JSON.parse(storedPlayer));
      fetchRound();
      fetchMatches();
    } else {
      router.push(`/player/login?eventid=${eventId}`);
    }
  }, [eventId, roundId]);

  const fetchRound = async () => {
    const roundData = await getRoundById(eventId, roundId);
    if (roundData) {
      setRound(roundData);
    }
  };

  const fetchMatches = async () => {
    const fetchedMatches = await getMatchesByRoundId(eventId, roundId);
    setMatches(fetchedMatches);
  };

  const updateMatch = async (matchId: string, result: string) => {
    await updateMatchResult(eventId, roundId, matchId, result);
    toast.success('Match result updated successfully');
    fetchMatches();
  };

  if (!round || !player) return <div>Loading...</div>;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Round Details</h1>
      <p><strong>Round Name:</strong> {round.name}</p>
      <h2>Your Match</h2>
      <ul className={styles.list}>
        {matches.map((match) => {
          if (match.player1 === player._no || match.player2 === player._no) {
            return (
              <li key={match.id} className={styles.listItem}>
                <span>
                  {match.player1 === player._no ? 'You' : match.player1} vs {match.player2 === player._no ? 'You' : match.player2} - {match.status}
                </span>
                <Input
                  type="text"
                  placeholder="Result"
                  onBlur={(e) => updateMatch(match.id, e.target.value)}
                />
              </li>
            );
          }
          return null;
        })}
      </ul>
      <Button back>Back</Button>
    </div>
  );
};

export default PlayerRoundDetail;
