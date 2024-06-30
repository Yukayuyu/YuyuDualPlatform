"use client";

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import styles from './RoundDetail.module.css'; // CSSモジュールをインポート
import { getRoundById, getMatchesByRoundId, updateMatchResult } from '@/server/lib/service/roundService'; // サービスをインポート
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import toast from 'react-hot-toast';

const RoundDetail = () => {
  const router = useRouter();
  const pathname = usePathname();
  const pathSegments = pathname.split('/');
  const eventId = pathSegments[pathSegments.indexOf('event') + 1];
  const roundId = pathSegments[pathSegments.indexOf('round') + 1];
  const [round, setRound] = useState<any>(null);
  const [matches, setMatches] = useState<any[]>([]);

  useEffect(() => {
    if (eventId && roundId) {
      fetchRound();
      fetchMatches();
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

  if (!round) return <div>Loading...</div>;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Round Details</h1>
      <p><strong>Round Name:</strong> {round.name}</p>
      <h2>Matches</h2>
      <ul className={styles.list}>
        {matches.map((match) => (
          <li key={match.id} className={styles.listItem}>
            <span>{match.player1} vs {match.player2 ? match.player2 : 'Bye'} - {match.status}</span>
            <a className={styles.link} href={`/host/event/${eventId}/round/${roundId}/match/${match.id}`}>View Details</a>
          </li>
        ))}
      </ul>
      <Button back>Back</Button>
    </div>
  );
};

export default RoundDetail;
