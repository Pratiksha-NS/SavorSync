import React, { useEffect, useState } from 'react'
import axios from 'axios';
import useGetUserID from "../hooks/useGetUserID";
import { useCookies } from "react-cookie";
import SoupKitchenIcon from '@mui/icons-material/SoupKitchen';

export default function Home() {

  const [recipes, setRecipes] = useState([]);
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [cookies, setCookies] = useCookies(["access_token"]);

  const userID = useGetUserID();
  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await axios.get("http://localhost:5000/recipes");

        setRecipes(response.data);

      } catch (err) {
        console.error(err)
      }
    };

    const fetchSavedRecipe = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/recipes/savedRecipes/ids/${userID}`);

        setSavedRecipes(response.data.savedRecipes);

      } catch (err) {
        console.error(err)
      }
    };

    fetchRecipe();
    fetchSavedRecipe();
  }, [userID]);

  const saveRecipe = async (recipeID) => {
    if(userID){ 
      try {
      const response = await axios.put("http://localhost:5000/recipes",
        {
          recipeID,
          userID
        }, { headers: { authorization: cookies.access_token } });
      setSavedRecipes(response.data.savedRecipes)
      console.log(response)
    } catch (err) {
      console.error(err)
    }
  } else {
    alert("Please LogIn to Save");
  }
  }

  const isRecipeSaved = (id) => savedRecipes && savedRecipes.includes(id);

  return (
    <div>

      <div className="p-5 text-center bg-body-tertiary" id='title-recipe'>
        <div className="container py-5 m-5">
          <h1 className="text-body-emphasis fs-1" id='color'><SoupKitchenIcon fontSize='16'/>SavorSync</h1>
          <p className="col-lg-8 mx-auto lead fs-3">
          "Welcome to SavorSync, where culinary inspiration meets simplicity. Explore a world of delightful recipes, personalized just for you. Unleash your inner chef and embark on a flavorful journey with SavorSync – your trusted companion in the art of savoring every bite."
          </p>
        </div>
      </div>


      {recipes.map((recipe) => (
        <div className="card mx-auto" style={{ width: "30rem" }} key={recipe._id}>
          <h3 className="card-title">{recipe.name}</h3>

          <div className="card-body">
            <img src={recipe.imageURL} id='img' className="card-img-top" alt={recipe.name} />
            <p className="card-text"><span className='fw-bold'>Instructions: </span>{recipe.instructions}</p>
            <p className="card-text"><span className='fw-bold'>Time Required: </span>{recipe.cookingTime} (mins)</p>
            <button className="btn btn-dark" onClick={() => saveRecipe(recipe._id)}
              disabled={isRecipeSaved(recipe._id)} >
              {isRecipeSaved(recipe._id) ? "Saved" : "Save"}
            </button>
          </div>
        </div>
      ))}
    </div>
  )
};
