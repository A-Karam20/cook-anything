import {useState, MouseEventHandler, useEffect, MouseEvent} from 'react'
import { FaSearch } from 'react-icons/fa';
import { SideBar } from '../NavigationBar/SideBarContent';
import { Recipe } from '../Models/RecipeModel';
import { serverUrl } from '../Server/ServerUrl';
import axios from 'axios';
import { Client } from '../Models/ClientModel';
import { toast } from 'react-toastify';
import { Article } from '../Components/Article';

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
    setNotFound(false);
    if (clientInput !== "") {
      setInputIsEmpty(false);
      setSearchClicked(true);
      try {
        console.log(clientInput);
        axios.get(`https://localhost:7242/api/Recipe/$2/$${clientInput}`)
        .then(async (response) => {return await response.data})
        .then((data) => {
          if (!data) {
            setNotFound(true);
          } else {
            setRecipes(data.array_recipes);
          }
        })
        .catch(error => setNotFound(true))
      } catch (error) {
        setNotFound(true);
      }
      setSearchClicked(false);
    } else {
      setInputIsEmpty(true);
    }
    setSearchBarVisible(!isSearchBarVisible);
  };

  const handleLike: (event: MouseEvent , recipeId: string) => void = async (event, recipeId) => {
    event.preventDefault();  
    //if (clientString != null) {
      let state : string = "";
      const updatedRecipes = recipes?.map((recipe) => {
        if (recipe.id === recipeId) {
          recipe.isLiked = !recipe.isLiked;
          console.log(recipe.isLiked + recipe.id);
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
            state = "-1";
          }
        }

        return recipe;
      });

      const object = {
        StateValue : {state}
      }

      axios.patch(`https://localhost:7242/api/Recipe/$2/$${recipeId}/$${state}`, {})
        .then(async (response) => {
          return await response.data;
        })
        .then((data) => {
          if (!data) {
            toast.error("Couldn't find task");
          }
        })
        .catch((error) => {
          toast.error("An error occurred");
        });
  
      setRecipes(updatedRecipes);
  
      //const client: Client = JSON.parse(clientString);
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
            state = "-1";
          }
        }

        return recipe;
      });

      const object = {
        state : {state}
      }

      axios.patch(`https://localhost:7242/api/Recipe/$2/$${recipeId}/$${state}`, {})
        .then(async (response) => {
          return await response.data;
        })
        .then((data) => {
          if (!data) {
            toast.error("Couldn't find task");
          }
        })
        .catch((error) => {
          console.log(error.message);
          toast.error("An error occurred");
        });
  
      setRecipes(updatedRecipes);
  
      //const client: Client = JSON.parse(clientString);
  };

  const ShowRecipes: React.FC = () => {

    return (
      <main className="container mx-auto py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {notFound ? (
            <p>Tell me honestly... What did you search for? We found nothing.</p>
          ) : (
              
            recipes?.map((r) => (
              <Article
                key={r.id}
                recipeId={parseInt(r.id)}
                header={r.title}
                date="June 22, 2023"
                paragraph={r.servings}
                ingredients={r.ingredients}
                instructions={r.instructions}
                likes={r.likes}
                dislikes={r.dislikes}
                isLiked={r.isLiked}
                isDisliked={r.isDisliked}
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
        {notFound && searchClicked && <p>We couldn't find what you searched for...like really what did you search?</p>}
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


/*useEffect(() => {
      if (searchClicked) {
        const fetchRecipes = async () => {
          try {
            const response = await axios.get(`https://localhost:7242/api/Recipe/$1/$${clientInput}`);
            const data = response.data;
            if (!data) {
              setNotFound(true);
            } else {
              setRecipes(data.array_recipes);
            }
          } catch (error) {
            setNotFound(false);
          }
        };
        fetchRecipes();
        setSearchClicked(false);
      }
    }, [clientInput, searchClicked]);*/