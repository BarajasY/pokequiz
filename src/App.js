import './App.css';
import { useState, useEffect } from 'react';
import { db } from './firebase_config';
import { collection, getDocs } from 'firebase/firestore';

function App() {
  const [PokemonObject, setPokemonObject] = useState([])

  const getData = async () => {
    const pokemonCol = collection(db, 'pokemon')
    getDocs(pokemonCol).then(response => {
      const data = response.docs.map(doc => ({ data: doc.data(), id: doc.id }))
      setPokemonObject(data)
    })
  }

  useEffect(() => {
    getData();
  }, [])

  console.log(PokemonObject)


  return (
    <div className="App">
      <h1>wadd</h1>
      {PokemonObject.map(item => (
        <h1 key={item.data.Id}>{item.data.Name}</h1>
      ))}
    </div>
  );
}

export default App;
