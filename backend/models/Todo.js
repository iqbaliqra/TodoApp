import mongoose from 'mongoose';

const todoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  StartDateTime: {
    type: Date,
    required: true
  },
  EndDateTime: {
    type: Date,
    required: true
  },
  isBilled: {
    type: Boolean,
    default: false
  },
  isStatus: {
    type: Boolean,
    default: false
  },
  Price: {
    type: Number,
    required: true
  }
});

const Todo = mongoose.model('Todo', todoSchema);
export default Todo;
