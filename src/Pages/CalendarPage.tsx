import { useState, MouseEvent, useEffect } from "react";
import { Flex, Heading } from "@chakra-ui/react";
import Column from "../Components/UI/Column";
import { DragDropContext, DropResult} from "react-beautiful-dnd";
import axios from "axios";
import { ColumnModel } from "../Models/ColumnModel";
import { ClientRecipe } from "../Models/RecipeModel";
import {toast} from "react-toastify";
import { initialData } from "../InitialStates/InitialDataRecipe";
import { Client } from "../Models/ClientModel";
import { serverUrl } from "../Server/ServerUrl";

const Calendar = () => {
  const clientJson = localStorage.getItem('Client');
  const tokenJson = localStorage.getItem('Token');
  const storedClient : Client = clientJson ? JSON.parse(clientJson) : undefined;
  const storedToken = tokenJson ? JSON.parse(tokenJson) : undefined;

    type Props = {
        recipes : ClientRecipe[],
        columns : ColumnModel[],
        columnOrder : string[]
    }

  useEffect( () => {
    axios.get(`${serverUrl}/api/Calendar/$${storedClient.id}`, {
      headers: {
        'Authorization': `Bearer ${storedToken}`,
        'Content-Type': 'application/json'
      }
    })
    .then(async (response) => {return await response.data})
    .then((data) => {
      const recipes : ClientRecipe[] = data.array_recipes;
      const clientRecipes : Props = {
        recipes: recipes,
        columns: [
          {
            day: "1",
            id: "monday",
            title: "Monday",
            recipesIds : recipes.filter(recipe => recipe.category === "1").map(r => r.savedRecipeId.toString())
          },
          {
              day: "2",
              id: "tuesday",
              title: "Tuesday",
              recipesIds : recipes.filter(recipe => recipe.category === "2").map(r => r.savedRecipeId.toString())
          },
          {
              day: "3",
              id: "wednesday",
              title: "Wednesday",
              recipesIds : recipes.filter(recipe => recipe.category === "3").map(r => r.savedRecipeId.toString())
          },
          {
              day: "4",
              id: "thursday",
              title: "Thursday",
              recipesIds : recipes.filter(recipe => recipe.category === "4").map(r => r.savedRecipeId.toString())
          },
          {
              day: "5",
              id: "friday",
              title: "Friday",
              recipesIds : recipes.filter(recipe => recipe.category === "5").map(r => r.savedRecipeId.toString())
          },
          {
              day: "6",
              id: "saturday",
              title: "Saturday",
              recipesIds : recipes.filter(recipe => recipe.category === "6").map(r => r.savedRecipeId.toString())
          },
          {
              day: "7",
              id: "sunday",
              title: "Sunday",
              recipesIds : recipes.filter(recipe => recipe.category === "7").map(r => r.savedRecipeId.toString())
          },
      ],
      columnOrder: ["0", "1", "2", "3", "4", "5", "6"],
      };
      
      setState(clientRecipes);

    })
    .catch((error) => {
    })
  }, []);

  const [state, setState] = useState(initialData);

  const handleDelete : (event: MouseEvent , recipeId: string) => void = (event, recipeId) => {
    event.preventDefault();
    axios.delete(`${serverUrl}/api/Calendar/$${storedClient.id}/$${recipeId}`, {
      headers: {
        'Authorization': `Bearer ${storedToken}`,
        'Content-Type': 'application/json'
      }
    })
    .then(async (response) => {
      return await response.data;
    })
    .then((data) => {
      if(!data) return toast.error("Couldn't delete task");
    })
    .catch((error) => {
      toast.error("An error occured while sending request");
    })

    setState((prevState) => {
      const updatedRecipes = [ ...prevState.recipes ]; // array of tasks
      const updatedColumns = [ ...prevState.columns ]; // object of columns
  
      // Remove the task from the tasks object
      const indexOfTask = updatedRecipes.findIndex(recipe => recipe.savedRecipeId.toString() === recipeId);
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
    const patchTask = {
      recipeId : result.draggableId,
      clientId : storedClient.id,
      category : endColumn.day
    };
    axios.patch(`${serverUrl}/api/Calendar/$${storedClient.id}`, patchTask, {
      headers: {
        'Authorization': `Bearer ${storedToken}`,
        'Content-Type': 'application/json'
      }
    })
    .then(async (response) => {
      return await response.data;
    })
    .then((data) => {
      if(!data) return toast.error("Couldn't update task");
    })
    .catch((error) => {
      toast.error("An error occured while sending request");
    })

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
              const arrayOfRecipes= state.recipes.filter((recipe) => recipe?.savedRecipeId.toString() === recipeId);
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