import { useEffect, useState } from 'react'
import { Pokemon } from '../services/definitions'

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
        <div className='max-w-sm h-30 rounded-md bg-slate-200 p-5 flex justify-items-center items-center gap-10'>
          <span>
            <h2 className='text-2xl font-bold first-letter:capitalize'>{`${pokemon.name} #${pokemon.id}`}</h2>
            <div className='rounded-full bg-white p-8'>
              <img className='pointer-events-none w-32 h-32 object-scale-down' src={pokemon.sprites.other.dream_world.front_default} alt={`${pokemon.name} image`}/>
            </div>
          </span>
          <span>
            <div className='flex flex-col gap-2'>
              <h3 className='text-lg font-bold'>Types</h3>
              {pokemon.types.map((typeObject, index) => {
                const type = typeObject.type.name
                return (
                  <div key={`${pokemon.id}-${index}`} className={`type-box ${type}-type text-sm uppercase p-1`}>{type}</div>
                )
              })}
            </div>
          </span>
        </div>
      }
    </>
  )
}

export default Card
