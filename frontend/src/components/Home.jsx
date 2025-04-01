import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

function TodoApp() {
  const [todos, setTodos] = useState([ ]);
  const [error, setError] = useState(null);
  const [newTodo, setNewTodo] = useState("");
  const [loading, setLoading] = useState(false);
  const [loggedIn, setLoggedIn] = useState(true);
  const [showPopup, setShowPopup] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
   
    const fatchtodos = async() =>{ 
      try {
        setLoading(true);
        const response= await axios.get("http://localhost:4002/todo/fetch",{
          withCredentials:true, 
          headers:{
            "Content-Type": "application/json"
          }
        });
        console.log(response.data.todo);
        setTodos(response.data.todo)
        setError(null);

      } catch (error) {
          setError("fail to fatch todo");
      } finally {
          setLoading(false);
      }
    };
    fatchtodos();
  }, [loggedIn]);

  const createTodo = async()=>{
    if(!newTodo) return;

    try {
      const response= await axios.post("http://localhost:4002/todo/create",{
        title:newTodo,
        completed:false
      },{
          withCredentials:true,          
        });
        console.log(response.data.newtodo)
        setTodos([...todos,response.data.newtodo ])
        setNewTodo("")
    } catch (error) {
      setError("failed to create todo");
    }
  }

  // const addTodo = () => {
  //   if (newTodo.trim() === "") return;
  //   setTodos([...todos, { id: Date.now(), text: newTodo, completed: false }]);
  //   setNewTodo("");
  // };

  const todoStatus=async(id)=>{
    try {
      const todo= todos.find((t)=>t._id==id)
      const response= await axios.put(`http://localhost:4002/todo/update/${id}`,{
        ...todo,
        completed: !todo.completed

      },{
        withCredentials:true,
      })
      setTodos(todos.map((t)=>(t._id==id? response.data.todo: t)))
      console.log(response.data)
    } catch (error) {
      setError("failed to update todo");

    }
  }

  // const toggleComplete = (id) => {
  //   setTodos(
  //     todos.map((todo) =>
  //       todo.id === id ? { ...todo, completed: !todo.completed } : todo
  //     )
  //   );
  // };

  const deleteTodo = async(id) => {
    try {
      await axios.delete(`http://localhost:4002/todo/delete/${id}`,{
        withCredentials:true,
      })
    } catch (error) {
      setError("failed to delete todo");
    }
    setTodos(todos.filter((todo) => todo._id !== id));
  };


  const logout = async () => {
    try {
      await axios.get("http://localhost:4002/user/logout")
      setLoggedIn(false);
      localStorage.removeItem("jwt"); 
      alert("User logged out");
      navigate("/login");
    } catch (error) {
      setError("error in logging out")
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      createTodo();
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {  
      setShowPopup(false); // Hide popup after 3 seconds
    }, 3000);
  
    return () => clearTimeout(timer); // Cleanup to prevent memory leaks
  }, []);

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      
      {showPopup && (
        <div className="fixed top-5 left-1/2 transform -translate-x-1/2 bg-green-200 text-green-800 p-2 text-center rounded shadow-md">
          ✅ User logged in successfully
        </div>
      )}
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold text-center mb-4">Todo App</h2>
        <div className="flex mb-4">
          <input
            type="text"
            placeholder="Add a new todo"
            className="flex-grow p-2 border rounded-l-md"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <button
            onClick={createTodo}
            className="bg-blue-500 text-white px-4 rounded-r-md"
          >
            Add
          </button>
        </div>
        <ul>
            {todos.map((todo) => (
            <li key={todo._id} className="flex items-center justify-between py-2">
              <div className="flex items-center">
                <input 
                  type="checkbox"
                  checked={todo.completed} 
                  onChange={() => todoStatus(todo._id)} 
                  className="mr-2"
                /> 
                <span className={`${todo.completed ? "line-through text-gray-800" : ""}` }>
                  {todo.title}
                </span>
              </div> 
              <button
                onClick={() => deleteTodo(todo._id)} 
                className="text-red-500 hover:underline"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
        <p className="text-center text-gray-600 mt-2">
          {todos.filter((todo) => !todo.completed).length} todos remaining
        </p>
        <button
          onClick={logout}
          className="w-full bg-red-500 text-white py-2 mt-4 rounded-md"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default TodoApp;