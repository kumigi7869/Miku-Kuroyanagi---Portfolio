import React, { useState } from 'react';
import './App.css';

const ShuffleApp: React.FC = () => {
  const [words, setWords] = useState<string[]>([]);
  const [inputWord, setInputWord] = useState<string>('');
  const [savedWords, setSavedWords] = useState<string[]>([]);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [firstWord, setFirstWord] = useState<string>('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputWord(event.target.value);
  };

  const handleAddWord = (word: string) => {
    if (word.trim() !== '') {
      setWords([...words, word]);
      setInputWord('');
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleAddWord(inputWord);
    }
  };

  const handleShuffle = () => {
    const shuffledWords = [...words];
    for (let i = shuffledWords.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledWords[i], shuffledWords[j]] = [shuffledWords[j], shuffledWords[i]];
    }
    setWords(shuffledWords);
    setFirstWord(shuffledWords[0]); // 1位のワードをセット
    setShowModal(true); // モーダルを表示
  };

  const handleSaveWords = () => {
    setSavedWords([...savedWords, ...words]);
    setWords([]);
  };

  const handleAddSavedWord = (word: string) => {
    handleAddWord(word);
  };
  const handleDeletedSavedWord = (index: number) => {
    const updatedSavedWords = [...savedWords];
    updatedSavedWords.splice(index, 1);
    setSavedWords(updatedSavedWords);
  };    

  const handleModalClose = () => {
    setShowModal(false);
  };

  return (
    <div className="app-container">
      <h1>ランチシャッフル!!!</h1>
      <div className="input-container">
        <input type="text" value={inputWord} onChange={handleInputChange} onKeyPress={handleKeyPress} />
        <button onClick={() => handleAddWord(inputWord)}>追加</button>
      </div>
      <button className="shuffle-button" onClick={handleShuffle}>シャッフル</button>
      <ul className="word-list">
        {words.map((word, index) => (
          <li className="word-item" key={index}>
            <span className="rank">{index + 1 + "."}</span>
            <span className="word-text">{word}</span>
          </li>
        ))}
      </ul>
      <div className="save-container">
        <button className="save-button" onClick={handleSaveWords}>保存</button>
        {savedWords.length > 0 && (
         <ul className="saved-words-list">
            {savedWords.map((savedWord, index) => (
              <li className="saved-word-item" key={index}>
                {savedWord}
                <button
                  className="add-button"
                  onClick={() => handleAddSavedWord(savedWord)}
                >
                  追加
                </button>
                <button
                  className="delete-button"
                  onClick={() => handleDeletedSavedWord(index)}
                >
                  削除
                  </button>
              </li>
            ))}
          </ul>
        )}
      </div>
      {showModal && (
        <div className="modal-overlay" onClick={handleModalClose}>
          <div className="modal">
            <h2>1位のお店</h2>
            <p>{firstWord}</p>
            <button onClick={handleModalClose}>閉じる</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShuffleApp;
