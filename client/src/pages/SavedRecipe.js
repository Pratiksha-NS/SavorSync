import React, { useEffect, useState } from 'react'
import axios from 'axios';
import useGetUserID from "../hooks/useGetUserID";
import DeleteIcon from '@mui/icons-material/Delete';

export default function Home() {

  const [savedRecipes, setSavedRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const userID = useGetUserID();

  useEffect(() => {

    const fetchSavedRecipe = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/recipes/savedRecipes/${userID}`);

        setSavedRecipes(response.data.savedRecipes);

      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false);
      }
    };
    fetchSavedRecipe();
  }, [userID]);

  const handleDelete = async (recipeIdToDelete) => {
    try {
      // Make a request to update the user's saved recipes on the server
      await axios.put(`http://localhost:5000/recipes/removeSavedRecipe/${userID}`, {
        recipeID: recipeIdToDelete,
      });

      // Fetch the updated list of saved recipes
      const response = await axios.get(`http://localhost:5000/recipes/savedRecipes/${userID}`);
      setSavedRecipes(response.data.savedRecipes);
    } catch (err) {
      console.error(err);
    }
  };

  


  return (
    <div>
      <h2 className='title m-4'>My Saved Recipes</h2>
      {loading ? (<p>Loading...</p>) : (
        savedRecipes && savedRecipes.map((recipe) => (
          <div class="card mx-auto" style={{ width: "30rem" }} key={recipe._id}>
          <h3 class="card-title">{recipe.name}</h3>

          <div class="card-body">
            <img src={recipe.imageURL} id='img' class="card-img-top" alt={recipe.name} />
            <p class="card-text"><span className='fw-bold'>Ingredients: </span>{recipe.ingredients}</p>
            <p class="card-text"><span className='fw-bold'>Instructions: </span>{recipe.instructions}</p>
            <p class="card-text"><span className='fw-bold'>Time Required: </span>{recipe.cookingTime} (mins)</p>
            <button type='button' className='btn p-0'><DeleteIcon  onClick={() => handleDelete(recipe._id)}/></button>
          </div>
        </div>
        ))
      ) }

     
    </div>
  )
};
