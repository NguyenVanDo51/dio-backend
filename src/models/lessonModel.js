// contactModel.js
import mongoose from 'mongoose';
// Setup schema
const lessonModel = mongoose.Schema({
  categoryId: {
    type: String,
    require: true,
  },
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  words: {
    type: Array,
    required: true,
  },
  createdDate: {
    type: Date,
    default: new Date(),
  },
  updated_date: {
    type: Date,
    default: new Date(),
  },
});

export default mongoose.model('lessons', lessonModel);
