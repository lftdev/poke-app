import { useEffect, useState } from 'react'
import Card from './components/Card'
function App() {
  const POKEAPI_URL = 'https://pokeapi.co/api/v2/'
  const POKEMON_ENDPOINT = POKEAPI_URL + 'pokemon/'
  
  let generated = 0
  function genItems(amount: number) {
    return Array.from(Array(amount), () => {
      generated++
      return POKEMON_ENDPOINT + generated
    })
  }
  const [urls, setURLs] = useState(genItems(2))
  useEffect(() => {
    window.onscroll = () => {
      const isAtBottom = (window.scrollY + window.innerHeight) == document.documentElement.scrollHeight
      if (isAtBottom && generated < 151) {
        setURLs(prevURLs => [...prevURLs, ...genItems(1)])
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <>
      {urls.map((url, index) => {
        return (
          <Card key={index} url={url}/>
        )
      })}
    </>
  )
}

export default App
