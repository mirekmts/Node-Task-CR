import * as mongoose from 'mongoose';

// We should add some required fields in all schemas
// For Example
// name: {
//   type: String,
//   required: [true, 'Please add name'],
//   trim: true,
//   maxlength: [50, 'Name can not be more than 50 characters'],
// },
// or add validation in DTO files

export const CatSchema = new mongoose.Schema({
  name: String,
  age: Number,
  breed: String,
  weight: Number,
  hasClippedClaws: Boolean,
});
