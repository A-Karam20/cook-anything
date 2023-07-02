import { Recipe } from "../Models/RecipeModel";

export function filter_Top_Dislikes( recipes : Recipe[] | undefined) : Recipe[] | undefined  {
    if(recipes)
    {
        const copiedArray = Array.from(recipes);
        const filteredRecipes: Recipe[] = copiedArray.sort((a, b) => {
            if (a.dislikes === b.dislikes) {
              return a.title.toLowerCase().localeCompare(b.title.toLowerCase());
            } else {
              return b.dislikes - a.dislikes;
            }
          });
        return(filteredRecipes);
    }
}