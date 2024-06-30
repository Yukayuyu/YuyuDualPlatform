import { FC } from 'react';

import { Button } from '@/components/Button';
import styles from './PlayerList.module.css';
import { Player } from '@/server/lib/types/event';

interface PlayerListProps {
  players: Player[];
  onViewDetails?: (playerId: string) => void;
  editable?: boolean;
  showWins?: boolean;
}

const PlayerList: FC<PlayerListProps> = ({ players, onViewDetails, editable = false, showWins = false }) => {
  return (
    <ul className={styles.list}>
      {players.length === 0 ? (
        <li>No players found.</li>
      ) : (
        players.map(player => (
          <li key={player.id} className={styles.listItem}>
            <span>{player.player_name}</span>
            {showWins && <span>Wins: {player.wins}</span>}
            {editable && <Button variant="link" onClick={() => onViewDetails && onViewDetails(player.id)}>View Details</Button>}
          </li>
        ))
      )}
    </ul>
  );
};

export default PlayerList;
