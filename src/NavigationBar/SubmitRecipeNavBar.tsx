import { motion } from "framer-motion";
import { useState } from "react";

function SubmitRecipeNavBar() {  
  const [activeLink, setActiveLink] = useState("");
  const linkClassName = (link : string) => {
    return `text-black border border-black ml-5 ${
      activeLink === link ? "bg-gray-700 text-white" : "hover:bg-gray-700 hover:text-white"
    } px-3 py-2 rounded-md text-lg font-sans`
  };

  return (
    <nav className="bg-green-500">
      <div className="flex items-center justify-center h-20">
      <a href = "/LogIn/SubmitRecipeForm" className="absolute left-5 text-lg font-semibold text-slate-900">Submit Recipe</a>
          <a href="/LogIn/SearchRecipes" 
          className={linkClassName("Search Recipes")}
          onClick = {(e) => setActiveLink("Search Recipes")}>
            Search Recipes
          </a>
          <a href="/LogIn/Calendar" 
          className={linkClassName("calendar")}
          onClick = {(e) => setActiveLink("calendar")}>
            Calendar
          </a>
          <a href="/LogIn/Friends" 
          className={linkClassName("friends")}
          onClick = {(e) => setActiveLink("friends")}>
            Friends
          </a>
          <a href="/" 
          className={linkClassName("logout")}
          onClick = {(e) => setActiveLink("logout")}>
            Log Out
          </a>
      </div>
    </nav>
  );
}

export default SubmitRecipeNavBar;


/*<a href="/LogIn/Settings" 
          className={linkClassName("settings")}
          onClick = {(e) => setActiveLink("settings")}>
            Settings
          </a>*/