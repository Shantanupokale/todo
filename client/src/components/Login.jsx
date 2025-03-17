import React, { useState } from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Card, CardHeader, CardContent, CardFooter } from "./ui/card";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import { Eye, EyeOff } from "lucide-react"; // Import Eye icons
import Particles from "./ui/Particles"; // Import Particles
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({ email: "", password: "" });
    const navigate = useNavigate();
    

    // Handle form input changes
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });

    };
    console.log(formData);




// Handle login
const handleLogin = async (e) => {
    e.preventDefault();

    try {
    const response = await fetch("http://localhost:5000/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
    });

    const data = await response.json();

    if (response.ok) {
        toast.success("Login Successful!");

        // Store token in localStorage
        localStorage.setItem("token", data.token);

        // Redirect to dashboard after 1.5s
        setTimeout(() => navigate("/"), 1500);
    } else {
        toast.error(data.message || "Invalid credentials!");
    }
    } catch (error) {
    console.error("Error logging in:", error);
    toast.error("Server error, please try again.");
    }
};

  return (
    <div className="h-screen flex justify-center items-center bg-black text-white font-pressStart relative">
       {/* Particle Background */}
       <div className="absolute inset-0 z-0">
        <Particles particleColors={["#ffffff", "#ffffff"]} particleCount={200} />
      </div>

        {/* Global Toaster for notifications */}

      {/* Login Card with Glassmorphism Effect */}
      <div className="relative z-10">
        <Card className="w-full max-w-md bg-black-900/80 border border-gray-700 p-8 shadow-lg rounded-2xl backdrop-blur-sm">
          <CardHeader>
            <h2 className="text-3xl font-stonePunk font-bold text-center text-white">
              Welcome Back
            </h2>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-6">
              {/* Email */}
              <div className="grid gap-3">
                <Label htmlFor="email" className="text-gray-400">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange} 
                  required
                  className="bg-gray-800 text-white border-gray-600 placeholder-gray-500"
                />
              </div>

              {/* Password with Show/Hide Toggle */}
              <div className="grid gap-3 relative">
                <Label htmlFor="password" className="text-gray-400">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="bg-gray-800 text-white border-gray-600 placeholder-gray-500 pr-10"
                  />
                  {/* Show/Hide Password Button */}
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-3 flex items-center text-black"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-primary hover:bg-primary-dark text-black font-stonePunk font-bold"
              >
                Login
              </Button>
            </form>
          </CardContent>

          <CardFooter className="text-center">
            <p className="text-sm text-gray-400">
              Don’t have an account?{" "}
              <Link to="/register" className="text-primary font-medium hover:underline">
                Sign Up
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Login;
