import React from 'react';
import { useState } from 'react';

interface InputListProps {
  initialCount: number;
}

const InputList = ({ initialCount }: InputListProps) => {
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
    <div>
      {inputRows.map((id, index) => (
        <div key={id}>
          <label htmlFor={`user-id-${id}`}>ユーザーID {id}:</label>
          <input type="text" id={`user-id-${id}`} name={`user-id-${id}`} />
          <button onClick={() => handleRemoveRow(index)}>行を削除</button>
        </div>
      ))}
      <button onClick={handleAddRow}>行を追加</button>
      <button onClick={handleSubmit}>リスト登録</button>
    </div>
  );
};

export default InputList;
