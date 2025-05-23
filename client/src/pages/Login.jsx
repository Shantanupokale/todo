import React, { useState } from "react";
import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "../components/ui/card";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { Eye, EyeOff } from "lucide-react"; // Import Eye icons
import Particles from "../components/ui/Particles"; // Import Particles

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle login
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("https://todo-rust-seven-55.vercel.app/api/users/login", {
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
        setTimeout(() => navigate("/dashboard"), 1500);
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

      {/* Login Card with Glassmorphism Effect */}
      <div className="relative z-10">
        <Card className="w-full max-w-md bg-black-900/80 border border-gray-700 p-8 shadow-lg rounded-2xl backdrop-blur-sm">
          <CardHeader>
            <h2 className="text-3xl font-pressStart font-bold text-center text-white">
              Welcome Back
            </h2>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-6">
              {/* Email */}
              <div className="grid gap-3">
                <Label htmlFor="email" className="text-gray-400">
                  Email
                </Label>
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
                <Label htmlFor="password" className="text-gray-400">
                  Password
                </Label>
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

              {/* Login Button with Popup Effect */}
              <Button
                type="submit"
                className="w-full bg-primary text-black font-pressStart font-bold relative transition-all duration-300 
                      hover:translate-x-1 hover:-translate-y-1 
                      hover:shadow-[4px_4px_0px_rgba(255,255,255,0.9)]"
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
