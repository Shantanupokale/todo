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
import { Link } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";
import Particles from "../components/ui/Particles"; // Import Particles
import { Eye, EyeOff } from "lucide-react";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  console.log(formData);

  // Handle registration
  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/users/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Registration Successful!");
        setTimeout(() => navigate("/login"), 2000);
      } else {
        toast.error(data.message || "Something went wrong!");
      }
    } catch (error) {
      console.error("Error registering user:", error);
      toast.error("Server error, please try again.");
    }
  };

  return (
    <div className="h-screen flex justify-center items-center bg-black text-white font-pressStart relative">
      {/* Particle Background */}
      <div className="absolute inset-0 z-0">
        <Particles
          particleColors={["#ffffff", "#ffffff"]}
          particleCount={200}
          particleSpread={10}
          speed={0.1}
          particleBaseSize={100}
          moveParticlesOnHover={false}
          alphaParticles={false}
          disableRotation={false}
        />
      </div>

      {/* Toast Container */}
      {/* <Toaster /> */}

      {/* Register Card with Glassmorphism Effect */}
      <div className="relative z-10">
        <Card className="w-full max-w-md bg-black80 border border-gray-700 p-8 shadow-lg rounded-2xl backdrop-blur-sm">
          <CardHeader>
            <h2 className="text-2xl font-pressStart font-bold text-center text-white">
              Create an Account
            </h2>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleRegister} className="space-y-6">
              <div className="grid gap-3">
                <Label htmlFor="name" className="text-gray-400">
                  Username
                </Label>
                <Input
                  id="username"
                  name="username"
                  type="text"
                  placeholder="Enter your username"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="bg-gray-800 text-white border-gray-600 placeholder-gray-500"
                />
              </div>

              <div className="grid gap-3">
                <Label htmlFor="email" className="text-gray-400">
                  Email
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="bg-gray-800 text-white border-gray-600 placeholder-gray-500"
                />
              </div>

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
                    required
                    value={formData.password}
                    onChange={handleChange}
                    className="bg-gray-800 text-white border-gray-600 placeholder-gray-500 pr-10"
                  />
                  {/* Eye Icon for Show/Hide Password */}
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
                className="w-full bg-primary hover:bg-primary-dark text-black font-pressStart font-bold"
              >
                Sign Up
              </Button>
            </form>
          </CardContent>
          <CardFooter className="text-center">
            <p className="text-sm text-gray-400">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-primary font-medium hover:underline"
              >
                Login
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Register;
