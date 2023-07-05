import { ColumnModel } from "../Models/ColumnModel";
import { ClientRecipe } from "../Models/RecipeModel";

type Props = {
    recipes : ClientRecipe[],
    columns : ColumnModel[],
    columnOrder : string[]
}

export const initialData : Props = {
    recipes: [],
    columns: [
      {
        day: "1",
        id: "0",
        title: "Monday",
        recipesIds : ["0"]
      },
      {
        day: "2",
        id: "1",
        title: "Tuesday",
        recipesIds : []
      },
      {
          day: "3",
          id: "2",
          title: "Wednesday",
          recipesIds : []
      },
      {
          day: "4",
          id: "3",
          title: "Thursday",
          recipesIds : []
      },
      {
          day: "5",
          id: "4",
          title: "Friday",
          recipesIds : []
      },
      {
          day: "6",
          id: "5",
          title: "Saturday",
          recipesIds : []
      },
      {
          day: "7",
          id: "6",
          title: "Sunday",
          recipesIds : []
      },
  ],
  columnOrder: ["0", "1", "2", "3", "4", "5", "6"],
  };