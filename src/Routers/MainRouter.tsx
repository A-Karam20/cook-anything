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
import { MainPage } from "../Pages/MainPage";
import ProtectedRoutes from "../Authorization/ProtectedRoutes";

export const mainRouter = () => {
    return createBrowserRouter([
        {
            path: "/",
            element : <>
            <HomeNavBar/>
            <MainPage/>
            </>
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
            path: "/Aboutus",
            element : <>
            <HomeNavBar/>
            <AboutUs/>
            </>
        },
        {
            path: "/LogIn/SearchRecipes",
            element : <ProtectedRoutes/>
        },
        {
            path: "/LogIn/Calendar",
            element : <ProtectedRoutes/>
        },
        {
            path: "/LogIn/Friends",
            element : <ProtectedRoutes/>
        },
        {
            path: "/LogIn/SubmitRecipeForm",
            element : <ProtectedRoutes/>
        }
    ]);
}