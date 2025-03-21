import React from "react";
import { useState, useEffect } from "react";
import { fetchTodos } from "../utils/api";
import Particles from "../components/ui/Particles";

const Dashboard = () => {
  const [todos, setTodos] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchAllTodos = async (token)=>{
      const data = await fetchTodos(token);
      setTodos(data);
    }

    fetchAllTodos(token);
    
  }, []);
  return (
    <div className="w-full min-h-screen  bg-black p-5 flex flex-col gap-10 text-white text-xl">
      <div className="absolute inset-0 z-0">
        <Particles
          particleColors={["#ffffff", "#ffffff"]}
          particleCount={200}
        />
      </div>
      <section className="border border-white">Search</section>
      <section className="border border-white">
        {
          todos.map((todo)=>{
            return (
              <div key={todo.id}>
                {todo.title}
                {todo.description}
                {todo.completed}
              </div>
            )
          })
        }
      </section>
    </div>
  );
};

export default Dashboard;
