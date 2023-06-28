export type Recipe = {
    id : string,
    title : string,
    ingredients : string,
    servings : string,
    instructions : string,
    likes : number,
    dislikes : number,
    isLiked : Boolean,
    isDisliked : Boolean
}

export type ClientRecipe = {
    id : string,
    title : string,
    ingredients : string,
    servings : string,
    instructions : string,
    category : string,
    savedRecipeId : number,
    clientId : number
}