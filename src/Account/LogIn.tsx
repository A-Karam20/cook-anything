import {MouseEventHandler, useState} from 'react';
import axios from 'axios';
import { serverUrl } from '../Server/ServerUrl';
import {toast} from 'react-toastify';
import {useNavigate} from 'react-router-dom';

export const LogIn = () => {
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [usernameError, setUsernameError] = useState<Boolean>(false);
    const [passwordError, setPasswordError] = useState<Boolean>(false);
    const navigate = useNavigate();

    const handleClick : MouseEventHandler = (event) => {
        event.preventDefault();
        if(username === "") setUsernameError(true);
        if(password === "") setPasswordError(true);
        if(usernameError === true || passwordError === true) return;
           
        const client  = {
            username : username,
            password : password
        }

        axios.post(`${serverUrl}/api/LogIn`, client)
        .then(async (response) =>  {return await response.data})
        .then((data) =>
        {
            setUsernameError(false);
            setPasswordError(false);
            if(!data) return toast.error("Account not found");

            localStorage.setItem('Client', data);

            setUsername("");
            setPassword("");
            navigate('/');
        })
        .catch((error) => {
            toast.error("An error occured. Please try again")
        });
    }

    return (
        <form className="w-full flex flex-col items-center p-10 gap-5">
            <h1 className="mb-5 text-2xl font-bold">Log In</h1>
                <input
                className = "max-w-[250px] w-full border-2 rounded-lg p-3 outline-none focus:border-[#00dd0b]"
                value = {username}
                type = "text"
                placeholder = "Username"
                onChange = {(e) => setUsername(e.target.value)}
                maxLength = {15}
                >
                </input>
                {usernameError && <p className="text-sm text-red-400 font-semibold">This field is required</p>}

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

            <button className="rounded-lg bg-green-300 px-10 py-3 text-white font-bold hover:bg-green-500 transition-colors duration-150 ease-in-out" onClick={handleClick}>Enter</button>
        </form>
    );
}

