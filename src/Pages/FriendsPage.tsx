import {useState, MouseEventHandler, useEffect} from 'react';
import axios from 'axios';
import {toast} from 'react-toastify';
import { Button, Modal } from 'react-bootstrap';

export const Friends = () => {
    const [username, setUsername] = useState("");
    const [friends, setFriends] = useState<string[]>([]);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [currentFriendRecipe, setCurrentFriendRecipe] = useState<string[]>([]);
    const [currentClickedFriend, setCurrentClickedFriend] = useState<string>("");

    useEffect(() => {
        axios.get(`https://localhost:7242/api/Friends/$2/$listfriends`)
        .then(async (response) => {
            return await response.data;
        })
        .then((data) => {
            if(!data) return;
            
            setFriends(data.friends);
        })
        .catch((error) => {
            console.log(error);
            toast.error("Error in sending request to server");
        })
    },[])

    const handleAdd : MouseEventHandler = (event) => {
        event.preventDefault();
        axios.post(`https://localhost:7242/api/Friends/$2/$${username}`, {})
        .then(async (response) => {
            return await response.data;
        })
        .then((data) => {
            if(!data) return toast.warning(`${username} is already your friend`);
            if(data === "0") return toast.warning("Username not found");
            
            const _friends : string[] = Array.from(friends);
            _friends.push(username.toLowerCase());
            setFriends(_friends);
            toast.success(`${username.toLowerCase()} is now your friend`);
            setUsername("");
        })
        .catch((error) => {
            console.log(error);
            toast.error("Error in sending request");
        })
    }

    const openModal : MouseEventHandler = (event) => {
        event.preventDefault();
        const clickedFriend = event.currentTarget.getAttribute("name");
        setCurrentClickedFriend(clickedFriend ? clickedFriend : "");
        axios.get(`https://localhost:7242/api/Friends/$2/$${clickedFriend}`)
        .then(async (response) => {
            return await response.data;
        })
        .then((data) => {
            if(!data) return toast.error("Can't open friend's calendar");

            setCurrentFriendRecipe(data.friendRecipes);
        })
        .catch((error) => {
            console.log(error);
            toast.error("Can't send request to server");
        })
        setIsModalOpen(true);
    }

    const closeModal = () => {
        setCurrentFriendRecipe([]);
        setCurrentClickedFriend("");
        setIsModalOpen(false);
    }

    const handleDeleteFriend : MouseEventHandler = (event) => {
        event.preventDefault();
        const clickedFriend = event.currentTarget.getAttribute("name");
    }

    return (
        <div className="bg-gray-100" >
            <form className="bg-white w-full flex items-center justify-center p-10 gap-5">
                <input
                className = "max-w-[250px] w-full border-2 rounded-lg p-2 outline-none focus:border-[#00dd0b]"
                value = {username}
                type = "text"
                placeholder = "Add friend"
                onChange = {(e) => setUsername(e.target.value)}
                maxLength = {15}
                >
                </input>
            <button onClick={handleAdd} className="rounded-lg bg-green-300 px-5 py-2 text-white font-bold hover:bg-green-500 transition-colors duration-150 ease-in-out">Add</button>
        </form>
        <div className="bg-gray-100 p-4">
        <h2 className="text-xl font-bold mb-4">Friends List</h2>
        <ul className="flex flex-wrap">
        {friends.map((f) => (
        <div className="mx-4 bg-white border border-green-300 p-4 rounded-lg flex items-center space-x-4 relative">
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
            <button
            name={f}
            className="absolute top-2 right-2 text-red-500"
            onClick={(event) => handleDeleteFriend(event)}
            >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
            >
                <path
                fillRule="evenodd"
                d="M10 2a8 8 0 100 16 8 8 0 000-16zm3.293 10.293a1 1 0 01-1.414 1.414L10 11.414l-2.879 2.879a1 1 0 11-1.414-1.414L8.586 10 5.707 7.121a1 1 0 011.414-1.414L10 8.586l2.879-2.879a1 1 0 111.414 1.414L11.414 10l2.879 2.879z"
                clipRule="evenodd"
                />
            </svg>
            </button>
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
        <ol className="list-decimal ml-6 space-y-2">
        {currentFriendRecipe.map(r => <li key={r} className="font-serif pl-2">{r}</li>)}
        </ol>
        </Modal.Body>
      </Modal>
        </div>
    );
}