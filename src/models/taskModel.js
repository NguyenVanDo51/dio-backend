// contactModel.js
import mongoose from 'mongoose';
// Setup schema
const taskSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  createdBy: {
    type: String,
    required: true,
  },
  status: {
    type: Number,
    default: 0,
  },
  is_important: {
    type: Number,
    default: 0
  },
  assignee: {
    type: String,
    required: false,
  },
  description: {
    type: String,
    required: false,
  },
  project_id: {
    type: String,
    require: true,
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

export default mongoose.model('task', taskSchema);
