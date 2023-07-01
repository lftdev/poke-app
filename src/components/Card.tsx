import { Pokemon } from "../services/definitions"

interface CardProps {
  pokemon: Pokemon
}
function Card({pokemon}: CardProps) {
  return (
    <div>
      <h1 className='text-3xl font-bold first-letter:capitalize'>{pokemon.name}</h1>
      <img src={pokemon.sprites.other.dream_world.front_default} alt={`${pokemon.name} image`}/>
    </div>
  )
}
export default Card
