import { motion } from "framer-motion";
import { useState } from "react";

function HomeNavBar() {
  localStorage.clear();
  
  const [activeLink, setActiveLink] = useState("");
  const linkClassName = (link : string) => {
    return `text-black ${
      activeLink === link ? "bg-gray-700 text-white" : "hover:bg-gray-700 hover:text-white"
    } px-3 py-2 rounded-md text-lg font-sans`
  };
  
  const navVariants = {
    hidden: {
      opacity: 0,
      y: 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.2,
        ease: "easeOut",
      },
    },
  };
  return (
    <nav className="bg-green-500">
      <div className="flex items-center justify-center h-20">
      <a href = "/" className="absolute left-5 text-lg font-semibold text-slate-900">Cook Anything</a>
        <motion.div
          initial="hidden"
          animate="visible"
          variants={navVariants}
        >
          <a href="/Login" 
          className={linkClassName("login")}
          onClick = {(e) => setActiveLink("login")}>
            Log In
          </a>
          <a href="/Createaccount" 
          className={linkClassName("createaccount")}
          onClick = {(e) => setActiveLink("createaccount")}>
            Create account
          </a>
          <a href="/Aboutus" 
          className={linkClassName("aboutus")}
          onClick = {(e) => setActiveLink("aboutus")}>
            About us
          </a>
        </motion.div>
      </div>
    </nav>
  );
}

export default HomeNavBar;