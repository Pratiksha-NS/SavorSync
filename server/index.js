import express from "express";
import cors from "cors";
import mongoose from "mongoose";

import { userRouter } from "./routes/users.js";
import { recipesRouter } from "./routes/recipes.js";

const app = express();
const port = 5000;

app.use(express.json());
app.use(cors());

app.use("/auth", userRouter);
app.use("/recipes", recipesRouter);

app.get('/', (req, res) => {
    res.send("hello world")
});

mongoose.connect(
    "mongodb+srv://pratikshans:MeRnRecipe670@recipes.6zazk1h.mongodb.net/recipes?retryWrites=true&w=majority"
)

app.listen(port, () =>{
   console.log( `server running on port ${port}.`);
});