import axios from 'axios';
import { serverUrl } from '../Server/ServerUrl';
import { useState, useEffect, MouseEvent } from 'react';
import { Recipe } from '../Models/RecipeModel';
import { Article } from '../UI/Article';

type Props = {
  recipeName: string,
  _recipes : Recipe[] | undefined
};

export const ShowRecipes: React.FC<Props> = ({ recipeName, _recipes }) => {
  const [recipes, setRecipes] = useState<Recipe[] | undefined>(_recipes);
  const [notFound, setNotFound] = useState<boolean>(false);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get(`${serverUrl}/api/LogIn/${recipeName}`);
        const data = response.data;
        if (!data) {
          setNotFound(true);
        } else {
          setRecipes(data);
        }
      } catch (error) {
        setNotFound(false);
        setRecipes(
            [
                {
                    id : "1",
                    title : "Supreme Chicken",
                    ingredients : "Ingredients: rice,chicken,carry,sauce,etc...",
                    servings : "Servings: 4 people",
                    instructions : "Instructions: Just know man",
                    likes : 10,
                    dislikes : 0,
                    isLiked : false,
                    isDisliked : false
                },
                {
                    id : "2",
                    title : "Supreme Chicken",
                    ingredients : "Ingredients: rice,chicken,carry,sauce,etc...",
                    servings : "Servings: 4 people",
                    instructions : "Instructions: Just know man",
                    likes : 10,
                    dislikes : 0,
                    isLiked : false,
                    isDisliked : false
                },
                {
                    id : "3",
                    title : "Supreme Chicken",
                    ingredients : "Ingredients: rice,chicken,carry,sauce,etc...",
                    servings : "Servings: 4 people",
                    instructions : "Instructions: Just know man",
                    likes : 10,
                    dislikes : -1,
                    isLiked : false,
                    isDisliked : false
                }
            ]
          );
      }
    };

    fetchRecipes();
  }, [recipeName]);

  return (
    <main className="container mx-auto py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {notFound ? (
          <p>Tell me honestly... What did you search for? We found nothing.</p>
        ) : (
            
          recipes?.map((r) => (
            <Article
              key={r.id}
              header={r.title}
              date="June 22, 2023"
              paragraph={r.servings}
              ingredients={r.ingredients}
              instructions={r.instructions}
              likes={r.likes}
              dislikes={r.dislikes}
              handleLike={(event: MouseEvent, recipeId: number) => {}}
              handleDislike={(event: MouseEvent, recipeId: number) => {}}
            ></Article>
          ))
        )}
        </div>
    </main>
  );
};