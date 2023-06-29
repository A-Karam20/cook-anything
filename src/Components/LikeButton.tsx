import React, { MouseEvent } from 'react';

type Props = {
  likes: number,
  isLiked : Boolean,
  recipeId : number,
  handleLike: (event: MouseEvent, recipeId: number) => void
};

export const LikeButton: React.FC<Props> = ({ likes, isLiked, recipeId, handleLike }) => {
  const onClick = (event: MouseEvent) => {
    handleLike(event, recipeId);
  };

  const classColor : string = isLiked ? "text-green-500": "text-green-500 hover:text-green-700";
  const buttonStyle : string = isLiked ? "fas fa-thumbs-up" : "far fa-thumbs-up";

  return (
    <div className="flex items-center mr-4">
      <button onClick={onClick} className={classColor}>
        <i className={buttonStyle}></i>
      </button>
      <span className="ml-1">{likes}</span>
    </div>
  );
};