import {useState, MouseEventHandler, useEffect} from 'react';
import axios from 'axios';
import {toast} from 'react-toastify';
import { Button, Modal } from 'react-bootstrap';
import { Client } from '../Models/ClientModel';

export const Friends = () => {
    const clientJson = localStorage.getItem('Client');
    const tokenJson = localStorage.getItem('Token');
    const storedClient : Client = clientJson ? JSON.parse(clientJson) : undefined;
    const storedToken = tokenJson ? JSON.parse(tokenJson) : undefined;

    const [username, setUsername] = useState("");
    const [friends, setFriends] = useState<string[]>([]);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [currentFriendRecipe, setCurrentFriendRecipe] = useState<string[]>([]);
    const [currentClickedFriend, setCurrentClickedFriend] = useState<string>("");
    const [currentDay, setCurrentDay] = useState<string>("");

    useEffect(() => {
        axios.get(`https://localhost:7242/api/Friends/$${storedClient.id}/$listfriends`, {
            validateStatus: function (status) {
              return (status >= 200 && status < 300) || (status === 404)
            },
            headers: {
                'Authorization': `Bearer ${storedToken}`,
                'Content-Type': 'application/json'
              }
          },)
        .then(async (response) => {
            return await response.data;
        })
        .then((data) => {
            if(!data) return;
            
            setFriends(data.friends);
        })
        .catch((error) => {
            toast.error("Error in sending request to server");
        })
    },[])

    const handleAdd : MouseEventHandler = (event) => {
        event.preventDefault();
        if( (username === "") || (username === null) || (username === undefined) ) return;
        axios.post(`https://localhost:7242/api/Friends/$${storedClient.id}/$${username}`, {} , {
            validateStatus: function (status) {
              return (status >= 200 && status < 300) || (status === 404) || (status === 409)
            },
            headers: {
                'Authorization': `Bearer ${storedToken}`,
                'Content-Type': 'application/json'
              }
          })
        .then(async (response) => {
            return await response.data;
        })
        .then((data) => {
            if(!data.valid)
            {
                if(data.status === 409) return toast.warning(`${username} is already your friend`);
                if(data.status === 404) return toast.warning(`${username} not found`);
            }
            
            const _friends : string[] = Array.from(friends);
            _friends.push(username.toLowerCase());
            setFriends(_friends);
            toast.success(`${username.toLowerCase()} is now your friend`);
            setUsername("");
        })
        .catch((error) => {
            toast.error("An error occured while sending request");  
        })
    }

    const openModal : MouseEventHandler = (event) => {
        event.preventDefault();
        const clickedFriend = event.currentTarget.getAttribute("name");
        setCurrentClickedFriend(clickedFriend ? clickedFriend : "");
        axios.get(`https://localhost:7242/api/Friends/$${storedClient.id}/$${clickedFriend}`,
        {
            validateStatus: function (status) {
              return (status >= 200 && status < 300) || (status === 404);
            },
            headers: {
                'Authorization': `Bearer ${storedToken}`,
                'Content-Type': 'application/json'
              }
          })
        .then(async (response) => {
            return await response.data;
        })
        .then((data) => {
            setCurrentDay(data.currentDay);
            
            if(data.valid === false) return;

            setCurrentFriendRecipe(data.friendRecipes);
        })
        .catch((error) => {
            if(error)
            return toast.error("Couldn't send request");
        })
        setIsModalOpen(true);
    }

    const closeModal = () => {
        setCurrentFriendRecipe([]);
        setCurrentClickedFriend("");
        setIsModalOpen(false);
    }

    const handleDelete : MouseEventHandler = (event) => {
        event.preventDefault();
        if( (username === "") || (username === null) || (username === undefined) ) return;
        axios.delete(`https://localhost:7242/api/Friends/$${storedClient.id}/$${username}`, {
            validateStatus: function (status) {
              return (status >= 200 && status < 300) || (status === 404)
            },
            headers: {
                'Authorization': `Bearer ${storedToken}`,
                'Content-Type': 'application/json'
              }
          })
        .then(async (response) => {
            return await response.data;
        })
        .then((data) => {
            if(!data)
            {
                return toast.warning(`${username} was not found on your friends list`);
            }
            
            const _friends : string[] = Array.from(friends);
            const index = _friends.indexOf(username.toLowerCase());
            _friends.splice(index, 1);
            setFriends(_friends);
            toast.success(`${username.toLowerCase()} is no longer your friend`);
            setUsername("");
        })
        .catch((error) => {
            toast.error("An error occured while sending request");  
        })
    }

    return (
        <div className="bg-gray-100" >
            <form className="bg-white w-full flex items-center justify-center p-10 gap-5">
                <input
                className = "max-w-[250px] w-full border-2 rounded-lg p-2 outline-none focus:border-[#00dd0b]"
                value = {username}
                type = "text"
                placeholder = "Add/Delete friend"
                onChange = {(e) => setUsername(e.target.value)}
                maxLength = {15}
                >
                </input>
            <button onClick={handleAdd} className="rounded-lg bg-green-300 px-5 py-2 text-white font-bold hover:bg-green-500 transition-colors duration-150 ease-in-out">Add</button>
            <button onClick={handleDelete} className="rounded-lg bg-green-300 px-5 py-2 text-white font-bold hover:bg-green-500 transition-colors duration-150 ease-in-out">Delete</button>
        </form>
        <div className="bg-gray-100 p-4">
        <h2 className="text-xl font-bold mb-4">Friends List</h2>
        <ul className="flex flex-wrap">
        {friends.map((f) => (
        <div key={f} className="mx-4 bg-white border border-green-300 p-4 rounded-lg flex items-center space-x-4 relative">
            <div>
            <h3 className="text-lg font-semibold">{f}</h3>
            <button
                name={f}
                onClick={openModal}
                className="text-green-500 hover:underline"
            >
                See what's he cooking
            </button>
            </div>
        </div>
        ))}
        </ul>
        </div>
        <Modal show={isModalOpen} onHide={closeModal} size="lg" scrollable className="my-modal">
        <Modal.Header closeButton>
          <Modal.Title>{currentClickedFriend}</Modal.Title>
          <Button className="close" onClick={closeModal}></Button>
        </Modal.Header>
        <Modal.Body>
        <h2 className="text-2xl font-bold mb-4 mt-4">{currentDay}:</h2>
        <ol className="list-decimal ml-6 space-y-2">
        {currentFriendRecipe.length > 0 ? currentFriendRecipe.map(r => <li key={r} className="font-serif pl-2">{r}</li>) : <p className="font-serif pl-2">Well, It seems that your friend is on some diet today.</p>}
        </ol>
        </Modal.Body>
      </Modal>
        </div>
    );
}