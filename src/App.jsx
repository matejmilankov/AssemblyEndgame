import './App.css'
import { languages } from './languages'

function App() {

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
        {languages.map(lang => {
          const styles = {
            backgroundColor: lang.backgroundColor,
            color: lang.color
          }
          return (
            <span className='chip' 
                  style={styles}
                  key={lang.name}>
              {lang.name}
            </span>
          )
        })}
      </section>
    </main>
  )
}

export default App
