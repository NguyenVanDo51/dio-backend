// contactModel.js
import mongoose from 'mongoose';
// Setup schema
const categoryModel = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  createdDate: {
    type: Date,
    default: new Date(),
  },
  updated_date: {
    type: Date,
    default: new Date(),
  }
});

export default mongoose.model('categories', categoryModel);
