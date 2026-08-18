import './App.css'
import { languages } from './languages'
import { useState } from 'react'
import { clsx } from 'clsx'
import { getFarewellText } from './utils'

function App() {

  // State values
  const [currentWord, setCurrentWord] = useState("react");
  const [guessedLetters, setGuessedLetters] = useState([]);

  // Derived values
  const wrongGuessCount = guessedLetters.filter(letter =>
    !currentWord.includes(letter)
  ).length;
  const isGameWon = currentWord.split("").every(letter => guessedLetters.includes(letter));
  const isGameLost = wrongGuessCount >= (languages.length - 1);
  const isGameOver = isGameWon || isGameLost;

  const lastGuessedLetter = guessedLetters[guessedLetters.length - 1];
  const isLastGuessIncorrect = lastGuessedLetter && !currentWord.includes(lastGuessedLetter);

  // Static values
  const alphabet = "abcdefghijklmnopqrstuvwxyz"

  const addGuessedLetter = (letter) => {
    setGuessedLetters(prevLetters =>
      prevLetters.includes(letter) ? prevLetters : [...prevLetters, letter]
    );
  }

  const gameStatus = clsx("game-status", {
    won: isGameWon,
    lost: isGameLost,
    farewell: !isGameOver && isLastGuessIncorrect
  });

  const renderGameSatus = () => {
    if (!isGameOver && isLastGuessIncorrect) {
      return (
      <p className='farewell-message'>
        {getFarewellText(languages[wrongGuessCount - 1].name)}
      </p>
    )
    }

    if (isGameWon) {
      return (
        <>
          <h2>You win!</h2>
          <p>Well done! 🎉</p>
        </>
      )
    } 

    if (isGameLost) {
      return (
        <>
          <h2>Game over!</h2>
          <p>You lose! Better start learning Assembly 😭</p>
        </>
      )
    }

    return null;
  }

  return (
    <main>
      <header>
        <h1>Assembly: Endgame</h1>
        <p>Guess the word within 8 attempts to keep the programming world safe from Assembly!</p>
      </header>

      <section className={gameStatus}>
        {renderGameSatus()}
      </section>

      <section className='language-chips'>
        {languages.map((lang, index) => {
          const isLanguageLost = index < wrongGuessCount;
          const styles = {
            backgroundColor: lang.backgroundColor,
            color: lang.color
          }
          const className = clsx("chip", isLanguageLost && "lost");
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

      {isGameOver && (
        <button className="new-game">New Game</button>
      )}
    </main>
  )
}

export default App
