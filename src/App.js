import './App.css';
import { useState, useEffect } from 'react';
import { db } from './firebase_config';
import { collection, getDocs, limit, orderBy, query } from 'firebase/firestore';

function App() {
  const [PokemonObject, setPokemonObject] = useState([])
  const [Intro, setIntro] = useState(true)
  const [Amount, setAmount] = useState(0)
  const [Count, setCount] = useState(0)
  const [Answer, setAnswer] = useState('')

  // Get questions from firebase database and store them in PokemonObject useState.
  const getData = async () => {
    const pokemonCol = collection(db, 'pokemon');
    const q = query(pokemonCol, limit(Amount))
    getDocs(q).then(response => {
      const data = response.docs.map(doc => ({ data: doc.data(), id: doc.id }))
      setPokemonObject(data)
    })
  }

  const handleAnswer = (e) => {
    setAnswer(e.target.value)
  }


  // Function to start the game and to get the data from the DB.
  const startGame = () => {
    getData()
    setTimeout(timeoutTest, 1000)
  }

  const timeoutTest = () => {
    setIntro(false)
  }

  console.log(PokemonObject)

  return (
    <div className="App">
      <div className="app_container">
        <div className="app_content">
          {Intro
            ?
            <div className="app_intro">
              <h1>Select amount of pokemon to guess!</h1>
              <input type="number" onChange={(e) => setAmount(e.target.value)} />
              <button onClick={startGame}>Start!</button>
            </div>
            :
            <div className="app_questions">
              <h1>Guess the pokemon</h1>
              <img src={PokemonObject[Count].data.Image} alt={PokemonObject[Count].data.Name} />
              <input type="text" onChange={(e) => handleAnswer(e)} />
              <h1>{Answer}</h1>
            </div>
          }
        </div>
      </div>
    </div>
  );
}

export default App;
