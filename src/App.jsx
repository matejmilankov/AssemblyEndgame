import './App.css'
import { languages } from './languages'
import { useState } from 'react'
import { clsx } from 'clsx';

function App() {

  // State values
  const [currentWord, setCurrentWord] = useState("react");
  const [guessedLetters, setGuessedLetters] = useState([]);

  // Derived values
  const wrongGuessCount = guessedLetters.filter(letter => 
    !currentWord.includes(letter)
  ).length;


  // Static values
  const alphabet = "abcdefghijklmnopqrstuvwxyz"

  const addGuessedLetter = (letter) => {
    setGuessedLetters(prevLetters =>
      prevLetters.includes(letter) ? prevLetters : [...prevLetters, letter]
    );
  }

  return (
    <main>
      <header>
        <h1>Assembly: Endgame</h1>
        <p>Guess the word within 8 attempts to keep the programming world safe from Assembly!</p>
      </header>

      <section className='game-status'>
        <h2>You win!</h2>
        <p>Well done!</p>
      </section>

      <section className='language-chips'>
        {languages.map((lang, index) => {
          const isLanguageLost = index < wrongGuessCount;
          const styles = {
            backgroundColor: lang.backgroundColor,
            color: lang.color
          }
          const className = clsx("chip", isLanguageLost && "lost")
          return (
            <span className={className}
              style={styles}
              key={lang.name}>
              {lang.name}
            </span>
          )
        })}
      </section>

      <section className='word'>
        {currentWord.split("").map((letter, index) => (
          <span key={index}>
            {guessedLetters.includes(letter) ? letter.toUpperCase() : ""}
          </span>
        ))}
      </section>

      <section className='keyboard'>
        {alphabet.split("").map(letter => {
          const isGuessed = guessedLetters.includes(letter);
          const isCorrect = isGuessed && currentWord.includes(letter);
          
          const isWrong = isGuessed && !currentWord.includes(letter);
          const className = clsx({
            correct: isCorrect,
            wrong: isWrong
          });

          return (
            <button key={letter} className={className}
              onClick={() => addGuessedLetter(letter)}>
              {letter.toUpperCase()}
            </button>
          )
        })}
      </section>

      <button className="new-game">New Game</button>
    </main>
  )
}

export default App
