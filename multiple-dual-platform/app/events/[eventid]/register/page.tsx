"use client"
import { GetServerSidePropsContext } from 'next/types';
import { useState } from 'react';

interface InputListProps {
  initialCount: number;
  eventid : number;
}

export async function getServerSideProps(context: GetServerSidePropsContext) {

  const eventidS = context.params?.eventid as string;
  const eventid = parseInt(eventidS, 10);
  const initialCount = 0; // サーバーから取得した初期値を仮に0とする
  // ここで実際のデータ取得ロジックを実装する

  // propsとしてinitialCountを返す
  return { props: { initialCount, eventid } };
}



const InputList = ({ initialCount, eventid }: InputListProps) => {
  const [inputRows, setInputRows] = useState(Array.from({ length: initialCount }, (_, i) => i + 1));
  
  const handleAddRow = () => {
    setInputRows(prevRows => [...prevRows, prevRows.length + 1]);
  };

  const handleRemoveRow = (index: number) => {
    setInputRows(prevRows => prevRows.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    // ここでユーザーIDのリストを処理するロジックを実装します。
    console.log('リストを登録しました。');
  };

  return (
    <div className="space-y-4">
      {inputRows.map((id, index) => (
        <div key={id} className="flex items-center space-x-2">
          <label htmlFor={`user-id-${id}`} className="block text-sm font-medium text-gray-700">ユーザーID {id}:</label>
          <input type="text" id={`user-id-${id}`} name={`user-id-${id}`} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
          <button onClick={() => handleRemoveRow(index)} className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">行を削除</button>
        </div>
      ))}
      <div className="flex justify-between">
        <button onClick={handleAddRow} className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">行を追加</button>
        <button onClick={handleSubmit} className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">リスト登録</button>
      </div>
    </div>
  );
};


export default InputList;

