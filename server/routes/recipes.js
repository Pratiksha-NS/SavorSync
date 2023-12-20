
import { RecipeModel } from "../models/Recipes.js";
import express from "express";
import { UserModel } from "../models/Users.js";
import { verifyToken } from "./users.js";

const router = express.Router();

router.get("/", async(req, res) =>{
    try {
        const response = await RecipeModel.find({});
        res.json(response);
    } catch (error) {
        res.json(error);
    }
});

router.post("/", verifyToken, async(req, res) =>{
    const recipe = new RecipeModel(req.body);
    try {
        const response = await recipe.save();
        res.json(response);
    } catch (error) {
        res.json(error);
    }
});

router.put("/", verifyToken, async(req, res) =>{
    try {
        const recipe = await RecipeModel.findById(req.body.recipeID);
        const user = await UserModel.findById(req.body.userID);
        user.savedRecipes.push(recipe);
        await user.save();
        res.json({ savedRecipes: user.savedRecipes});
    } catch (error) {
        res.json(error);
    }
});

router.get("/savedRecipes/ids/:userID", async (req, res)=>{
    try {
        const user = await UserModel.findById(req.params.userID);
        res.json({ savedRecipes: user?.savedRecipes});

    } catch (error) {
        res.json(error);
    }
});

router.get("/savedRecipes/:userID", async (req, res)=>{
    try {
        const user = await UserModel.findById(req.params.userID);
        const savedRecipes = await RecipeModel.find({
            _id:{ $in: user.savedRecipes},
        })
        res.json({ savedRecipes});

    } catch (error) {
        res.json(error);
    }
});

router.put("/removeSavedRecipe/:userID",  async (req, res) => {
    try {
      const user = await UserModel.findById(req.params.userID);
      const indexToRemove = user.savedRecipes.indexOf(req.body.recipeID);
      
      if (indexToRemove !== -1) {
        user.savedRecipes.splice(indexToRemove, 1);
        await user.save();
        res.json({ savedRecipes: user.savedRecipes });
      } else {
        res.status(404).json({ error: 'Recipe not found in saved recipes' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

export {router as recipesRouter};