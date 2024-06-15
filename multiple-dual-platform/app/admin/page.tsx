"use client"
import { useEffect, useCallback, useState } from 'react';
import { useAdminStore} from './states'
import { useRouter } from 'next/navigation'


export default function Home() {
  const admin_state = useAdminStore()

  const router = useRouter() 

  const handleLogin = () =>{
    console.log(admin_state.userid)   
    router.push('/organizer', {scroll : false})
  }

  const handleRegister = () =>{
      admin_state.resetPassword();
      admin_state.resetUserid();
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="flex flex-col items-center gap-4">
        <div className="flex flex-col items-center">
          <input
            name="userId"
            type="text"
            placeholder="ユーザーID"
            className="mb-2 w-full rounded border px-4 py-2 text-black"
            value={admin_state.userid}
            onChange={(e) => admin_state.setUserid(e.target.value)}
          />
          <input
            name="password"
            type="password"
            placeholder="パスワード"
            className="w-full rounded border px-4 py-2 text-black"
            value={admin_state.password}
            onChange={(e) => admin_state.setPassword(e.target.value)}
          />
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

