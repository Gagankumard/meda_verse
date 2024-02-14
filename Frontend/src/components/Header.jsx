import React, { useState } from "react";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";
import { SearchBar } from "./SearchBar";

function Header({ status }) {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="h-32 flex justify-around shadow-violet-700 shadow-xl items-center text-white">
      <div
        className="p-3"
        onClick={() => {
          navigate("/");
        }}
      >
        <h1 className="m-4 text-4xl cursor-pointer font-poppins">
          Play<b className="text-violet-700">Now</b>
        </h1>
      </div>
      <div>
        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      </div>
    </div>
  );
}

export default Header;
