import React, { useState } from 'react';
import axios from "axios";
import useGetUserID from "../hooks/useGetUserID";
import {useNavigate} from "react-router-dom";
import { useCookies} from "react-cookie";

export default function CreateRecipe() {
  const userID = useGetUserID();
  const [cookies, setCookies] = useCookies(["access_token"])
  const [recipe, setRecipe] = useState({
    name: "",
    ingredients: [],
    instructions: "",
    imageURL: "",
    cookingTime: 0,
    userOwner: userID,
  });

  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setRecipe({ ...recipe, [name]: value });
  }

  const handleIngredientChange = (event, idx) => {
    const { value } = event.target;
    const ingredients = recipe.ingredients;
    ingredients[idx] = value;
    setRecipe({ ...recipe, ingredients });
  }

  const addIngredient = () => {
    setRecipe({ ...recipe, ingredients: [...recipe.ingredients, ""] });
  }

  const onSubmit = async (event) => {
    event.preventDefault();

    try {
      await axios.post("https://savorsync-backend.onrender.com/recipes", recipe , 
      { headers: {authorization: cookies.access_token}});
      alert("Recipe Created!");
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  }

  console.log(recipe);
  return (
    <div className='m-2 p-2'>
      <h2 className='title'>Create Recipe</h2>
      <form onSubmit={onSubmit}>
        <div className="mb-3" id='recipe'>
          <label htmlFor="name" className="form-label">Name</label>
          <input type="text" name='name' className="form-control" id="formGroupExampleInput" onChange={handleChange} />
        </div>
        <div className="mb-3" id='recipe'>
          <label htmlFor="ingredients" className="form-label">Ingredients</label>
          {recipe.ingredients.map((ingredient, idx) => (
            <input className="form-control"
              id='box'
              key={idx}
              type='text'
              name="ingredients"
              value={ingredient}
              onChange={(event) => handleIngredientChange(event, idx)}
            />
          ))}
          <button onClick={addIngredient} type='button' className='btn btn-dark' >Add Ingredient</button>
        </div>
        <div className="mb-3" id='recipe'>
          <label htmlFor="instructions" className="form-label">Instructions</label>
          <textarea type="text" name='instructions' className="form-control" id="formGroupExampleInput" onChange={handleChange} ></textarea>
        </div>
        <div className="mb-3" id='recipe'>
          <label htmlFor="imageURL" className="form-label">ImageURL</label>
          <input type="text" name='imageURL' className="form-control" id="formGroupExampleInput" onChange={handleChange} />
        </div>
        <div className="mb-3" id='recipe'>
          <label htmlFor="cookingTime" className="form-label">CookingTime (mins)</label>
          <input type="text" name='cookingTime' className="form-control" id="formGroupExampleInput" onChange={handleChange} />
          <button type='submit' className='btn btn-dark m-2'  >Create</button>
        </div>
      </form>

    </div>
  )
}
