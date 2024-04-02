"use client"
import { useEffect, useCallback, useState } from 'react';
import { useOrganizerStore} from './states'
import { Combobox } from '@headlessui/react';


export default function Home() {
  const admin_state = useOrganizerStore()


  const handleLogin = () =>{
    console.log(admin_state.userid)    
  }

  const handleRegister = () =>{
      admin_state.resetPassword();
      admin_state.resetUserid();
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="flex flex-col items-center gap-4">
        <div className="flex flex-col items-center">
          <div className="relative mt-1">
            <div className="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
              <input
                className="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0"
                placeholder='ユーザー名'
              />
            </div>
          </div>
          <div className="relative mt-1">
            <div className="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
              <input
                className="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0"
                placeholder='パスワード'
                value={admin_state.password}
                onChange={(e)=>admin_state.setPassword(e.target.value)}
              />
            </div>
          </div>
          <div className="w-full flex flex-col items-center">
            <button
              className="mt-4 w-3/4 rounded bg-blue-500 py-2 px-4 text-white hover:bg-blue-700"
              onClick={handleLogin}
            >
              ログイン
            </button>
            <button
              className="mt-2 w-3/4 rounded border border-blue-500 py-2 px-4 text-blue-500 hover:bg-blue-500 hover:text-white"
              id="register"
              onClick={handleRegister}
            >
              新規登録
            </button>
          </div>
        </div>
      </div>

    </main>
  );
}

