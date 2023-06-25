import { LikeButton } from "./LikeButton";
import { DislikeButton } from "./DislikeButton";
import React, { MouseEvent } from 'react';

type Props = {
    header : string,
    date : string,
    paragraph : string,
    link : string
    likes : number,
    dislikes : number
    handleLike: (event: MouseEvent, recipeId: number) => void
    handleDislike: (event: MouseEvent, recipeId: number) => void
}

export const Article : React.FC<Props> = ({header, date, paragraph, link, likes, dislikes, handleLike, handleDislike}) => {
    return (
        <article className="bg-white p-6 rounded-lg shadow-md relative">
          <div className="relative">
            <h2 className="text-xl font-bold mb-2">{header}</h2>
            <p className="text-gray-600 mb-4">
              Published on <span className="font-semibold">{date}</span> by{" "}
              <span className="font-semibold">Antoine Karam</span>
            </p>
            <p className="text-gray-800">{paragraph}</p>
            <a href={link} className="text-green-500 hover:underline">
              Read more
            </a>
          </div>
    
        <div className="flex items-center justify-end absolute bottom-2 right-4">
        <LikeButton likes={likes} handleLike={handleLike}/>
        <DislikeButton dislikes={dislikes} handleDislike={handleDislike}/>
        </div>
        </article>
      );
}