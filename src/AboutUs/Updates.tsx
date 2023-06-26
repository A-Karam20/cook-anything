import { Article } from "../UI/Article";
import React, { MouseEvent } from 'react';

type Props = {
    header : string,
    date : string,
    paragraph : string,
    link : string
}

const Articles : Props[] = [
    {
        header: "My first update",
        date : "June 21, 2023",
        paragraph : 'Working on the "about us" page',
        link : "/"
    },
    {
        header: "My Second update",
        date : "June 21, 2023",
        paragraph : 'Still Working on the "about us" page',
        link : "/"
    },
    {
        header: "My Third update",
        date : "June 21, 2023",
        paragraph : 'Finished working on the "about us" page',
        link : "/"
    }
];

export const ShowUpdates = () => {
    return(
        Articles.map(a => <Article header={a.header} date={a.date} paragraph={a.paragraph}  ingredients="Antoine" instructions="Just Do It" likes={0} dislikes={0} handleLike={(event: MouseEvent, recipeId: number) => {}} handleDislike={(event: MouseEvent, recipeId: number) => {}}></Article>)
    );
}