import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ActionAreaCard from "../components/HomeCard";
function AllVideos() {
  const userStatus = useSelector((state) => state.status);
  const [videos, setVideos] = useState();
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const fetchVideo = async () => {
      setIsLoading(true);
      try {
        const res = await axios.get("/api/v1/videos/getAllVideos");
        setVideos(res?.data?.data);
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchVideo();
  }, []);
  return (
    <div className="m-10 w-[80vw] flex flex-col items-center ">
      <div>
        <h1 className="text-3xl font-bold text-white mb-10 ">All Videos</h1>
        <ul className="flex gap-10 flex-wrap">
          {videos &&
            videos.map((vid) => (
              <li
                key={vid?._id}
                className=" hover:shadow-violet-700 hover:shadow-xl transition"
              >
                <ActionAreaCard {...vid} />
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}

export default AllVideos;
