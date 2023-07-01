import { useEffect, useState } from 'react'
import Card from './components/Card'
import { PokeJSON, Pokemon } from './services/definitions'
function App() {
  const POKEAPI_URL = 'https://pokeapi.co/api/v2/'
  const [json, setJSON] = useState<PokeJSON>()
  const [pokedex, setPokedex] = useState<Pokemon[]>([])
  useEffect(() => {
    fetch (`${POKEAPI_URL}pokemon?limit=386&offset=0}`)
      .then(res => res.json())
      .then(data => setJSON(data))
  }, [])
  useEffect(() => {
    console.log(json)
    for (let i = 0; i < 386; i++) {
      setPokedex(prevPokedex => [...prevPokedex, json])
    }
  }, [json])
  return (
    <>
      {pokedex.map(pokemon => (
        <Card key={pokemon.id} pokemon={pokemon}></Card>
      ))}
    </>
  )
}

export default App
