import './App.css';
import { useState, useEffect } from 'react';
import { db } from './firebase_config';
import { collection, getDocs } from 'firebase/firestore';
import { motion } from 'framer-motion';

function App() {
  const [PokemonObject, setPokemonObject] = useState([])
  const [Intro, setIntro] = useState(true)
  const [Result, setResult] = useState(false)
  const [Amount, setAmount] = useState(1)
  const [Count, setCount] = useState(0)
  const [SelDiff, setSelDiff] = useState(false)
  const [Grade, setGrade] = useState(0)
  const [Difficulty, setDifficulty] = useState('Normal')
  const [Shortened, setShortened] = useState([])
  const numbers = [3, 6, 10, 15, 20];

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
    setShortened(PokemonObject.slice(0, Amount))
    setIntro(intro => !intro);
  }

  const handleAnswer = (e) => {
    if (e.target.value === Shortened[Count].data.Name || e.target.value === Shortened[Count].data.Name.toLowerCase()) {
      setCount(Count + 1)
      setGrade(Grade + 1)
      e.target.value = '';
      if (Shortened.length === Count + 1) {
        setResult(true);
      }
    }
  }

  const handleNext = () => {
    setCount(Count + 1);
    if (Shortened.length === Count + 1) {
      setResult(true);
    }
  }

  const Restart = () => {
    setAmount(0);
    setCount(0);
    setGrade(0);
    setIntro(true); 
    setResult(false);
    setSelDiff(false);
    setShortened([])
  }

  return (
    <div className="App">
      <div className="app_container">
        <div className="app_content">
          {Intro
            ?
            <div className="app_intro">
              {SelDiff ?
              <>
                <motion.h1 initial={{opacity: 0}} animate={{opacity: 1}}>Difficulty</motion.h1>
                <motion.div  initial={{opacity: 0}} animate={{opacity: 1}} className="section">
                  <button onClick={() => setDifficulty('Normal')}>Normal</button>
                  <button onClick={() => setDifficulty('Hard')}>Hard</button>
                  <button onClick={() => setDifficulty('Hell')}>Hell</button>
                </motion.div>
                <motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }} onClick={startGame}>Start</motion.button>
              </>
              : 
              <>
                  <motion.h1 initial={{ y: -10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 1 }}>Amount</motion.h1>
                  <div className="section">
                    {numbers.map(value => (
                      <motion.input initial={{ opacity: 0 }} animate={{ opacity: 1 }} type="button" key={value} value={value} onClick={v => setAmount(v.target.value)} />
                      ))}
                  </div>
                  <button onClick={() => setSelDiff(true)}>Next</button>
                      </>
              }
            </div>
            :
            <>
              {Result
                ?
                <div className="app_results">
                  <h1>Congratulations, you've made it to the end!</h1>
                  <p>Result: {Grade} / {Amount} </p>
                  <button onClick={Restart}>Want to restart?</button>
                </div>
                :
                <motion.div className="app_questions" initial={{ x: 1800 }} animate={{ x: 0 }} transition={{ duration: 1, type: 'spring' }}>
                  <motion.h1 initial={{ y: -10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 1 }} >Who is that pokemon?</motion.h1>
                  <motion.p initial={{ y: -10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 1 }} >{Count + 1}/{Amount}</motion.p>
                  {{
                    'Normal': <img id="normal" src={Shortened[Count].data.Image} alt={Shortened[Count].data.Name} draggable="false" />,
                    'Hard': <img id="hard" src={Shortened[Count].data.Image} alt={Shortened[Count].data.Name} draggable="false" />,
                    'Hell': <motion.img id="hard" animate={{ rotate: [100, 0, 180, 270, 180, 270, 90, 0, 300, 0, 100] }} transition={{ repeat: Infinity, duration: 2 }} src={Shortened[Count].data.Image} alt={Shortened[Count].data.Name} draggable="false" />
                  }[Difficulty]}
                  <input type="text" onChange={(e) => handleAnswer(e)} />
                  <p>Don't know the answer?<button onClick={handleNext}>Next</button></p>
                </motion.div>
              }
            </>
          }
        </div>
      </div >
    </div >
  );
}

export default App;
