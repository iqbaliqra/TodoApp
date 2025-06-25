
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import todoRoutes from './routes/todoRoutes.js';
import stripeRoutes from './routes/stripeRoutes.js';
import cors from 'cors';


dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());


const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected Successfully!"))
  .catch((err) => console.error("MongoDB error", err));

app.use('/api', todoRoutes);
app.use('/api',stripeRoutes)

app.get('/', (req, res) => {
  res.send("Welcome to the app");
});


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
