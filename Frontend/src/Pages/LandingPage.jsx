import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { useSelector } from "react-redux";
import axios from "axios";
import ActionAreaCard from "../components/HomeCard";
import { Outlet } from "react-router-dom";

function LandingPage() {
  const userStatus = useSelector((state) => state.status);
  return (
    <div className="bg-gradient-to-r from-slate-900 to-black min-h-screen">
      <Header stauts={userStatus} />
      <Outlet />
    </div>
  );
}

export default LandingPage;
