import React from "react";

type Props = {
    ingredients : string
    recipeId : number
}

export const Ingredients : React.FC<Props> = ({ingredients, recipeId}) => {
    const orderedIngredients = ingredients.split(";");
    return(<>
    <h2 className="text-2xl font-bold mb-4 mt-4">Ingredients</h2>
    <ol className="list-decimal ml-6 space-y-2">
        {orderedIngredients.map(ing => <li key={recipeId++} className="font-serif pl-2">{ing}</li>)}
    </ol>
    </>);
}