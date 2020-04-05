import * as mongoose from 'mongoose';
import { SchemaType } from '../constants'
export const OwnerSchema = new mongoose.Schema({
  name: String,
  age: Number,
  cats: [
    {
      type: mongoose.Schema.ObjectId,
      ref: SchemaType.Cat,
    },
  ],
  dogs: [
    {
      type: mongoose.Schema.ObjectId,
      ref: SchemaType.Dog,
    },
  ],
});
