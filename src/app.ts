import express, { Application, Request, Response } from "express";
const app: Application = express()
import cors from 'cors'
import handleGlobalError from "./app/middleware/GlobalErrorHandler";
import notFoundRoute from "./app/middleware/NotFoundRoute";
import mongoose from "mongoose";
import config from "./app/config";
import router from "./app/routes";
// parser
app.use(express.json())
app.use(cors({ origin: ['https://24-7-service.vercel.app/'], credentials: true }));



// Initialize Socket.IO

app.get('/', (req: Request, res: Response) => {
  res.send('talent  is building')
})

app.use('/api/v1',router)
// global error handler 
app.use(handleGlobalError)

// not found route 

app.use(notFoundRoute)

// Connect to MongoDB
async function connectToDatabase() {
  try {
    await mongoose.connect(`${config.database_url}`);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
}
connectToDatabase();

export default app
