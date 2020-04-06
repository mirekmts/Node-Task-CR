import { Document } from 'mongoose';
import { Cat } from './cat.interface';
import { Dog } from './dog.interface';


// For consider
// Maybe remove cars and dogs array here and add owner property to each cat and dog
export interface Owner extends Document {
  readonly name: string;
  readonly age: number;
  readonly cats: Cat[];
  readonly dogs: Dog[];
}
