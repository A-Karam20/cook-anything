import {Navigate, useLocation } from "react-router-dom";
import { Client } from "../Models/ClientModel";
import ClientNavBar from "../Pages/ClientPage";
import CalendarNavBar from "../NavigationBar/CalendarNavBar";
import Calendar from "../Pages/CalendarPage";
import SubmitRecipeNavBar from "../NavigationBar/SubmitRecipeNavBar";
import { SubmitRecipe } from "../Pages/SubmitRecipePage";
import FriendsNavBar from "../NavigationBar/FriendsNavBar";
import { Friends } from "../Pages/FriendsPage";
import HomeNavBar from "../NavigationBar/HomeNavBar";
import { LogIn } from "../Account/LogIn";

const useAuth = () => {
    const clientJson = localStorage.getItem('Client');
    const tokenJson = localStorage.getItem('Token');
    const storedClient : Client = clientJson ? JSON.parse(clientJson) : undefined;
    const storedToken = tokenJson ? JSON.parse(tokenJson) : undefined;

    if(storedClient && storedToken){
        return true;
    }
    else{
        return false;
    }
}

const ProtectedRoutes = () => {
    const setAuth = useAuth();
    const location = useLocation();
    let getUrl : string = "";

    console.log("Set Auth: " + setAuth);
    
    if(setAuth)
    {
      getUrl = location.pathname;
      const currentUrl = getUrl.toLowerCase();
      console.log(currentUrl);
      if(currentUrl === "/login/searchrecipes")
      {
        return(<ClientNavBar/>);
      }
      else if(currentUrl === "/login/calendar")
      {
        return(<>
        <CalendarNavBar/>
        <Calendar/>
        </>);
      }
      else if(currentUrl === "/login/friends")
      {
        return(<>
        <FriendsNavBar/>
        <Friends/>
        </>);
      }
      else if(currentUrl === "/login/submitrecipeform")
      {
        return(<>
        <SubmitRecipeNavBar/>
        <SubmitRecipe/>
        </>);
      }
    }

    return (<Navigate to="/login"/>);
}

export default ProtectedRoutes;