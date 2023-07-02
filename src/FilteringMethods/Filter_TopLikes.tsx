import { Recipe } from "../Models/RecipeModel";

export function filter_Top_Likes( recipes : Recipe[] | undefined) : Recipe[] | undefined  {
    if(recipes)
    {
        const copiedArray = Array.from(recipes);
        const filteredRecipes: Recipe[] = copiedArray.sort((a, b) => {
            if (a.likes === b.likes) {
              return a.title.toLowerCase().localeCompare(b.title.toLowerCase());
            } else {
              return b.likes - a.likes;
            }
          });
        return(filteredRecipes);
    }
}