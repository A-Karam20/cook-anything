import axios from 'axios';
import { serverUrl } from '../Server/ServerUrl';
import { Client } from '../Models/ClientModel';
import {useState} from 'react';
import {toast} from 'react-toastify';

type Props = {
    isLiked : Boolean,
    isDisliked : Boolean
}
export const handleLike = (isLiked : Boolean, isDisliked : Boolean, recipeId : number) => {
    const clientString = localStorage.getItem('Client');
    if(clientString != null)
    {
        const [state, setState] = useState("");
        if(isLiked) {setState("1")}
        else if(isDisliked) {setState("0")}
        const client : Client = JSON.parse(clientString);
        axios.patch(`${serverUrl}/api/LogIn/Recipes/${client.id}/${recipeId}`, state)
        .then(async (response) => {return await response.data})
        .then(data => {if(!data) toast.error("An error occured")})
        .catch(error => toast.error("An error occured"))
    }

    return 
}