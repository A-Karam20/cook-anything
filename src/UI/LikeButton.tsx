import React, { MouseEvent } from 'react';

type Props = {
  likes: number,
  handleLike: (event: MouseEvent, recipeId: number) => void
};

export const LikeButton: React.FC<Props> = ({ likes, handleLike }) => {
  const onClick = (event: MouseEvent) => {
    const recipeId = 1; // Replace with the actual recipe ID
    handleLike(event, recipeId);
  };

  return (
    <div className="flex items-center mr-4">
      <button onClick={onClick} className="text-green-500 hover:text-green-700">
        <i className="far fa-thumbs-up"></i>
      </button>
      <span className="ml-1">{likes}</span>
    </div>
  );
};