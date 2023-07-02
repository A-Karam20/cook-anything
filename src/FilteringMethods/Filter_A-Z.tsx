import { Recipe } from "../Models/RecipeModel";

export function filter_A_Z( recipes : Recipe[] | undefined) : Recipe[] | undefined  {
    if(recipes)
    {
        const copiedArray = Array.from(recipes);
        const filteredRecipes : Recipe[] = copiedArray.sort((a,b) => a.title.toLowerCase().localeCompare(b.title.toLowerCase()));
        return(filteredRecipes);
    }
}