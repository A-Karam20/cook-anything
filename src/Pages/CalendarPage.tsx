import { useState, MouseEvent, useEffect } from "react";
import { Flex, Heading } from "@chakra-ui/react";
import Column from "../UI/Column";
import { DragDropContext, DropResult} from "react-beautiful-dnd";
import axios from "axios";
import { ColumnModel } from "../Models/ColumnModel";
import { Recipe } from "../Models/RecipeModel";

const Calendar = () => {

    type Props = {
        recipes : Recipe[],
        columns : ColumnModel[],
        columnOrder : string[]
    }

  useEffect( () => {
        const clientRecipes : Props = {
          recipes: [{
            id: "0",
            title: "Supreme Chicken",
            ingredients: "Ingredients: rice,chicken,carry,sauce,etc...",
            servings: "Servings: 4 people",
            instructions: "Instructions: Just know man",
            likes: 10,
            dislikes: 0,
            isLiked : false,
            isDisliked : false
          },
          {
            id: "1",
            title: "Supreme Chicken",
            ingredients: "Ingredients: rice,chicken,carry,sauce,etc...",
            servings: "Servings: 4 people",
            instructions: "Instructions: Just know man",
            likes: 10,
            dislikes: 0,
            isLiked : false,
            isDisliked : false
          },
          {
            id: "2",
            title: "Supreme Chicken",
            ingredients: "Ingredients: rice,chicken,carry,sauce,etc...",
            servings: "Servings: 4 people",
            instructions: "Instructions: Just know man",
            likes: 10,
            dislikes: 0,
            isLiked : false,
            isDisliked : false
          },
          {
            id: "3",
            title: "Supreme Chicken",
            ingredients: "Ingredients: rice,chicken,carry,sauce,etc...",
            servings: "Servings: 4 people",
            instructions: "Instructions: Just know man",
            likes: 10,
            dislikes: 0,
            isLiked : false,
            isDisliked : false
          },
          {
            id: "4",
            title: "Supreme Chicken",
            ingredients: "Ingredients: rice,chicken,carry,sauce,etc...",
            servings: "Servings: 4 people",
            instructions: "Instructions: Just know man",
            likes: 10,
            dislikes: 0,
            isLiked : false,
            isDisliked : false
          },
          {
            id: "5",
            title: "Supreme Chicken",
            ingredients: "Ingredients: rice,chicken,carry,sauce,etc...",
            servings: "Servings: 4 people",
            instructions: "Instructions: Just know man",
            likes: 10,
            dislikes: 0,
            isLiked : false,
            isDisliked : false
          },
          {
            id: "6",
            title: "Supreme Chicken",
            ingredients: "Ingredients: rice,chicken,carry,sauce,etc...",
            servings: "Servings: 4 people",
            instructions: "Instructions: Just know man",
            likes: 10,
            dislikes: 0,
            isLiked : false,
            isDisliked : false
          },
        ],
          columns: [
            {
              day: "1",
              id: "monday",
              title: "Monday",
              recipesIds : ["0"]
            },
            {
                day: "2",
                id: "tuesday",
                title: "Tuesday",
                recipesIds : ["1"]
            },
            {
                day: "3",
                id: "wednesday",
                title: "Wednesday",
                recipesIds : ["2"]
            },
            {
                day: "4",
                id: "thursday",
                title: "Thursday",
                recipesIds : ["3"]
            },
            {
                day: "5",
                id: "friday",
                title: "Friday",
                recipesIds : ["4"]
            },
            {
                day: "6",
                id: "saturday",
                title: "Saturday",
                recipesIds : ["5"]
            },
            {
                day: "7",
                id: "sunday",
                title: "Sunday",
                recipesIds : ["6"]
            },
        ],
        columnOrder: ["0", "1", "2", "3", "4", "5", "6"],
        };
        
        setState(clientRecipes);
  }, []);
  
  const initialData : Props = {
    recipes: [{
      id: "0",
      title: "Supreme Chicken",
      ingredients: "Ingredients: rice,chicken,carry,sauce,etc...",
      servings: "Servings: 4 people",
      instructions: "Instructions: Just know man",
      likes: 10,
      dislikes: 0,
      isLiked : false,
      isDisliked : false
    },],
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

  const [state, setState] = useState(initialData);

  const handleDelete : (event: MouseEvent , recipeId: string) => void = (event, recipeId) => {
    event.preventDefault();
    setState((prevState) => {
      const updatedRecipes = [ ...prevState.recipes ]; // array of tasks
      const updatedColumns = [ ...prevState.columns ]; // object of columns
  
      // Remove the task from the tasks object
      const indexOfTask = updatedRecipes.findIndex(recipe => recipe.id === recipeId);
      updatedRecipes.splice(indexOfTask,1);
  
      // Remove the task from all columns
      updatedColumns.map((columnId) => {
        const column = columnId;
        column.recipesIds = column.recipesIds.filter( (_recipeid)  => _recipeid !== recipeId);
      });
  
      return {
        ...prevState,
        recipes: updatedRecipes,
        columns: updatedColumns,
      };
    });
};

const onDragEnd = (result: DropResult) => {
  const { destination, source } = result;

  if (!destination) {
    return;
  }

  if (
    destination.droppableId === source.droppableId &&
    destination.index === source.index
  ) {
    return;
  }

  const startColumn = state.columns.find((col) => col.id === source.droppableId);
  const endColumn = state.columns.find((col) => col.id === destination.droppableId);

  if (startColumn === endColumn && startColumn) {
    console.log("Oyy");
    // If the item is dropped in the same column
    const newRecipeIds = Array.from(startColumn.recipesIds);
    newRecipeIds.splice(source.index, 1);
    newRecipeIds.splice(destination.index, 0, result.draggableId);

    const newColumn = {
      ...startColumn,
      recipesIds: newRecipeIds,
    };

    const updatedColumns = state.columns.map((col) => {
      if (col.id === newColumn.id) {
        return newColumn;
      }
      return col;
    });

    const newState = {
      ...state,
      columns: updatedColumns,
    };

    setState(newState);
  } else if (startColumn && endColumn) {
    const startRecipeIds = Array.from(startColumn.recipesIds);
    startRecipeIds.splice(source.index, 1);
    const newStartColumn = {
      ...startColumn,
      recipesIds: startRecipeIds,
    };

    const endRecipeIds = Array.from(endColumn.recipesIds);
    endRecipeIds.splice(destination.index, 0, result.draggableId);
    const newEndColumn = {
      ...endColumn,
      recipesIds: endRecipeIds,
    };

    const updatedColumns = state.columns.map((col) => {
      if (col.id === newStartColumn.id) {
        return newStartColumn;
      }
      if (col.id === newEndColumn.id) {
        return newEndColumn;
      }
      return col;
    });

    console.log(updatedColumns);

    const newState = {
      ...state,
      columns: updatedColumns,
    };
    
    setState(newState);
  }
};
  return (
    <div>
    <DragDropContext onDragEnd={onDragEnd}>
      <Flex
        flexDir="column"
        bg="main-bg"
        minH="100vh"
        w="full"
        color="white-text"
        pb="2rem"
      >
        <Flex py="4rem" flexDir="column" align="center">
          <Heading fontSize="3xl" fontWeight={600}>
          </Heading>
        </Flex>

        <Flex justify="space-between" px="4rem">
          {state.columnOrder.map((columnId) => {
            const column = state.columns[parseInt(columnId)];
            const getRecipe = (recipeId : string) => {
              const arrayOfRecipes= state.recipes.filter((recipe) => recipe.id === recipeId);
              return arrayOfRecipes[0];
            }

            const recipes = column.recipesIds.map((recipeId) => getRecipe(recipeId));

            return (
              <Column key={column.id} column={column} recipes={recipes} onDelete={handleDelete} />
            );
          })}
        </Flex>
      </Flex>
    </DragDropContext>
    </div>
  );
};

export default Calendar;