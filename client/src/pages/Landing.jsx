import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import Particles from "../components/ui/Particles";
import { motion } from "framer-motion";
import { useState } from "react";

const Landing = () => {
  const [hoveringSignIn, setHoveringSignIn] = useState(false);
  const token = localStorage.getItem("token");
  return (
    <div className="relative bg-black text-white min-h-screen flex flex-col items-center justify-center px-4 overflow-hidden">
      {/* Particle Background */}
      <div className="absolute inset-0 z-0">
        <Particles particleCount={150} speed={0.2} />
      </div>

      {/* Hero Section */}
      <motion.section 
        className="relative z-10 w-full max-w-3xl text-center py-16 md:py-32"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-xl sm:text-2xl md:text-4xl font-bold mb-4 md:mb-6">
          Organize Your Life with Ease
        </h1>
        <p className="text-gray-400 text-sm md:text-base mb-6 px-2">
          A sleek and powerful to-do app to manage your tasks efficiently.
        </p>
        <div className="flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-4">
          {/* Get Started Button */}
          <Button
            asChild
            className={`w-full sm:w-auto relative transition-all duration-300 
                      hover:translate-x-1 hover:-translate-y-1 
                      hover:shadow-[4px_4px_0px_rgba(255,255,255,0.9)] ${
                        hoveringSignIn ? "bg-white text-black border border-gray-600" : "bg-primary text-black"
                      }`}
          >
             <Link to={token ? "/dashboard" : "/register"}>Get Started</Link>
            {/* <Link to="/register">Get Started</Link> */}
          </Button>

          {/* Sign In Button */}
          <Button
            asChild
            variant="outline"
            className="w-full sm:w-auto relative transition-all duration-300 
                       text-black hover:bg-green-500 hover:text-white 
                       hover:translate-x-1 hover:-translate-y-1 
                       hover:shadow-[4px_4px_0px_rgba(255,255,255,0.9)]"
            onMouseEnter={() => setHoveringSignIn(true)}
            onMouseLeave={() => setHoveringSignIn(false)}
          >
            <Link to="/login">Sign In</Link>
          </Button>
        </div>
      </motion.section>

      {/* Footer */}
      <footer className="relative z-10 w-full text-center pb-4 text-gray-400 text-xs">
        <p>Made with ❤️ by Shantanu</p>
      </footer>
    </div>
  );
};

export default Landing;
