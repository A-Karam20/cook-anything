import {useState, MouseEventHandler, useEffect, useRef, MouseEvent} from 'react'
import { FaSearch } from 'react-icons/fa';
import { SideBar } from '../NavigationBar/SideBarContent';
import { Recipe } from '../Models/RecipeModel';
import axios from 'axios';
import { Client } from '../Models/ClientModel';
import { toast } from 'react-toastify';
import { Article } from '../Components/Article';
import { filter_A_Z } from '../FilteringMethods/Filter_A-Z';
import { filter_Z_A } from '../FilteringMethods/Filter-Z_A';
import { filter_Top_Likes } from '../FilteringMethods/Filter_TopLikes';
import { filter_Top_Dislikes } from '../FilteringMethods/Filter_TopDislikes';
import { serverUrl } from '../Server/ServerUrl';

function ClientNavBar() {
  const clientJson = localStorage.getItem('Client');
  const tokenJson = localStorage.getItem('Token');
  const storedClient : Client = clientJson ? JSON.parse(clientJson) : undefined;
  const storedToken = tokenJson ? JSON.parse(tokenJson) : undefined;

  const [isSideBarOpen, setSidebarOpen] = useState<Boolean>(false);
  const [isSearchBarVisible, setSearchBarVisible] = useState<Boolean>(false);
  const [clientInput, setClientInput] = useState<string>("");
  const [inputIsEmpty, setInputIsEmpty] = useState<Boolean>(true);
  const [recipes, setRecipes] = useState<Recipe[]>();
  const [randomRecipes, setRandomRecipes] = useState<Recipe[]>();
  const [currentRecipes, setCurrentRecipes] = useState<Recipe[]>();
  const [min, setMin] = useState<number>(0);
  const [max, setMax] = useState<number>(0);
  const [notFound, setNotFound] = useState<Boolean>(false);
  const [searchClicked, setSearchClicked] = useState<Boolean>(false);
  const [isNextDisabled, setIsNextDisabled] = useState<boolean | undefined>(false);
  const [isPreviousDisabled, setIsPreviousDisabled] = useState<boolean | undefined>(true);
  const [sortBy, setSortBy] = useState<string>('');
  const [filteredRecipes, setFilteredRecipes] = useState<Recipe[]>();

  const [recipesChanged, setRecipesChanged] = useState<boolean>(false);
  //const inputRef = useRef<HTMLInputElement | null>(null);

  const toggleSidebar : MouseEventHandler = (event) => {
    event.preventDefault();
    setSidebarOpen(!isSideBarOpen);
  };

  const toggleSearchBar :MouseEventHandler = (event) => {
    event.preventDefault();
    //console.log(inputRef.current);
    //if(inputRef.current) inputRef.current.focus();
    setSearchBarVisible(!isSearchBarVisible);
  };

  const handleSearch: MouseEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    setNotFound(false);
    setInputIsEmpty(true);
    if (clientInput !== "") {
      setInputIsEmpty(false);
      setSearchClicked(true);
        axios.get(`${serverUrl}/api/Recipe/$${storedClient.id}/$${clientInput}`, {
          validateStatus: function (status) {
            return (status >= 200 && status < 300) || (status === 404)
          },
          headers: {
            'Authorization': `Bearer ${storedToken}`,
          }
        })
        .then(async (response) => {return await response.data})
        .then((data) => {
          if (!data) {
            setRecipes(undefined);
            setNotFound(true);
          } else {
            setSortBy('');
            setRecipes(data.array_recipes);
            setIsPreviousDisabled(true);
            setMin(0);
            if(9 >data.array_recipes.length)
            {
              setIsNextDisabled(true);
              setMax(data.array_recipes.length);
            }
            else
            {
              setIsNextDisabled(false);
              setMax(9);
            }
            setFilteredRecipes(undefined);
            setRecipesChanged(!recipesChanged);
          }
        })
        .catch(error => setNotFound(true))
    } else {
      setRecipes(undefined);
      setRecipesChanged(true);
      setInputIsEmpty(true);
      //setRecipes(randomRecipes);
    }
    setSearchBarVisible(!isSearchBarVisible);
  };

  useEffect(() => {
    if(filteredRecipes && recipes)
    {
      const _currentRecipes : Recipe[] = [];
            for(let i=min; i<max; i++)
            {
              _currentRecipes.push(filteredRecipes[i]);
            }            
            setCurrentRecipes(_currentRecipes);
    }
    else if(recipes)
    {
      const _currentRecipes : Recipe[] = [];
            for(let i=min; i<max; i++)
            {
              _currentRecipes.push(recipes[i]);
            }            
            setCurrentRecipes(_currentRecipes);
    }
  }, [max, filteredRecipes, recipesChanged]);

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
            state = "-1";
          }
        }

        return recipe;
      });

      axios.patch(`${serverUrl}/api/Recipe/$${storedClient.id}/$${recipeId}/$${state}`, {}, {
        headers: {
          'Authorization': `Bearer ${storedToken}`,
          'Content-Type': 'application/json'
        }
      })
        .then(async (response) => {
          return await response.data;
        })
        .then((data) => {
          if (!data) {
            toast.error("Couldn't find recipe");
          }
        })
        .catch((error) => {
          toast.error("An error occurred");
        });
  
      setRecipes(updatedRecipes);  
  };

  const handleDislike: (event: MouseEvent , recipeId: string) => void = (event, recipeId) => {
    event.preventDefault();
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

      axios.patch(`${serverUrl}/api/Recipe/$${storedClient.id}/$${recipeId}/$${state}`, {}, {
        headers: {
          'Authorization': `Bearer ${storedToken}`,
          'Content-Type': 'application/json'
        }
      })
        .then(async (response) => {
          return await response.data;
        })
        .then((data) => {
          if (!data) {
            toast.error("Couldn't find recipe");
          }
        })
        .catch((error) => {
          toast.error("An error occurred");
        });
  
      setRecipes(updatedRecipes);  
  };

  const handlePrevious : MouseEventHandler = (event) => {
    event.preventDefault();
    setMax(min);
    if(recipes)
    {
      if(min - 9 > 0)
      {
        setMin(min - 9);
      }
      else
      {
        setIsPreviousDisabled(true);
        setMin(0);
      }
      setIsNextDisabled(false);
    }
  }

  const handleNext : MouseEventHandler = (event) => {
    event.preventDefault();
    setMin(max);
    if(recipes)
    {
      if(max + 9 > recipes.length)
      {
        setMax(recipes.length);
        setIsNextDisabled(true);
      }
      else
      {
        setMax(max+9);
      }
      setIsPreviousDisabled(false);
    }
  }

  const ShowRecipes: React.FC = () => {

    return (
      <main className="container mx-auto py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {notFound ? (
            <p>Tell me honestly... What did you search for? We found nothing.</p>
          ) : (
              
            currentRecipes?.map((r) => (
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

  /*useEffect(() => {
    axios.get(`${serverUrl}/api/RandomRecipes/$${storedClient.id}`)
    .then(async (response) => {
      return await response.data;
    })
    .then((data) => {
      if(!data) return;

      const _randomRecipes : Recipe[] = data.random_recipes;
      setRandomRecipes(_randomRecipes);
      setRecipes(_randomRecipes);
      console.log(data.random_recipes);
    })
    .catch((error) => {
      console.log(error);
      toast.error("An error occured while sending request");
    })
  }, [])

  const ShowRandomRecipes: React.FC = () => {
    return (
      <main className="container mx-auto py-8">
          <h2 className="text-2xl font-bold mb-4">Random Recipes</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">      
            {randomRecipes?.map((r) => (
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
            ))}
          </div>
      </main>
    );
  };*/

  return (
    <div className="flex min-h-screen bg-gray-100">
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
            <form onSubmit={handleSearch}>
            <input
              type="text"
              value={clientInput}
              onChange={(e) => setClientInput(e.target.value)}
              className="border border-green-500 rounded px-2 py-1 w-full"
              placeholder="Enter your search query"
              onBlur={() => setSearchBarVisible(false)} 
              //ref={inputRef}
            />
            </form>
          </div>
        )}

        {/* Main content of the website */}
        {!inputIsEmpty && <ShowRecipes/>}
        <div className="navigation flex justify-end mr-8">
        {!inputIsEmpty && currentRecipes && !isPreviousDisabled && !notFound && 
          <button onClick={handlePrevious} disabled={isPreviousDisabled} className="previous-button bg-green-400 hover:bg-green-500 text-white font-bold py-2 px-4 rounded-l">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-5 w-5">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
          </svg>
          Previous
        </button>}
          {!inputIsEmpty && currentRecipes && !isNextDisabled && !notFound && 
          <button onClick={handleNext} disabled={isNextDisabled} className="next-button bg-green-400 hover:bg-green-500 text-white font-bold py-2 px-4 rounded-r">
          Next
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-5 w-5">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>}
      </div>
      {!inputIsEmpty && currentRecipes && !notFound && 
      <div className={`absolute top-20 mt-10 right-4 ${isSearchBarVisible ? 'translate-y-14' : ''}`}>
        <label className="mr-5" htmlFor="sort-by">Sort By:</label>
      <select
        id="sort-by"
        value={sortBy}
        onChange={(e) => {
          setSortBy(e.target.value);
          setFilteredRecipes(():Recipe[] | undefined => {
            switch(e.target.value)
            {
              case "1":
                return filter_A_Z(recipes);       
              case "2":
                return filter_Z_A(recipes);
              case "3":
                return filter_Top_Likes(recipes);
              case "4":
                return filter_Top_Dislikes(recipes);
              default :
                return undefined;
            }
          })

          if(recipes)
          {
            setIsPreviousDisabled(true);
            setMin(0);
            if(9 >recipes.length)
            {
              setIsNextDisabled(true);
              setMax(recipes.length);
            }
            else
            {
              setIsNextDisabled(false);
              setMax(9);
            }
          }
        }}
        className="border border-gray-300 rounded px-2 py-1"
      >
        <option value="">- none -</option>
        <option value="1">Title: A-Z</option>
        <option value="2">Title: Z-A</option>
        <option value="3">Like: From top liked</option>
        <option value="4">Dislike: From top disliked</option>
      </select>
        </div>}

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