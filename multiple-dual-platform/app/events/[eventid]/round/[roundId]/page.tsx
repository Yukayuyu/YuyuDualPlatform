"use client";

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import styles from './RoundDetail.module.css'; // CSSモジュールをインポート
import { getRoundById, getMatchesByRoundId } from '@/server/lib/service/roundService'; // サービスをインポート

const RoundDetail = () => {
  const router = useRouter();
  const pathname = usePathname();
  const pathSegments = pathname.split('/');
  const eventId = pathSegments[pathSegments.indexOf('events') + 1];
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

  if (!round) return <div>Loading...</div>;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Round Details</h1>
      <p><strong>Round Name:</strong> {round.name}</p>
      <h2>Matches</h2>
      <ul className={styles.list}>
        {matches.map((match) => (
          <li key={match.id}>
            {match.player1.player_name} vs {match.player2 ? match.player2.player_name : 'Bye'} - {match.status}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RoundDetail;
