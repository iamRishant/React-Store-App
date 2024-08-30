import React from "react";
import Home from "./Components/Home";
import { Link, Route, Routes, useLocation } from "react-router-dom";
import Details from "./Components/Details";
import Create from "./Components/Create";
import Edit from "./Components/Edit";


const App = () => {
  const {search,pathname}=useLocation();
  // console.log(search,pathname);//search btaege ? wala and pathname path btata hai to agar home par hai search empty hota hai and path /


  return (
    // we dont want ki home page par home button dikhe
    <div className=" h-screen w-full flex">
      {
        
        (pathname!="/" || search.length>0) && <Link to="/" className="absolute right-[8%] top-[3%] text-xl bg-red-500 text-white font-semibold px-3 py-1 rounded-md">Home</Link>
      }
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/details/:id" element={<Details/>} />
        <Route path="/create" element={<Create/>} />
        <Route path="/edit/:id" element={<Edit/>} />


      </Routes>
      
     
    </div>
  );
};

export default App;
