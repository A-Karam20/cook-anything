import React, {MouseEvent} from 'react';

type Props = {
    recipeId : number,
    dislikes : number,
    isDisliked : Boolean,
    handleDislike: (event: MouseEvent, recipeId: number) => void
}

export const DislikeButton : React.FC<Props>= ({dislikes, isDisliked, recipeId, handleDislike}) => {
    const onClick = (event : MouseEvent) => {
        handleDislike(event, recipeId);
    }

    const classColor : string = isDisliked ? "bg-red-500 text-white": "text-red-500 hover:text-red-700";

    return(
        <div className="flex items-center mr-2">
        <button onClick={onClick} className={classColor}>
        <i className="far fa-thumbs-down"></i>
        </button>
            <span className="ml-1">{dislikes}</span>
        </div>
    );
}