import { createBrowserRouter } from "react-router-dom";
import  HomeNavBar from "../NavigationBar/HomeNavBar";
import { LogIn } from "../Account/LogIn";
import { CreateAccount } from "../Account/CreateAccount";
import { AboutUs } from "../AboutUs/aboutUs";
import ClientNavBar from "../Pages/ClientPage";
import Calendar from "../Pages/CalendarPage";
import CalendarNavBar from "../NavigationBar/CalendarNavBar";

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
            <CalendarNavBar/>
            <Calendar/>
            </>
        }
    ]);
}