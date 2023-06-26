import React from "react";

type Props = {
    instructions : string
}

export const Instructions : React.FC<Props> = ({instructions}) => {
    const orderedIngredients = instructions.split(" * ");
    return(<>
    <h2 className="text-2xl font-bold mb-4 mt-4">Instructions</h2>
    <ol className="list-decimal space-y-2">
        {orderedIngredients.map(inst => <li className="ml-4 font-serif pl-2">{inst}</li>)}
    </ol>
    </>);
}