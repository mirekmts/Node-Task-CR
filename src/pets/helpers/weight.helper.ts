import { Pet } from '../interfaces/pet.interface';

export function getTotalWeight(pets: Pet[]): number {
  // weight isn't be a required filed?
  // prevent from sending NaN if pet haven't got weight property
  return pets.reduce((totalWeight, { weight }) => {
    if(weight) {
      return totalWeight + weight
    }
    return totalWeight
  }, 0)
}
