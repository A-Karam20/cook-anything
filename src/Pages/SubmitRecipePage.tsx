import {MouseEventHandler, useState} from 'react';
import axios from 'axios';
import {toast} from 'react-toastify';
import { Client } from '../Models/ClientModel';
import { serverUrl } from '../Server/ServerUrl';

export const SubmitRecipe = () => {
    const clientJson = localStorage.getItem('Client');
    const tokenJson = localStorage.getItem('Token');
    const storedClient : Client = clientJson ? JSON.parse(clientJson) : undefined;
    const storedToken = tokenJson ? JSON.parse(tokenJson) : undefined;

    const [title, setTitle] = useState<string>("");
    const [instructions, setInstructions] = useState<string>("");
    const [ingredients, setIngredients] = useState<string>("");
    const [servings, setServings] = useState<string>("");

    const handleClick : MouseEventHandler = (event) => {
        event.preventDefault();
        if(title === "" || instructions === "" || ingredients === "" || servings === "") return toast.warning("Please fill in the forms");

        const recipe = {
            id : "-1",
            title : title,
            instructions : instructions,
            ingredients : ingredients,
            servings : servings
        }

        axios.post(`${serverUrl}/api/SubmitRecipe/$${storedClient.id}`, recipe, {
          headers: {
          'Authorization': `Bearer ${storedToken}`,
          'Content-Type': 'application/json'
        }})
        .then(async (response) =>  {return await response.data})
        .then((data) =>
        {
            if(!data) return toast.error("Error in sending request");

            toast.success("Form submited succesfully");

            setTitle("");
            setInstructions("");
            setIngredients("");
            setServings("");
        })
        .catch((error) => {
            toast.error("An error occured. Please try again")
        });
    }

    return (
        <div className="h-screen bg-gray-100 rounded-lg p-8 shadow-md">
  <h2 className="text-2xl font-bold mb-4">Submit Your Own Recipe</h2>
  <p className="text-gray-600 font-bold mb-8">Let a Chef See It</p>

  <form>
    <div className="mb-6">
      <label htmlFor="title" className="block text-gray-800 font-semibold mb-2">
        Title
      </label>
      <input
        type="text"
        id="title"
        value={title}
        onChange={(e) => {setTitle(e.target.value)}}
        className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:border-green-500"
        placeholder="Enter recipe title"
      />

      <label htmlFor="instructions" className="block text-gray-800 font-semibold mb-2 mt-4">
        Instructions
      </label>
      <textarea
        id="instructions"
        value={instructions}
        onChange={(e) => {setInstructions(e.target.value)}}
        className="w-full border border-gray-300 rounded p-2 h-32 resize-none focus:outline-none focus:border-green-500"
        placeholder="Instructions"
      ></textarea>

      <label htmlFor="ingredients" className="block text-gray-800 font-semibold mb-2 mt-4">
        Ingredients
      </label>
      <textarea
        id="ingredients"
        value={ingredients}
        onChange={(e) => {setIngredients(e.target.value)}}
        className="w-full border border-gray-300 rounded p-2 h-32 resize-none focus:outline-none focus:border-green-500"
        placeholder="Enter your ingredients"
      ></textarea>

      <label htmlFor="servings" className="block text-gray-800 font-semibold mb-2 mt-4">
        Servings
      </label>
      <input
        type="text"
        id="servings"
        value={servings}
        onChange={(e) => {setServings(e.target.value)}}
        className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:border-green-500"
        placeholder="Servings"
      />
    </div>

    <div className="mt-8">
      <button
        type="submit"
        className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded focus:outline-none"
        onClick={handleClick}
      >
        Submit Recipe
      </button>
    </div>
  </form>
</div>
    );
}