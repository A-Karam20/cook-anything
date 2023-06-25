import React, {MouseEvent} from 'react';

type Props = {
    dislikes : number,
    handleDislike: (event: MouseEvent, recipeId: number) => void
}

export const DislikeButton : React.FC<Props>= ({dislikes,handleDislike}) => {
    const onClick = (event : MouseEvent) => {
        const recipeId = 1; // Replace with the actual recipe ID
        handleDislike(event, recipeId);
    }
    return(
        <div className="flex items-center mr-2">
        <button onClick={onClick} className="text-red-500 hover:text-red-700">
        <i className="far fa-thumbs-down"></i>
        </button>
            <span className="ml-1">{dislikes}</span>
        </div>
    );
}