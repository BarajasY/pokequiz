import './App.css';
import { useState, useEffect } from 'react';
import { db } from './firebase_config';
import { collection, getDocs } from 'firebase/firestore';

function App() {
  const [PokemonObject, setPokemonObject] = useState([])
  const [Intro, setIntro] = useState(true)
  const [Amount, setAmount] = useState(0)
  const [Count, setCount] = useState(0)

  const handleAnswer = (e) => {
    if (e.target.value === PokemonObject[Count].data.Name) {
      setCount(Count => Count + 1)
      e.target.value = ''
    }
  }

  useEffect(() => {
    const getData = async () => {
      const pokemonCol = collection(db, 'pokemon');
      getDocs(pokemonCol).then(response => {
        const data = response.docs.map(doc => ({ data: doc.data(), id: doc.id }))
        setPokemonObject(data)
      })
    }

    getData()
  }, [])

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  const startGame = () => {
    shuffleArray(PokemonObject);
    PokemonObject.length = Amount;
    setIntro(intro => !intro);
  }

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
              <h1>Guess the pokemon!</h1>
              <img src={PokemonObject[Count].data.Image} alt={PokemonObject[Count].data.Name} draggable="false" />
              <input type="text" onChange={(e) => handleAnswer(e)} />
            </div>
          }
        </div>
      </div>
    </div>
  );
}

export default App;
