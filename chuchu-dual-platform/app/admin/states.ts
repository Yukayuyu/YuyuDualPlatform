import {create} from 'zustand'

type adminStoreType = {
    userid : string,
    password : string, 
    setUserid : Function,
    setPassword : Function,
    resetUserid : Function,
    resetPassword : Function
}

export const useAdminStore = create<adminStoreType>((set)=>({
    userid : '',
    password : '',
    setUserid : (value : string) => set((state : adminStoreType) =>({userid : value})),
    setPassword : (value : string) => set((state : adminStoreType)=>({password : value})),
    resetUserid : () => set(() => ({userid : ''})),
    resetPassword : () => set(() => ({password : ''}))
}))

