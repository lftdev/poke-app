import { useEffect, useRef, useState } from 'react'
import { Pokemon } from '../services/definitions'
import { getDominantColor } from '../services/utils'
function Card({ url }: { url: string }) {
  const [pokemon, setPokemon] = useState<Pokemon>()
  const [dominantColor, setDominantColor] = useState('')
  const coverAsideRef = useRef<HTMLElement | null>(null)
  const imgRef = useRef<HTMLImageElement | null>(null)
  useEffect(() => {
    fetch(url)
      .then(res => res.json())
      .then(data => {
        setPokemon(data)
      })
  }, [url])
  useEffect(() => {
    if (imgRef.current instanceof HTMLImageElement)
      imgRef.current.onload = event =>
        setDominantColor(getDominantColor((event.target as HTMLImageElement), 8))
  }, [pokemon])
  useEffect(() => {
    if (coverAsideRef.current instanceof HTMLElement)
      coverAsideRef.current.style.backgroundColor = dominantColor
  }, [dominantColor])
  return (
    <>
      {pokemon &&
        <div className='max-w-sm h-30 rounded-md bg-slate-200 p-5 flex justify-items-center items-center gap-10'>
          <aside className='p-2 rounded-lg text-white text-center' ref={coverAsideRef}>
            <h2 className='text-2xl font-bold first-letter:capitalize'>{`${pokemon.name} #${pokemon.id}`}</h2>
            <div className='rounded-full bg-white p-8'>
              <img className='pointer-events-none w-32 h-32 object-scale-down' src={pokemon.sprites.other.dream_world.front_default} alt={`${pokemon.name} image`} ref={imgRef} />
            </div>
          </aside>
          <aside>
            <div className='flex flex-col gap-2'>
              <h3 className='text-lg font-bold'>Types</h3>
              {pokemon.types.map((typeObject, index) => {
                const type = typeObject.type.name
                return (
                  <div key={`${pokemon.id}-${index}`} className={`type-box ${type}-type text-sm uppercase p-1`}>{type}</div>
                )
              })}
            </div>
          </aside>
        </div>
      }
    </>
  )
}

export default Card
