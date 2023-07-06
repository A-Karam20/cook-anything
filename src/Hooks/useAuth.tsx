import { Client } from "../Models/ClientModel";

export const useAuth = () => {
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