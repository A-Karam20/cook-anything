import '../Styles/Modal.css';
import { LikeButton } from "../Components/UI/LikeButton";
import { DislikeButton } from "../Components/UI/DislikeButton";
import { BlogModel } from "./BlogModel";
import { MouseEventHandler, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';

export const Blog: React.FC<BlogModel> = ({header, date, paragraph, readMoreParagraph, link}) => {
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

        <div className="flex items-center justify-end absolute bottom-2 right-4">
          <LikeButton recipeId={0} likes={9999} isLiked={true} handleLike={(e) => {e.preventDefault()}} />
          <DislikeButton recipeId={0} dislikes={0} isDisliked={false} handleDislike={(e) => {e.preventDefault()}} />
        </div>
      </article>

      <Modal show={isModalOpen} onHide={closeModal} size="lg" scrollable className="my-modal">
        <Modal.Header closeButton>
          <Modal.Title>{header}</Modal.Title>
          <Button className="close" onClick={closeModal}></Button>
        </Modal.Header>
        <Modal.Body className="text-gray-800 text-lg font-medium mb-4 text-justify">
        {readMoreParagraph + " "}
        {link != "" ? <a className="text-green-500 underline" href={link}>{link}</a> : ""}
        </Modal.Body>
      </Modal>
    </>
  );
};