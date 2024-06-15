"use server"

import { Match, Player, Round } from "../types/event"


export function initPlayer(no :string | number, player_name : string) : Player{
    return {
        _no: typeof no === 'number' ? no : parseInt(no, 10),
        player_name: player_name,
        wins: 0,
        points: 0,
        win_rate: 0,
        result_list: [],
        round_now: 0,
        match_id_now: '',
        opponent_list: [],
    }
}

export function generateRound(round_no : number, players : Player[]){
    let round : Round = {round_no : round_no, matches : []}
    let groupedPlayers : {[key : number] : Player[]} = {}
    

    groupedPlayers = groupPlayersByWins(players);
    
    for (let key in groupedPlayers) {

        let availablePlayers = [...groupedPlayers[key]]

        while(availablePlayers.length > 1){
            let player1 = availablePlayers.shift()!;

            let opponentIndex = availablePlayers.findIndex(p => !player1.opponent_list.includes(p._no));

            if(opponentIndex !== -1){
                let player2 = availablePlayers.splice(opponentIndex, 1)[0];

                round.matches?.push({
                    match_id : [key, player1._no, player2._no].join("-"),
                    group:key, 
                    round: round_no, 
                    player1: player1._no, 
                    player2 : player2._no
                });

                player1.opponent_list.push(player2._no);
                player2.opponent_list.push(player1._no);
            }
            else {
                round.matches?.push({
                    match_id : [key, player1._no].join("-") + Sts_Players.PLAYER_FREE_WIN, 
                    group:key, 
                    round: round_no, 
                    player1: player1._no, 
                    player2 : null
                });

                player1.opponent_list.push(Sts_Players.PLAYER_FREE_WIN_ID);
            }

        }
    }
}

function groupPlayersByWins(players : Player[]) : {[key : number] : Player[]}
{
    let groups : {[key : number] : Player[]} = {};
    for (let player of players){
        if(!groups[player.points]){
            groups[player.points] = []
        }
        groups[player.points].push(player);
    }

    Object.keys(groups).sort((a, b) => parseInt(b) - parseInt(a));

    return groups;
}
