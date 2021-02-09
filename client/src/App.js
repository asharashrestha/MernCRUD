import React, { useState, useEffect } from "react";
import './App.css';
import Axios from 'axios';

function App() {
  const [foodName, setFoodName] = useState("");
  const [days, setDays] = useState(0);
  const [newFoodName, setNewFoodName] = useState("");

  const [foodList, setFoodList] = useState([]);
  useEffect(() => {
    Axios.get('http://localhost:3001/read').then((response) => {
      setFoodList(response.data)

    })
  }, [])

  const addToList = () => {
    Axios.post("http://localhost:3001/insert", { foodName: foodName, days: days});
  };


  const updateFood = (id) =>{
    Axios.put("http://localhost:3001/update",{id: id, newFoodName: newFoodName});
  };

  const deleteFood = (id) =>{
    Axios.delete(`http://localhost:3001/delete/${id}`);
  };


  return (
    <div className="App"><h1>CRUD App with MERN </h1>
      <label>FoodName:</label>
      <input type="text" onChange={(event) => {
        setFoodName(event.target.value);
      }} />
      <label>Days Since you Ate It:</label>
      <input type="number" onChange={(event) => {
        setDays(event.target.value);
      }} />
      <button onClick={addToList}>Add To List</button>

      <h1>Food List</h1>
      {foodList.map((val, key) => {
        return (
          <div key={key} className="food">
            <h3>{val.foodName}</h3> <h3>{val.daysSinceIAte}</h3>
            <input type="text" placeholder="New Food Name..."
              onChange={(event) => {
                setNewFoodName(event.target.value);
              }} />
            <button onClick={()=>updateFood(val._id)}>Update</button>
            <button onClick={()=>deleteFood(val._id)}>Delete</button>
            <button>Delete</button>
          </div>
        )
      })}

    </div>
  );
}

export default App;
