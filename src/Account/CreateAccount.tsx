import {MouseEventHandler, useState} from 'react';
import axios from 'axios';
import { serverUrl } from '../Server/ServerUrl';
import {toast} from 'react-toastify';

export const CreateAccount = () => {
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [usernameError, setUsernameError] = useState<Boolean>(false);
    const [passwordError, setPasswordError] = useState<Boolean>(false);
    const [nameTaken, setNameTaken] = useState<Boolean>(false);

    const handleClick : MouseEventHandler = (event) => {
        setUsernameError(false);
        setPasswordError(false);
        event.preventDefault();
        if(username === "") setUsernameError(true);
        if(password === "") setPasswordError(true);
        if(username === "" || password === "") return;
           
        const client  = {
            username : username,
            password : password
        }

        axios.post(`https://localhost:7242/api/CreateAccount`, client)
        .then(async (response) =>  {return await response.data})
        .then((data) =>
        {
            setUsernameError(false);
            setPasswordError(false);
            if(!data) return setNameTaken(true);
            
            setNameTaken(false);
            setUsername("");
            setPassword("");
            toast.success("Account created");
        })
        .catch((error) => toast.error("An error occured. Please try again"));
    }

    return (
        <form className="w-full flex flex-col items-center p-10 gap-5">
            <h1 className="mb-5 text-2xl font-bold">Sign Up</h1>
                <input
                className = "max-w-[250px] w-full border-2 rounded-lg p-3 outline-none focus:border-[#00dd0b]"
                value = {username}
                type = "text"
                placeholder = "Username"
                onChange = {(e) => setUsername(e.target.value)}
                maxLength = {15}
                >
                </input>
                {usernameError && <p className="text-sm text-red-400 font-semibold">This field is required</p> ||
                nameTaken && <p className="text-sm text-red-400 font-semibold">Name already taken</p>
                }

                <input
                className = "max-w-[250px] w-full border-2 rounded-lg p-3 outline-none focus:border-[#00dd0b]"
                value = {password}
                type = "password"
                placeholder = "Password"
                onChange = {(e) => setPassword(e.target.value)}
                maxLength = {50}
                >
                </input>
                {passwordError && <p className="text-sm text-red-400 font-semibold">This field is required</p>}

            <button className="rounded-lg bg-green-300 px-10 py-3 text-white font-bold hover:bg-green-500 transition-colors duration-150 ease-in-out" onClick={handleClick}>Create</button>
        </form>
    );
}