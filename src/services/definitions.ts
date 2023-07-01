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
}
export type PokeJSON = {
  count: number,
  results: number[]
}