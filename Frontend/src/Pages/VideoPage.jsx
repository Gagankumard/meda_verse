import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ReactPlayer from "react-player";
import { IoIosArrowDropdownCircle } from "react-icons/io";
import Comments from "../components/Comments";
import { Avatar } from "@mui/material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
function VideoPage() {
  const { videoID } = useParams();
  const [video, setVideo] = useState();
  const [showDetails, setShowDetails] = useState(false);
  useEffect(() => {
    const getVideo = async () => {
      try {
        const res = await axios.get(`/api/v1/videos/fetchVideo/${videoID}`);
        if (res.status === 202) {
          setVideo(res?.data?.data[0]);
        }
      } catch (err) {
        console.log(err);
      }
    };
    getVideo();
  }, []);
  // if (video) console.log(video);
  return (
    <div className=" flex flex-col justify-center items-center pb-10">
      <div className=" mt-36">
        <h1 className="text-white font-bold text-3xl my-10">
          Play Now..! Watch Now..! Enjoy Now..!
        </h1>
        <ReactPlayer
          url={video?.videoFile}
          playIcon
          controls={true}
          config={{
            youtube: {
              playerVars: { showinfo: 1 },
            },
            facebook: {
              appId: "12345",
            },
          }}
          height={720}
          width={1280}
        />
        <div className="flex justify-between">
          <h1 className="text-3xl font-bold text-white my-5 ml-4">
            {video?.title}
          </h1>
          <IoIosArrowDropdownCircle
            size={32}
            className="text-white my-5"
            onClick={() => {
              setShowDetails((state) => !state);
            }}
          />
        </div>
        <div className="flex justify-between mb-4">
          <div className="flex gap-4 align-middle justify-center ">
            <Avatar
              src={video?.owner[0].avatar}
              size="50"
              className="my-auto"
            />

            <h1 className="text-3xl font-semibold p-2 text-violet-700">
              {video?.owner[0].username}
            </h1>
          </div>
          <button className="p-4 hover:bg-violet-950 text-white bg-violet-700 rounded-lg font-semibold">
            Subscribe
          </button>
        </div>
        {showDetails && (
          <div className="bg-gray-700 p-4 mb-4 rounded-md text-gray-500 ml-4">
            <p>{video?.createdAt.slice(0, 10)}</p>
            <p>{video?.description}</p>
          </div>
        )}
      </div>
      <div className="mb-10 flex w-[60vw] justify-start">
        <div className="bg-violet-700 p-3 rounded-s-md hover:bg-violet-900 transition">
          <ThumbUpIcon style={{ fill: "white" }} />
        </div>
        <div className="bg-violet-700 p-3 rounded-e-md hover:bg-violet-900 transition">
          <ThumbDownIcon style={{ fill: "white" }} />
        </div>
      </div>
      <div>{video && <Comments id={video?._id} />}</div>
    </div>
  );
}

export default VideoPage;
