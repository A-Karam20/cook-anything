import { createBrowserRouter } from "react-router-dom";
import  HomeNavBar from "../NavigationBar/HomeNavBar";
import { CreateAccount } from "../Account/CreateAccount";
import { AboutUs } from "../AboutUs/AboutUsPage";
import { MainPage } from "../Pages/MainPage";
import ProtectedRoutes from "../Components/Authorization/ProtectedRoutes";
import LoginChecking from "../Components/Authorization/LogInChecking";

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
            element : <LoginChecking/>
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