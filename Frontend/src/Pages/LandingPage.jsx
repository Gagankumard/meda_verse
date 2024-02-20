import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { useSelector } from "react-redux";
import axios from "axios";
import ActionAreaCard from "../components/HomeCard";
import { Outlet } from "react-router-dom";
import ListIcon from "@mui/icons-material/List";
import MenuComponent from "../components/MenuComponent";
import LoggedOut from "../components/LoggedOut";
function LandingPage() {
  const userStatus = useSelector((state) => state.status);
  const [sideBar, setSideBar] = useState(false);

  return (
    <div className="bg-gradient-to-r from-slate-900 to-black min-h-screen ">
      <div className="relative">
        <Header stauts={userStatus} />
      </div>
      <div className="flex relative">
        <div className="sticky top-32 h-full  p-4">
          <div className="flex  align-middle mt-10">
            <ListIcon style={{ fill: "violet", fontSize: 40 }} />
            <label htmlFor="" className="text-white  text-3xl ml-5 font-bold">
              Menu
            </label>
          </div>
          <MenuComponent status={userStatus} />
        </div>
        <div className="mx-10 w-[80vw] flex flex-col min-h-screen  pt-36">
          {userStatus ? <Outlet /> : <LoggedOut />}
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
