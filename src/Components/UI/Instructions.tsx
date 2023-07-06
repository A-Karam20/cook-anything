import React from "react";

type Props = {
    instructions : string
    recipeId : number
}

export const Instructions : React.FC<Props> = ({instructions, recipeId}) => {
    const orderedInstructions = instructions.split(". ");
    return(<>
    <h2 className="text-2xl font-bold mb-4 mt-4">Instructions</h2>
    <ol className="list-decimal space-y-2">
        {orderedInstructions.map(inst => <li key={recipeId++} className="ml-4 font-serif pl-2">{inst}</li>)}
    </ol>
    </>);
}