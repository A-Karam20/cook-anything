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

  const classColor : string = isLiked ? "bg-green-500 text-white": "text-green-500 hover:text-green-700";

  return (
    <div className="flex items-center mr-4">
      <button onClick={onClick} className={classColor}>
        <i className="far fa-thumbs-up"></i>
      </button>
      <span className="ml-1">{likes}</span>
    </div>
  );
};