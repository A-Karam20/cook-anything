import { MouseEventHandler, MouseEvent } from "react";
import axios from "axios";
import { toast } from "react-toastify";

type Props = {
    recipeTitle : string,
    recipeInstructions : string,
    recipeIngredients : string,
    recipeServings : string,
}

export const SaveRecipe : (event: MouseEvent , id : number, title : string, ingredients: string, servings: string, instructions: string, day: string) 
=> void = (event, id, title, ingredients, servings, instructions, day) => {
    event.preventDefault();
    const clientId : number = 2;
    const recipe = {
        id: id,
        title : title,
        ingredients : ingredients,
        servings : servings,
        instructions : instructions
    }
    axios.post(`https://localhost:7242/api/Recipe/$${clientId}/$${day}`, recipe)
    .then(async (response) => {return await response.data})
    .then((data) => {
        if(!data) return toast.error("Couldn't save recipe");
    })
    .catch((error) => {
        console.log(error);
        toast.error("Couldn't save recipe");
    })
}