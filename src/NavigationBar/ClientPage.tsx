import {useState, MouseEventHandler, useEffect, MouseEvent} from 'react'
import { FaSearch } from 'react-icons/fa';
import { SideBar } from './SideBarContent';
import { Recipe } from '../Models/RecipeModel';
import { serverUrl } from '../Server/ServerUrl';
import axios from 'axios';
import { Client } from '../Models/ClientModel';
import { toast } from 'react-toastify';
import { Article } from '../UI/Article';

function ClientNavBar() {
  const clientString = localStorage.getItem('Client');

  const [isSideBarOpen, setSidebarOpen] = useState<Boolean>(false);
  const [isSearchBarVisible, setSearchBarVisible] = useState<Boolean>(false);
  const [clientInput, setClientInput] = useState<string>("");
  const [inputIsEmpty, setInputIsEmpty] = useState<Boolean>(true);
  const [recipes, setRecipes] = useState<Recipe[]>();
  const [notFound, setNotFound] = useState<Boolean>(false);
  const [searchClicked, setSearchClicked] = useState<Boolean>(false);

  const toggleSidebar : MouseEventHandler = (event) => {
    event.preventDefault();
    setSidebarOpen(!isSideBarOpen);
  };

  const toggleSearchBar :MouseEventHandler = (event) => {
    event.preventDefault();
    setSearchBarVisible(!isSearchBarVisible);
  };

  const handleSearch: MouseEventHandler = (event) => {
    event.preventDefault();
    if (clientInput !== "") {
      setInputIsEmpty(false);
      setSearchClicked(true);
    } else {
      setInputIsEmpty(true);
    }
    setClientInput("");
    setSearchBarVisible(!isSearchBarVisible);
  };

  const handleLike: (event: MouseEvent , recipeId: string) => void = async (event, recipeId) => {
    event.preventDefault();  
    //if (clientString != null) {
      let state : string = "";
      const updatedRecipes = recipes?.map((recipe) => {
        if (recipe.id === recipeId) {
          recipe.isLiked = !recipe.isLiked;
          const isLiked : Boolean = recipe.isLiked;
          const isDisliked : Boolean = recipe.isDisliked;
          if (isLiked) {
            if (isDisliked) {
              recipe.dislikes--;
              recipe.isDisliked = false;
            }
  
            recipe.likes++;
            state = "1";

          }  else if (!isLiked && !isDisliked) {
            recipe.likes--;
            state = "";
          }
        }

        return recipe;
      });
  
      setRecipes(updatedRecipes);
  
      //const client: Client = JSON.parse(clientString);
  
      /*axios.patch(`${serverUrl}/api/LogIn/Recipes/${client.id}/${recipeId}`, state)
        .then(async (response) => {
          return await response.data;
        })
        .then((data) => {
          if (!data) {
            toast.error("An error occurred");
          }
        })
        .catch((error) => {
          toast.error("An error occurred");
        });
    }*/
  };

  const handleDislike: (event: MouseEvent , recipeId: string) => void = (event, recipeId) => {
    event.preventDefault();
    //if (clientString != null) {
      let state : string = "";
      const updatedRecipes = recipes?.map((recipe) => {
        if (recipe.id === recipeId) {
          recipe.isDisliked = !recipe.isDisliked;
          const isDisliked = recipe.isDisliked;
          const isLiked = recipe.isLiked;
          if (isDisliked) {
            if (isLiked) {
              recipe.likes--;
              recipe.isLiked = false;
            }
  
            recipe.dislikes++;
            state = "0";

          }  else if (!isLiked && !isDisliked) {
            recipe.dislikes--;
            state = "";
          }
        }

        return recipe;
      });
  
      setRecipes(updatedRecipes);
  
      //const client: Client = JSON.parse(clientString);
  
      /*axios.patch(`${serverUrl}/api/LogIn/Recipes/${client.id}/${recipeId}`, state)
        .then(async (response) => {
          return await response.data;
        })
        .then((data) => {
          if (!data) {
            toast.error("An error occurred");
          }
        })
        .catch((error) => {
          toast.error("An error occurred");
        });
    }*/
  };

  const ShowRecipes: React.FC = () => {
    useEffect(() => {
      if (searchClicked) {
        const fetchRecipes = async () => {
          try {
            const response = await axios.get(`${serverUrl}/api/LogIn/${clientInput}`);
            const data = response.data;
            if (!data) {
              setNotFound(true);
            } else {
              setRecipes(data);
            }
          } catch (error) {
            setNotFound(false);
            setRecipes([
              {
                id: "1",
                title: "Supreme Chicken",
                ingredients: "Ingredients: rice,chicken,carry,sauce,etc...",
                servings: "Servings: 4 people",
                instructions: "Instructions: Just know man",
                likes: 10,
                dislikes: 0,
                isLiked : false,
                isDisliked : false
              },
              {
                id: "2",
                title: "Supreme Chicken",
                ingredients: "Ingredients: rice,chicken,carry,sauce,etc...",
                servings: "Servings: 4 people",
                instructions: "Instructions: Just know man",
                likes: 10,
                dislikes: 0,
                isLiked : false,
                isDisliked : false
              },
              {
                id: "3",
                title: "Supreme Chicken",
                ingredients: "Ingredients: rice,chicken,carry,sauce,etc...",
                servings: "Servings: 4 people",
                instructions: "Instructions: Just know man",
                likes: 10,
                dislikes: -1,
                isLiked : false,
                isDisliked : false
              },
              {
                id: "4",
                title: "Chicken Biryani",
                ingredients: "2 cups basmati rice * 500 grams chicken, cut into pieces * 1 large onion, thinly sliced * 2 tomatoes, chopped * 2 tablespoons biryani masala powder * 1 tablespoon ginger-garlic paste * 1/2 cup plain yogurt * 1/4 cup chopped mint leaves * 1/4 cup chopped coriander leaves * 1 teaspoon turmeric powder * 1 teaspoon red chili powder * 1 teaspoon cumin seeds * 4 green cardamom pods * 4 cloves * 2-inch cinnamon stick * 1 bay leaf * 4 cups water * 4 tablespoons ghee (clarified butter) or oil * Salt to taste",
                servings: "Servings: 4 people",
                instructions: "Rinse the basmati rice under cold water until the water runs clear. * In a large pan, heat ghee (clarified butter) or oil over medium heat. * Add the cumin seeds, green cardamom pods, cloves, cinnamon stick, and bay leaf. Sauté for a minute until fragrant. * Add the sliced onions and cook until they turn golden brown. * Add the ginger-garlic paste and cook for another minute. * Add the chicken pieces and cook until they are lightly browned. * Add the chopped tomatoes and cook until they become soft and mushy. * Add the biryani masala powder, turmeric powder, red chili powder, and salt. Mix well. * Add the plain yogurt and mix until well combined. * Add the chopped mint leaves and coriander leaves. Mix well. * Add the rinsed basmati rice and gently stir to coat the rice with the masala mixture. * Pour in the water and bring it to a boil. * Reduce the heat to low, cover the pan with a tight-fitting lid, and let the biryani simmer for about 20 minutes or until the rice is cooked and the flavors have melded together. * Remove from heat and let it rest for 5 minutes. * Fluff the rice with a fork and serve hot.",
                likes: 10,
                dislikes: 0,
                isLiked : false,
                isDisliked : false
              }
            ]);
          }
        };
        fetchRecipes();
        setSearchClicked(false);
      }
    }, [clientInput, searchClicked]);

  
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
                handleLike={(event) => handleLike(event, r.id)}
                handleDislike={(event) => handleDislike(event, r.id)}
              ></Article>
            ))
          )}
          </div>
      </main>
    );
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <SideBar isSideBarOpen={isSideBarOpen} />
      {/* Main content */}
      <div className="flex-grow">
        {/* Navbar */}
        <nav className="bg-green-500 px-4 py-10 flex justify-between items-center">
          <h1 className="text-black text-xl font-bold mx-auto">Cook Anything</h1>
          {/* Search bar icon */}
          <button
            className="text-black hover:text-gray-300 focus:outline-none"
            onClick={toggleSearchBar}
          >
            <FaSearch className="w-6 h-6" />
          </button>
        </nav>

        {/* Search bar */}
        {isSearchBarVisible && (
          <div className="px-4 py-2 bg-white">
            <input
              type="text"
              value={clientInput}
              onChange={(e) => setClientInput(e.target.value)}
              className="border border-gray-300 rounded px-2 py-1 w-full"
              placeholder="Enter your search query"
            />
            <button
              onClick={handleSearch}
              className="bg-green-500 text-white px-4 py-1 mt-2 rounded"
            >
              Search
            </button>
          </div>
        )}

        {/* Main content of the website */}
        {!inputIsEmpty && <ShowRecipes/>}
      </div>

      {/* Button to toggle the sidebar */}
      <button
        className="fixed top-8 left-4 bg-black text-green-500 p-2 rounded-full cursor-pointer"
        onClick={toggleSidebar}
      >
        {/* Sidebar toggle icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          {/* SVG path for sidebar toggle icon */}
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>
    </div>
  );
}

export default ClientNavBar;