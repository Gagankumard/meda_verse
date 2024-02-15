import { Avatar } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import coverImage2 from "../assets/proxy (39).jpeg";
function Profile() {
  const userData = useSelector((state) => state.userData);
  console.log(userData);
  return (
    <div className=" flex flex-col justify-center items-center pb-10">
      <div>
        <img
          src={userData?.coverImage || coverImage2}
          alt="coverImage"
          className="h-96 w-[80vw] object-cover"
        />
        <div className="p-4 flex gap-16">
          <Avatar src={userData?.avatar} sx={{ width: 350, height: 350 }} />
          <div className="flex flex-col justify-center items-center">
            <h1 className="text-4xl font-bold text-white">
              {userData?.fullName}
            </h1>
            <p className="text-2xl font-semibold text-gray-600">
              {userData?.username}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
