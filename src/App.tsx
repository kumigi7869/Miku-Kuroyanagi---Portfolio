import React, { useState } from 'react';
import './App.css';

const ShuffleApp: React.FC = () => {
  const [words, setWords] = useState<string[]>([]);
  const [inputWord, setInputWord] = useState<string>('');
  const [savedWords, setSavedWords] = useState<string[]>([]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputWord(event.target.value);
  };

  const handleAddWord = () => {
    if (inputWord.trim() !== '') {
      setWords([...words, inputWord]);
      setInputWord('');
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleAddWord();
    }
  };

  const handleShuffle = () => {
    const shuffledWords = [...words];
    for (let i = shuffledWords.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledWords[i], shuffledWords[j]] = [shuffledWords[j], shuffledWords[i]];
    }
    setWords(shuffledWords);
  };

  const handleSaveWords = () => {
    setSavedWords([...savedWords, ...words]);
    setWords([]);
  };

  return (
    <div className="app-container">
      <h1>ランチシャッフル!!!</h1>
      <div className="input-container">
        <input type="text" value={inputWord} onChange={handleInputChange} onKeyPress={handleKeyPress} />
        <button onClick={handleAddWord}>追加</button>
      </div>
      <button className="shuffle-button" onClick={handleShuffle}>シャッフル</button>
      <ul className="word-list">
        {words.map((word, index) => (
          <li className="word-item" key={index}>
            <span className="rank">{index + 1}</span>
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
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ShuffleApp;
