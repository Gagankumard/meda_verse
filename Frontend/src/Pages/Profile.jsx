import { Avatar } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import coverImage2 from "../assets/proxy (39).jpeg";
import axios from "axios";
import ActionAreaCard from "../components/HomeCard";
import { CgOptions } from "react-icons/cg";
import { MdPublic } from "react-icons/md";
import { AiFillLock } from "react-icons/ai";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
function Profile({ admin = true }) {
  const [subInfo, setSubInfo] = useState();
  const [videos, setVideos] = useState([]);
  const [privateVid, setPrivateVid] = useState([]);
  const [togglePublic, setTogglePublic] = useState(true);

  const navigate = useNavigate();
  const location = useLocation();
  const userData = useSelector((state) => state.auth.userData);
  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const res = await axios.get(
          `/api/v1/users/get-user-channel/${userData?.username}`
        );
        if (res.status === 200) {
          console.log(res);
          setSubInfo(res?.data?.data);
        }
      } catch (err) {
        console.log(err.response);
      }
    };
    const fetchVideo = async () => {
      try {
        const res = await axios.get("/api/v1/videos/getAllVideos", {
          params: { userId: userData?._id },
        });
        setVideos(res?.data?.data);
      } catch (err) {
        console.log(err);
      }
    };
    const fetchPrivateVid = async () => {
      try {
        const res = await axios.get("/api/v1/videos/privateVideo");
        if (res?.data.success) {
          setPrivateVid(res?.data?.data);
        }
      } catch (err) {
        console.log(err.response);
      }
    };
    fetchVideo();
    getUserInfo();
    fetchPrivateVid();
  }, []);
  console.log(privateVid);
  useEffect(() => {
    if (location.pathname !== "/profile") {
      document.body.style.overflowY = "hidden";
    } else {
      document.body.style.overflowY = "auto";
    }
    return () => {
      document.body.style.overflowY = "auto";
    };
  }, [location.pathname]);
  return (
    <div className={` flex flex-col justify-center items-center pb-10 `}>
      <div className={``}>
        <div className={`${location.pathname !== "/profile" && "blur"}`}>
          <img
            src={userData?.coverImage || coverImage2}
            alt="coverImage"
            className="h-64 w-[80vw] object-cover"
          />
          <div className="flex justify-around bg-violet-500/30">
            <div className="p-4 flex gap-16">
              <Avatar
                src={userData?.avatar}
                sx={{ width: 350, height: 350 }}
                className="ring ring-violet-700"
              />
              <div className="flex flex-col justify-center items-center">
                <h1 className="text-4xl font-bold text-white">
                  {userData?.fullName}
                </h1>
                <p className="text-2xl font-semibold text-gray-600">
                  {userData?.username}
                </p>
              </div>
            </div>
            <div className=" rounded-lg text-white flex justify-center items-center gap-5">
              <div className="flex flex-col justify-center items-center bg-violet-700 p-2 rounded-md">
                <h1 className="text-2xl font-bold">
                  {subInfo?.subscribersCount}
                </h1>
                <p className="text-lg font-semibold">Subscribers Count</p>
              </div>
              <div className="flex flex-col justify-center items-center bg-violet-700 p-2 rounded-md">
                <h1 className="text-2xl font-bold">
                  {subInfo?.channelSubscribedToCount}
                </h1>
                <p className="text-lg font-semibold">Channel Subscribed to</p>
              </div>
            </div>
            <div className="text-white p-3">
              <button
                className="p-2 bg-violet-700 rounded-md text-sm hover:bg-violet-900 ring-1 ring-white"
                onClick={() =>
                  location.pathname === "/profile" &&
                  navigate("/profile/update")
                }
              >
                Update Info
              </button>
            </div>
          </div>
        </div>
        {location.pathname !== "/profile" && (
          <div className=" w-[20vw] h-[20vw] top-[40%] left-[40%] bg-black rounded-md z-[9999] border-violet-700 border-spacing-9 border-2 fixed">
            <Outlet />
          </div>
        )}

        <div className={`${location.pathname !== "/profile" && "blur"}`}>
          <h1 className="text-white font-bold text-3xl p-2">Your Videos</h1>
          <p className="text-violet-700 font-semibold my-5">
            {togglePublic
              ? videos.length === 0 && "No videos"
              : privateVid.length === 0 && "No Private videos"}
          </p>
          <div className="flex gap-5 text-white mb-5">
            <div
              className={`border-white border rounded-md p-2 w-16 flex ${
                togglePublic ? "justify-start" : "justify-end"
              }`}
              onClick={() => setTogglePublic((prev) => !prev)}
            >
              {togglePublic ? <MdPublic /> : <AiFillLock />}
            </div>
            <p className="p-2">{togglePublic ? "Public" : "Private"}</p>
          </div>

          <div>
            <ul className="flex gap-10 flex-wrap">
              {(togglePublic ? videos : privateVid)?.map((vid) => (
                <li key={vid._id}>
                  <div
                    className="p-2 bg-gray-400/40 hover:bg-gray-600/10 w-fit rounded-t-md"
                    onClick={() => {
                      location.pathname === "/profile" &&
                        navigate(`/profile/video/update/${vid._id}`);
                    }}
                  >
                    <CgOptions className="text-white" size={24} />
                  </div>
                  <ActionAreaCard {...vid} />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
