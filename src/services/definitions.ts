export type Pokemon = {
  id: number
  name: string
  sprites: {
    other: {
      dream_world: {
        front_default: string
      }
    }
  }
  types: PokemonType[]
}
export type PokemonType = {
  slot: number
  type: {name: string}
}
