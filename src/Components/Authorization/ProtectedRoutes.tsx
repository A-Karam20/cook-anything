import {Navigate, useLocation } from "react-router-dom";
import ClientNavBar from "../../Pages/ClientPage";
import CalendarNavBar from "../../NavigationBar/CalendarNavBar";
import Calendar from "../../Pages/CalendarPage";
import SubmitRecipeNavBar from "../../NavigationBar/SubmitRecipeNavBar";
import { SubmitRecipe } from "../../Pages/SubmitRecipePage";
import FriendsNavBar from "../../NavigationBar/FriendsNavBar";
import { Friends } from "../../Pages/FriendsPage";
import { useAuth } from "../../Hooks/useAuth";

const ProtectedRoutes = () => {
    const setAuth = useAuth();
    const location = useLocation();
    let getUrl : string = "";
    
    if(setAuth)
    {
      getUrl = location.pathname;
      const currentUrl = getUrl.toLowerCase();
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