import {create} from 'zustand'

type organizerStoreType = {
    userid : string,
    password : string, 
    setUserid : Function,
    setPassword : Function,
    resetUserid : Function,
    resetPassword : Function
}

export const useOrganizerStore = create<organizerStoreType>((set)=>({
    userid : '',
    password : '',
    setUserid : (value : string) => set(() =>({userid : value})),
    setPassword : (value : string) => set(()=>({password : value})),
    resetUserid : () => set(() => ({userid : ''})),
    resetPassword : () => set(() => ({password : ''}))
}))

