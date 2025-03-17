
import Todos from "./components/Todos";
import Login from "./components/Login";
import Register from "./components/Register";
import { Routes,Route } from 'react-router-dom'
import { Toaster } from "react-hot-toast";



function App() {
  return (
    <div>
       {/* Global Toaster for notifications */}
       <Toaster
  position="top-right"
  reverseOrder={false}
  toastOptions={{
    style: {
      fontSize: "8px", // Make the text smaller
      padding: "8px 10px", // Reduce padding
      minWidth: "180px", // Reduce the minimum width
    },
  }}
/>
      <Routes>
        <Route path="/" element={<Todos />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;




