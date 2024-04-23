import express from "express";
import morgan from "morgan";
import cors from "cors";

//Here we inizialize the app with express
const app = express();





//Here we going to import the routes 

import FarmRoutes from './routes/Farm.routes.js'


app.use(morgan("dev"));
app.use(express.json());
app.use(cors());

app.use(FarmRoutes)
export default app;
