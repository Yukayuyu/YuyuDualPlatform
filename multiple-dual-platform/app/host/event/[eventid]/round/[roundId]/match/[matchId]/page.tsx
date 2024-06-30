"use client";

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import styles from './MatchDetail.module.css';
import { getMatchById, updateMatchResult } from '@/server/lib/service/matchService';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import toast from 'react-hot-toast';

const MatchDetail = () => {
  const router = useRouter();
  const pathname = usePathname();
  const pathSegments = pathname.split('/');
  const eventId = pathSegments[pathSegments.indexOf('event') + 1];
  const roundId = pathSegments[pathSegments.indexOf('round') + 1];
  const matchId = pathSegments[pathSegments.indexOf('match') + 1];
  const [match, setMatch] = useState<any>(null);
  const [result, setResult] = useState<string>('');

  useEffect(() => {
    if (eventId && roundId && matchId) {
      fetchMatch();
    }
  }, [eventId, roundId, matchId]);

  const fetchMatch = async () => {
    const matchData = await getMatchById(eventId, roundId, matchId);
    if (matchData) {
      setMatch(matchData);
      setResult((matchData as any).result);
    }
  };

  const updateMatch = async () => {
    if (eventId && roundId && matchId) {
      await updateMatchResult(eventId, roundId, matchId, result);
      toast.success('Match result updated successfully');
      router.back();
    }
  };

  if (!match) return <div>Loading...</div>;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Match Details</h1>
      <p><strong>Player 1:</strong> {match.player1}</p>
      <p><strong>Player 2:</strong> {match.player2 ? match.player2 : 'Bye'}</p>
      <p><strong>Status:</strong> {match.status}</p>
      <Input
        type="text"
        value={result}
        onChange={(e) => setResult(e.target.value)}
        placeholder="Result"
      />
      <Button onClick={updateMatch}>Save</Button>
      <Button back>Back</Button>
    </div>
  );
};

export default MatchDetail;
