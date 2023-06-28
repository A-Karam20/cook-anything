import { Button, Modal } from "react-bootstrap";
import React, { MouseEvent, useState, MouseEventHandler } from 'react';
import { LikeButton } from "./LikeButton";
import { DislikeButton } from "./DislikeButton";
import { Ingredients } from "./Ingredients";
import { Instructions } from "./Instructions";
import './Modal.css';

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
  const [isModalOpen, setIsModalOpen] = useState<boolean | undefined>(false);
  const openModal: MouseEventHandler = (event) => {
    event.preventDefault();
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <article className="bg-white p-6 rounded-lg shadow-md relative">
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
      <button className=" hover:bg-green-500 text-white px-3 py-2 rounded-lg">
      <i className="fas fa-save"></i> Save
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
    </>
  );
};