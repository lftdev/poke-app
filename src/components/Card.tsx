import { useEffect, useState } from "react"
import { Pokemon } from "../services/definitions"

interface CardProps {
  url: string
}
function Card({url}: CardProps) {
  const [pokemon, setPokemon] = useState<Pokemon>()
  useEffect(() => {
    fetch(url)
      .then(res => res.json())
      .then(data => {
        setPokemon(data)
      })
  }, [url])
  return (
    <>
      {pokemon &&
        <div className='max-w-sm h-30 rounded-md bg-slate-200 p-5 flex flex-col justify-items-center items-center'>
          <h1 className='text-3xl font-bold first-letter:capitalize'>{`${pokemon.name}  #${pokemon.id}`}</h1>
          <div className='rounded-full p-8 bg-white'>
            <img className='pointer-events-none w-32 h-32' src={pokemon.sprites.other.dream_world.front_default} alt={`${pokemon.name} image`}/>
          </div>
        </div>
      }
    </>
  )
}
// https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/9.svg
export default Card
