import { createBrowserRouter } from "react-router-dom";
import  HomeNavBar from "../NavigationBar/HomeNavBar";
import { LogIn } from "../Account/LogIn";
import { CreateAccount } from "../Account/CreateAccount";
import { AboutUs } from "../AboutUs/aboutUs";
import ClientNavBar from "../Pages/ClientPage";
import Calendar from "../Pages/CalendarPage";
import CalendarNavBar from "../NavigationBar/CalendarNavBar";
import FriendsNavBar from "../NavigationBar/FriendsNavBar";
import { Friends } from "../Pages/FriendsPage";
import SubmitRecipeNavBar from "../NavigationBar/SubmitRecipeNavBar";
import { SubmitRecipe } from "../Pages/SubmitRecipePage";

export const mainRouter = () => {
    return createBrowserRouter([
        {
            path: "/",
            element : <HomeNavBar/>
        },
        {
            path: "/login",
            element : <>
            <HomeNavBar/>
            <LogIn/>
            </>
        },
        {
            path: "/CreateAccount",
            element : <>
            <HomeNavBar/>
            <CreateAccount/>
            </>
        },
        {
            path: "/Login/SearchRecipes",
            element : <ClientNavBar/>
        },
        {
            path: "/Aboutus",
            element : <>
            <HomeNavBar/>
            <AboutUs/>
            </>
        },
        {
            path: "/LogIn/Calendar",
            element : <>
            <CalendarNavBar/>
            <Calendar/>
            </>
        },
        {
            path: "/LogIn/Friends",
            element : <>
            <FriendsNavBar/>
            <Friends/>
            </>
        },
        {
            path: "/LogIn/SubmitRecipeForm",
            element : <>
            <SubmitRecipeNavBar/>
            <SubmitRecipe/>
            </>
        }
    ]);
}