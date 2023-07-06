import {Navigate, useLocation } from "react-router-dom";
import HomeNavBar from "../../NavigationBar/HomeNavBar";
import { LogIn } from "../../Account/LogIn";
import { useAuth } from "../../Hooks/useAuth";

const LoginChecking = () => {
    const setAuth = useAuth();
    const location = useLocation();
    let getUrl : string = "";
    
    if(setAuth)
    {
      getUrl = location.pathname;
      const currentUrl = getUrl.toLowerCase();
      if(currentUrl === "/login")
      {
        return(<Navigate to={"/login/searchrecipes"}/>);
      }
    }

    return (<>
    <HomeNavBar/>
    <LogIn/>
    </>);
}

export default LoginChecking;