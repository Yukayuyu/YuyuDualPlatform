export type Player = {
    _no : number,
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
}

export type Match = {
    match_id : string,
    round : number,
    group : string | number | null,
    player1 : number,
    player2 : number | null,
    winner ?: number | null,

}

export type Round = {
    round_no : number,
    start_time ?: Date,
    end_time ?: Date,
    matches ?: Match[],

}

export type Event = {
    id : number,
    event_type: string,
    event_name : string,
    match_mode : string,
    orgnazier_id : string,
    orgnazier_name : string,
    size : number,
    start_time : Date,
    end_time : Date, 
    address : string,
    players : Player[],
    round_now : number,
    rounds : Round[],

}

