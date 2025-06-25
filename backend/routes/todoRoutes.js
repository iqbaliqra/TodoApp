import express from 'express';
import Todo from '../models/Todo.js';

const router = express.Router();

// Get all task list
router.get('/gettask', async (req, res) => {
  try {
    const todos = await Todo.find();
    if (!todos) {
      return res.status(404).json({ message: 'No data found' });
    }
    res.status(201).json(todos);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
//get task by id 
router.get('/gettask/:id', async (req, res) => {
  try {
      const{id}=req.params;
    const todos = await Todo.findOne({_id:id});
    if (!todos) {
      return res.status(404).json({ message: 'No data found' });
    }
    res.status(201).json(todos);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});


// Create task
router.post('/createtask', async (req, res) => {
  try {
    const { title, description, StartDateTime, EndDateTime, isBilled, isStatus, Price } = req.body;
    const newTodo = await Todo.create({ title, description, StartDateTime, EndDateTime, isBilled, isStatus, Price });
    res.status(201).json(newTodo);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete task by ID
router.delete('/deletetask/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await Todo.findById(id);
    if (!todo) {
      return res.status(404).json({ message: 'Data not found' });
    }
    await Todo.deleteOne({ _id: id });
    res.status(200).json({ message: 'Todo deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Update todo by ID
router.put('/updatetask/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    const updatedTodo = await Todo.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!updatedTodo) {
      return res.status(404).json({ message: 'Data not found' });
    }

    res.status(200).json({
      message: 'Todo updated successfully',
      data: updatedTodo,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

//after pay with card update

router.get('/updatetask', async (req, res) => {
  try {
    const { taskId, Price } = req.query;

   
    const updatedTodo = await Todo.findByIdAndUpdate(taskId, {
      isBilled: true,
      Price:Price,
      isStatus:true
    }, {
      new: true,
      runValidators: true,
    });

    if (!updatedTodo) {
      return res.status(404).json({ message: 'Data not found' });
    }

     res.redirect('http://localhost:5173/dashboard');

  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get('/filtertask', async (req, res) => {
  try {
    const {status, billed } = req.query;

    let filter = {};

    if (status) {
      if (status === 'completed') filter.isStatus = true;
      else if (status === 'pending') filter.isStatus = false;
    }

    if (billed) {
      filter.isBilled = billed === 'true';
    }

    const tasks = await Todo.find(filter);
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});



export default router;
