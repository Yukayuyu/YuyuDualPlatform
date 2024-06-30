import { Sts_Event_Status, Sts_Match_Result, Sts_Round_Status } from "@/server/status/event_status"

export type Player = {
    _no : number,
    id : string,
    player_name : string,
    wins : number,
    points : number,
    win_rate : number,
    result_list : Array<Sts_Match_Result> ,
    opponent_list : Array<number>,
    user_id ?: string,
    offical_user_id ?: string,
    round_now : number,
    match_id_now : string | null,
    decklist ?: any,
}

export type Match = {
    match_id : string,
    round : number,
    group : string | number | null,
    player1 : number,
    player2 : number | null,
    winner ?: number | null,
    winnerId?: string, // Optional: Only present if there is a winner
    status: Sts_Event_Status,
    resultDetail?: any,

}

export type Round = {
    id: string,
    eventId: string,
    round_no : number,
    start_time ?: Date,
    end_time ?: Date,
    status: Sts_Round_Status,
}

export type Event = {
    id : string,
    name : string,
    event_type: string,
    match_mode : string,
    host_id : string,
    host_name : string,
    players_number : number,
    date: Date | null,
    start_time ?: Date | null,
    end_time ?: Date | null, 
    address : string,
    players : Player[],
    round_now : number,
    rounds : Round[],
    pre_registration_decklist : boolean,
    status: Sts_Event_Status;
}

