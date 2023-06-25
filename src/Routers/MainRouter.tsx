import { createBrowserRouter } from "react-router-dom";
import  HomeNavBar from "../NavigationBar/MainPage";
import { LogIn } from "../Account/LogIn";
import { CreateAccount } from "../Account/CreateAccount";
import { AboutUs } from "../AboutUs/aboutUs";
import ClientNavBar from "../NavigationBar/ClientPage";
import Calendar from "../Pages/CalendarPage";

export const mainRouter = () => {
    return createBrowserRouter([
        {
            path: "/",
            element : <HomeNavBar/>
        },
        {
            path: "/login",
            /*element : <>
            <HomeNavBar/>
            <LogIn/>
            </>*/
            element : <ClientNavBar/>
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
            path: "/LogIn/Calendar",
            element : <>
            <Calendar/>
            </>
        }
    ]);
}