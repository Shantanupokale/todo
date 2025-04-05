import { useEffect, useState } from "react";
import { fetchTodos, addTodo, updateTodo, deleteTodo } from "../utils/api";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Card, CardContent } from "../components/ui/card";
import { toast } from "react-hot-toast";
import { Pencil, Trash2, CheckCircle , LogOut} from "lucide-react";
import Particles from "../components/ui/Particles";
import { SkeletonLoader } from "../components/ui/SkeletonLoader";
import { ClipboardList, Clock, Music2 } from "lucide-react"; // Icons
import PomodoroTimer from "../components/ui/PomodoroTimer";
import { useNavigate } from "react-router-dom";


export default function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const token = window.localStorage.getItem("token");
  const [activeSection, setActiveSection] = useState("todos"); // tracks selected section
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  useEffect(() => {
    const loadTodos = async () => {
      setLoading(true);
      try {
        const data = await fetchTodos(token);
        if (!Array.isArray(data)) throw new Error("Invalid response format");
        setTodos(data);
      } catch (error) {
        toast.error("Failed to load todos!");
        setTodos([]);
      } finally {
        setLoading(false);
      }
    };
    loadTodos();
  }, []);

  const handleAddOrUpdate = async () => {
    if (!title.trim() || !description.trim()) {
      toast.error("Title and Description are required!");
      return;
    }
    try {
      if (editingId) {
        await updateTodo(editingId, { title, description }, token);
        toast.success("Todo updated!");
        setTodos((prevTodos) =>
          prevTodos.map((todo) =>
            todo._id === editingId ? { ...todo, title, description } : todo
          )
        );
      } else {
        const newTodo = await addTodo(title, description, token);
        toast.success("Todo added!");
        setTodos((prevTodos) => [...prevTodos, newTodo]);
      }
      setTitle("");
      setDescription("");
      setEditingId(null);
    } catch (error) {
      toast.error("Failed to save todo!");
    }
  };

  const handleEdit = (todo) => {
    setTitle(todo.title);
    setDescription(todo.description);
    setEditingId(todo._id);
  };

  const handleDelete = async (id) => {
    try {
      await deleteTodo(id, token);
      toast.success("Todo deleted!");
      setTodos((prevTodos) => prevTodos.filter((todo) => todo._id !== id));
    } catch (error) {
      toast.error("Failed to delete todo!");
    }
  };

  const toggleComplete = async (id, completed) => {
    try {
      await updateTodo(id, { completed: !completed }, token);
      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo._id === id ? { ...todo, completed: !completed } : todo
        )
      );
    } catch (error) {
      toast.error("Failed to update todo status!");
    }
  };

  return (
    // <div className="relative min-h-screen flex flex-col items-center justify-center bg-black text-white p-6">
    //   <div>
    //   {/* background  */}
    //   <div className="absolute inset-0 z-0 h-screen overflow-hidden">
    //         <Particles particleCount={150} speed={0.2} />
    //     </div>

    //       <h1 className="text-4xl font-bold mb-6 z-10">Organise Your Tasks </h1>
    //         <div className="flex  gap-4 mb-6 z-10 w-full max-w-md">
    //           <Input
    //             placeholder="Title"
    //             value={title}
    //             onChange={(e) => setTitle(e.target.value)}
    //             className="bg-gray-800  text-white border-gray-600 placeholder-gray-500 backdrop-blur-lg"
    //           />
    //           <Input
    //             placeholder="Description"
    //             value={description}
    //             onChange={(e) => setDescription(e.target.value)}
    //             className="bg-gray-800  text-white border-gray-600 placeholder-gray-500 backdrop-blur-lg"
    //           />
    //           <Button
    //             onClick={handleAddOrUpdate}
    //             className="bg-primary text-black font-bold relative transition-all duration-300 px-4 py-2 rounded-xl
    //                         hover:text-white
    //                         hover:translate-x-1 hover:-translate-y-1
    //                         hover:shadow-[4px_4px_0px_rgba(255,255,255,0.9)]"
    //           >
    //             {editingId ? "Update" : "Add"}
    //           </Button>
    //         </div>
    //         {loading ? (
    //           // <p className="text-gray-400 z-10">Loading todos...</p>
    //           <SkeletonLoader />
    //         ) : todos.length === 0 ? (
    //           <p className="text-gray-400 z-10">No todos available. Add one!</p>
    //         ) : (
    //           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-4xl z-10">
    //             {todos.map((todo) => (
    //               <Card
    //                 key={todo._id}
    //                 className={`p-3 bg-black-/80 border ${todo.completed ? 'border-green-500' : 'border-red-500'} shadow-lg rounded-lg backdrop-blur-md flex flex-col justify-between transition-transform duration-300  hover:translate-x-1 hover:-translate-y-1
    //                         hover:shadow-[4px_4px_0px_rgba(255,255,255,0.9)] `}
    //               >
    //                 <CardContent>
    //                   <h2 className="text-sm font-semibold text-white mb-2">{todo.title}</h2>
    //                   <p className="text-gray-300 text-xs *:mb-4">{todo.description}</p>
    //                   <div className="flex items-center justify-between">
    //                     <button onClick={() => toggleComplete(todo._id, todo.completed)}
    //                       className="transition-transform duration-200 hover:scale-110">
    //                       <CheckCircle className={`cursor-pointer ${todo.completed ? 'text-green-500' : 'text-gray-400'} hover:text-green-400`} size={20} />
    //                     </button>
    //                     <div className="flex gap-3">
    //                       <Pencil  className="text-gray-400 hover:text-white cursor-pointer transition-transform duration-200 hover:scale-110" onClick={() => handleEdit(todo)} />
    //                       <Trash2 className="text-red-500 hover:text-red-700 cursor-pointer transition-transform duration-200 hover:scale-110"onClick={() => handleDelete(todo._id)} />
    //                     </div>
    //                   </div>
    //                 </CardContent>
    //               </Card>
    //             ))}
    //           </div>
    //         )}
    //   </div>
    // </div>

    <div className="flex min-h-screen bg-black text-white">
      {/* Sidebar */}
      {/* <aside className="hidden sm:flex flex-col w-64 bg-[#111] p-6 border-r border-gray-800 shadow-inner">
      <h2 className="text-2xl font-semibold mb-8 text-white">🧠 FocusFlow</h2>
      <nav className="flex flex-col gap-4 text-sm">
        <button
          onClick={() => setActiveSection("todos")}
          className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-all duration-200 ${
            activeSection === "todos"
              ? "bg-primary text-black font-bold"
              : "hover:bg-gray-800 text-gray-300"
          }`}
        >
          <ClipboardList size={18} />
          Todos
        </button>
        <button
          onClick={() => setActiveSection("pomodoro")}
          className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-all duration-200 ${
            activeSection === "pomodoro"
              ? "bg-primary text-black font-bold"
              : "hover:bg-gray-800 text-gray-300"
          }`}
        >
          <Clock size={18} />
          Pomodoro
        </button>
        <button
          onClick={() => setActiveSection("focusmusic")}
          className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-all duration-200 ${
            activeSection === "focusmusic"
              ? "bg-primary text-black font-bold"
              : "hover:bg-gray-800 text-gray-300"
          }`}
        >
          <Music2 size={18} />
          Focus Music
        </button>
      </nav>
    </aside> */}

      {/* Sidebar */}
      {/* Sidebar */}

    {/* Sidebar */}
<aside
  onMouseEnter={() => setIsSidebarOpen(true)}
  onMouseLeave={() => setIsSidebarOpen(false)}
  className={`${
    isSidebarOpen ? "w-48" : "w-16"
  } h-screen bg-black p-4 border-gray-800 shadow-inner transition-all duration-700 relative flex flex-col`}
>
  {/* Sidebar Title */}
  <div className="flex items-center justify-between pt-10 mb-6">
   
      <h2 className="text-md font-semibold text-white">🧠 FocusFlow</h2>
   
  </div>

  {/* Navigation Items */}
  <nav className="flex flex-col gap-14 text-xs">
    {["todos", "pomodoro", "focusmusic"].map((section) => (
      <button
        key={section}
        onClick={() => setActiveSection(section)}
        className={`flex items-center transition-all duration-300 rounded-xl font-medium
          ${isSidebarOpen ? "gap-2 justify-start px-2 py-3" : "justify-center py-3 px-2"}
          ${
            activeSection === section
              ? "bg-green-600 text-white"
              : "bg-transparent text-white border border-green-600"
          }
          ${
            activeSection !== section
              ? "hover:bg-green-600 hover:text-white hover:translate-x-1 hover:-translate-y-1 hover:shadow-[3px_3px_0px_rgba(255,255,255,0.8)]"
              : ""
          }`}
      >
        {section === "todos" && <ClipboardList size={16} />}
        {section === "pomodoro" && <Clock size={16} />}
        {section === "focusmusic" && <Music2 size={16} />}
        {isSidebarOpen && (
          <span>{section.charAt(0).toUpperCase() + section.slice(1)}</span>
        )}
      </button>
    ))}
  </nav>

  {/* Logout Button */}
  <div className="mt-auto">
      <button
        onClick={() => {
          localStorage.removeItem("token");
          window.location.href = "/"; // Navigate to landing page
        }}
        className={`flex items-center gap-2 bg-green-600 text-black font-medium text-xs rounded-xl mt-6 transition-all duration-300
          ${isSidebarOpen ? "px-3 py-2 self-start" : "justify-center py-3 px-3"}
          hover:text-white hover:translate-x-1 hover:-translate-y-1 hover:shadow-[3px_3px_0px_rgba(255,255,255,0.8)]`}
      >
        <LogOut size={16} />
        {isSidebarOpen && <span>Logout</span>}
      </button>
    </div>
</aside>




      {/* Main Area */}
    
      <main className="flex-1 relative p-6 flex flex-col items-center justify-center">
    {/* Background Particles */}
    <div className="absolute inset-0 z-0 h-screen overflow-hidden">
        <Particles particleCount={150} speed={0.2} />
    </div>

    {/* Section Content */}
{activeSection == "todos" && (
    <div>
        <h1 className="text-4xl font-bold mb-6 z-10">Organise Your Tasks</h1>

        <div className="flex gap-4 mb-6 z-10 w-full max-w-md">
        <Input
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="bg-gray-800 text-white border-gray-600 placeholder-gray-500 backdrop-blur-lg"
        />
        <Input
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="bg-gray-800 text-white border-gray-600 placeholder-gray-500 backdrop-blur-lg"
        />
        <Button
            onClick={handleAddOrUpdate}
            className="bg-primary text-black font-bold relative transition-all duration-300 px-4 py-2 rounded-xl 
        hover:text-white
        hover:translate-x-1 hover:-translate-y-1 
        hover:shadow-[4px_4px_0px_rgba(255,255,255,0.9)]"
        >
            {editingId ? "Update" : "Add"}
        </Button>
        </div>

        {loading ? (
        <SkeletonLoader />
        ) : todos.length === 0 ? (
        <p className="text-gray-400 z-10">No todos available. Add one!</p>
        ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-4xl z-10">
            {todos.map((todo) => (
            <Card
                key={todo._id}
                className={`p-3 bg-black-/80 border ${
                todo.completed ? "border-green-500" : "border-red-500"
                } shadow-lg rounded-lg backdrop-blur-md flex flex-col justify-between transition-transform duration-300 hover:translate-x-1 hover:-translate-y-1 
    hover:shadow-[4px_4px_0px_rgba(255,255,255,0.9)]`}
            >
                <CardContent>
                <h2 className="text-sm font-semibold text-white mb-2">
                    {todo.title}
                </h2>
                <p className="text-gray-300 text-xs *:mb-4">{todo.description}</p>
                <div className="flex items-center justify-between">
                    <button
                    onClick={() => toggleComplete(todo._id, todo.completed)}
                    className="transition-transform duration-200 hover:scale-110"
                    >
                    <CheckCircle
                        className={`cursor-pointer ${
                        todo.completed ? "text-green-500" : "text-gray-400"
                        } hover:text-green-400`}
                        size={20}
                    />
                    </button>
                    <div className="flex gap-3">
                    <Pencil
                        className="text-gray-400 hover:text-white cursor-pointer transition-transform duration-200 hover:scale-110"
                        onClick={() => handleEdit(todo)}
                    />
                    <Trash2
                        className="text-red-500 hover:text-red-700 cursor-pointer transition-transform duration-200 hover:scale-110"
                        onClick={() => handleDelete(todo._id)}
                    />
                    </div>
                </div>
                </CardContent>
            </Card>
            ))}
        </div>
        )}
    </div>
)}
    


    {activeSection === "pomodoro" && <PomodoroTimer />}

          {activeSection === "focusmusic" && (
            <div className="flex flex-col items-center justify-center text-center">
              <h2 className="text-3xl font-bold mb-4">Focus Music</h2>
              {/* Insert your music component or player here */}
              <p className="text-gray-400">Coming soon...</p>
            </div>
          )}
    </main>;

    </div>
  );
}