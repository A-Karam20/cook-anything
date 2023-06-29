import { Flex, Text } from "@chakra-ui/react";
import { Draggable } from 'react-beautiful-dnd';
import { Droppable } from "react-beautiful-dnd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark} from "@fortawesome/free-solid-svg-icons";
import {ColumnModel} from "../Models/ColumnModel";
import {MouseEvent, MouseEventHandler, useState} from 'react';
import { ClientRecipe } from "../Models/RecipeModel";
import { Button, Modal } from "react-bootstrap";
import { Ingredients } from "./Ingredients";
import { Instructions } from "./Instructions";

type Props = {
  column : ColumnModel,
  recipes : ClientRecipe[],
  onDelete: (event : MouseEvent, recipeId : string) => void
}

const Column : React.FC<Props> =  ({ column, recipes, onDelete }) => {
  const handleDelete = (event : MouseEvent, recipeId : string) => {
    onDelete(event, recipeId);
  };

  const [isModalOpen, setIsModalOpen] = useState<boolean | undefined>(false);
  const openModal: MouseEventHandler = (event) => {
    event.preventDefault();
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  
  return (
    <Flex
      rounded="3px"
      bg="beige"
      w="400px"
      flexDir="column"
      p="1rem"
      border="2px solid #4caf50" // Change border color of columns
      mr="1rem" // Add margin between columns
      boxShadow={recipes.length === 0 ? "none" : "0 0 10px rgba(0, 0, 0, 0.3)"} // Add shadow when column has tasks
    >
      <Flex
        align="center"
        h="fit-content"
        bg="transparent"
        rounded="3px 3px 0 0"
        px="1.5rem"
        mb="1.5rem"
        borderBottom="2px solid #4caf50" // Add horizontal line between title and panel
      >
        <Text fontSize="17px" fontWeight={600} color="black">
          {column.title}
        </Text>
      </Flex>

      <Droppable droppableId={column.id}>
        {(droppableProvided, droppableSnapshot) => (
          <Flex
            px="1.5rem"
            flex={1}
            flexDir="column"
            ref={droppableProvided.innerRef}
            {...droppableProvided.droppableProps}
            boxShadow={droppableSnapshot.isDraggingOver ? "0 2px 10px #4caf50" : "unset"} // Set background color of panel
            pt="0.5rem" // Add padding to top of tasks
          >
            {recipes.map((recipe, index) => (
              <div key={recipe.savedRecipeId}>
              <Draggable key={recipe.savedRecipeId} draggableId={recipe.savedRecipeId.toString()} index={index}>
                {(draggableProvided, draggableSnapshot) => (
                  <Flex
                    mb="1rem"
                    h="fit-content"
                    bg="White"
                    rounded="5px" // Add rounded corners to tasks
                    p="1rem" // Add padding to tasks
                    border="2px solid #4caf50" // Add deeppink border to tasks
                    outline="2px solid"
                    outlineColor={
                      draggableSnapshot.isDragging ? "White" : "transparent" // Change border color when dragging
                    }
                    boxShadow={
                      draggableSnapshot.isDragging ? "0 5px 10px rgba(0, 0, 0, 0.6)" : "unset"
                    }
                    ref={draggableProvided.innerRef}
                    {...draggableProvided.draggableProps}
                    {...draggableProvided.dragHandleProps}
                  >
                    <Text onClick={openModal} fontSize="15px" color="black"  fontFamily="Arial,sans-serif">
                      {recipe.title}</Text>
                    <FontAwesomeIcon
                      icon={faXmark}
                      onClick={(event) => handleDelete(event , recipe.savedRecipeId.toString())}
                      style={{ marginLeft: "auto", cursor: "pointer" }}
                    />
                  </Flex>
                )}
              </Draggable>
              <Modal show={isModalOpen} onHide={closeModal} size="lg" scrollable className="my-modal">
              <Modal.Header closeButton>
                <Modal.Title>{recipe.title}</Modal.Title>
                <Button className="close" onClick={closeModal}></Button>
              </Modal.Header>
              <Modal.Body>
                <Ingredients ingredients = {recipe.ingredients} recipeId={parseInt(recipe.id)} />
                <Instructions instructions= {recipe.instructions} recipeId={parseInt(recipe.id)} />
              </Modal.Body>
            </Modal>
              </div>       
            ))}
            {droppableProvided.placeholder}
          </Flex>
        )}
      </Droppable>
    </Flex>
  );
};

export default Column;