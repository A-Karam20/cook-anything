import { Button, Modal } from "react-bootstrap";
import React, { MouseEvent, useState, MouseEventHandler } from 'react';
import { LikeButton } from "./UI/LikeButton";
import { DislikeButton } from "./UI/DislikeButton";
import { Ingredients } from "./UI/Ingredients";
import { Instructions } from "./UI/Instructions";
import axios from "axios";
import '../Styles/Modal.css';
import { ClientRecipe } from "../Models/RecipeModel";
import {toast} from "react-toastify";
import { Client } from "../Models/ClientModel";
import { serverUrl } from "../Server/ServerUrl";

type Props = {
  recipeId : number,
  header: string;
  date: string;
  paragraph: string;
  ingredients : string,
  instructions : string,
  likes: number;
  dislikes: number;
  isLiked : Boolean,
  isDisliked : Boolean,
  handleLike: (event: MouseEvent, recipeId: number) => void;
  handleDislike: (event: MouseEvent, recipeId: number) => void;
};

export const Article: React.FC<Props> = ({ recipeId, header, date, paragraph, likes, dislikes, isLiked, isDisliked, ingredients, instructions, handleLike, handleDislike }) => {
  const clientJson = localStorage.getItem('Client');
  const tokenJson = localStorage.getItem('Token');
  const storedClient : Client = clientJson ? JSON.parse(clientJson) : undefined;
  const storedToken = tokenJson ? JSON.parse(tokenJson) : undefined;
  
  const [isModalOpen, setIsModalOpen] = useState<boolean | undefined>(false);
  const [isSaveButtonClicked, setIsSaveButtonClicked] = useState<boolean>(false);
  const openModal: MouseEventHandler = (event) => {
    event.preventDefault();
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleSaveButton : MouseEventHandler = (event) => {
    event.preventDefault();
    setIsSaveButtonClicked(true);
  }

  const closeSaveModal = () => {
    setIsSaveButtonClicked(false);
}

const saveRecipeRequest : MouseEventHandler= (event) => {
  event.preventDefault();
  const recipe : ClientRecipe = {
    id : recipeId.toString(),
    title : header,
    ingredients : ingredients,
    servings : paragraph,
    instructions : instructions,
    clientId : 2,
    savedRecipeId : -1,
    category : "-1"
  }
  axios.post(`${serverUrl}/api/Recipe/$${storedClient.id}/$${event.currentTarget.getAttribute("name")}`, recipe, {
    headers: {
      'Authorization': `Bearer ${storedToken}`,
    }
  })
  .then(async (response) => {
    return await response.data;
  })
  .then((data) => {
    setIsSaveButtonClicked(false);
    if(!data) return toast.error("Couldn't save recipe");
    if(data) return toast.success("Recipe saved to calendar");
  })
  .catch((error) => {
    toast.error("An error occured while sending request");
    setIsSaveButtonClicked(false);
  })
}

  const days : Record<string,number> = {
    "monday" : 1,
    "tuesday" : 2,
    "wednesday" : 3,
    "thursday" : 4,
    "friday" : 5,
    "saturday" : 6,
    "sunday" : 7,
  }

  return (
    <>
      <article className="bg-white p-6 rounded-lg shadow-md relative mt-7">
        <div className="relative">
          <h2 className="text-xl font-bold mb-2">{header}</h2>
          <p className="text-gray-600 mb-4">
            Published on <span className="font-semibold">{date}</span> by{" "}
            <span className="font-semibold">Antoine Karam</span>
          </p>
          <p className="text-gray-800">{paragraph}</p>
          <button className="text-green-500 hover:underline" onClick={openModal}>
            Read more
          </button>
        </div>

        <div className="flex items-center justify-between absolute top-2 right-2">
      <button onClick={handleSaveButton} className="text-blue-500 px-2 py-2 rounded-lg">
      <i className="fas fa-save"></i>
      </button>
      </div>
        <div className="flex items-center justify-end absolute bottom-2 right-4">
          <LikeButton recipeId={recipeId} likes={likes} isLiked={isLiked} handleLike={handleLike} />
          <DislikeButton recipeId={recipeId} dislikes={dislikes} isDisliked={isDisliked} handleDislike={handleDislike} />
        </div>
      </article>

      <Modal show={isModalOpen} onHide={closeModal} size="lg" scrollable className="my-modal">
        <Modal.Header closeButton>
          <Modal.Title>{header}</Modal.Title>
          <Button className="close" onClick={closeModal}></Button>
        </Modal.Header>
        <Modal.Body>
          <Ingredients ingredients = {ingredients} recipeId={recipeId} />
          <Instructions instructions= {instructions} recipeId={recipeId} />
        </Modal.Body>
      </Modal>

      <Modal show={isSaveButtonClicked} onHide={closeSaveModal} size="lg" scrollable className="my-modal">
        <Modal.Header closeButton>
          <Modal.Title>Please select the day on which you would like to save your recipe</Modal.Title>
          <Button className="close" onClick={closeSaveModal}></Button>
        </Modal.Header>
        <Modal.Body>
        <div className="grid grid-cols-7 gap-4">
          {Object.entries(days).map(([key, value]) => (
            <button key={value} name={value.toString()} onClick={saveRecipeRequest} className="flex items-center justify-center w-24 h-24 rounded-lg bg-green-500 text-white">
              {key}
            </button>
          ))}
        </div>
        </Modal.Body>
      </Modal>
    </>
  );
};