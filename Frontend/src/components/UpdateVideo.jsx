import axios from "axios";
import React, { useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { MdPublic } from "react-icons/md";
import { AiFillLock } from "react-icons/ai";
import { TextField } from "@mui/material";
import { FileUploader } from "react-drag-drop-files";
import { AiOutlineDelete } from "react-icons/ai";
import { BeatLoader } from "react-spinners";
function UpdateVideo() {
  const navigate = useNavigate();
  const { videoID } = useParams();
  const [vid, setVid] = useState();
  const [togglePublic, setTogglePublic] = useState(true);
  const thumbnailFileTypes = ["JPG", "PNG", "JPEG"];
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const getVideo = async () => {
      try {
        const res = await axios.get(`/api/v1/videos/fetchVideo/${videoID}`);
        if (res?.data.success) {
          setVid(res?.data?.data[0]);
        }
      } catch (err) {
        console.log(err.response);
      }
    };
    getVideo();
  }, []);
  const handleChangeThumbnail = (file) => {
    // setThumbnail(file);
  };
  const handleBack = () => {
    if (page === 1) {
      navigate("/profile");
    } else {
      setPage(1);
    }
  };
  const handleSave = () => {
    if (page === 1) {
      setPage(2);
    } else {
      console.log("saved");
    }
  };
  const handleDelete = async () => {
    try {
      setIsLoading(true);
      const confirm = window.confirm("Are you sure about deleting the video?");
      if (confirm) {
        const res = await axios.delete(`/api/v1/videos/delete/${vid?._id}`);
        if (res?.data?.success) {
          setIsLoading(false);
          navigate("/");
        }
      }
    } catch (err) {
      setIsLoading(false);
      console.log(err.response);
    }
  };
  return (
    <div className="text-white p-2">
      <h1 className="font-semibold text-center">Update Video</h1>
      <div className="flex mt-3 gap-5">
        <div className="w-36 h-16 object-contain overflow-hidden">
          <img src={vid?.thumbnail} alt="thumbnail" />
        </div>
        <div>
          <h1 className="font-bold">{vid?.title}</h1>
          <div className="flex gap-5">
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
        </div>
      </div>
      <div className="mt-4 flex flex-col gap-5">
        {page === 1 && (
          <>
            {" "}
            <TextField
              className="bg-violet-400/60 mb-3 text-white"
              label="Title"
              variant="outlined"
              placeholder={vid?.title}
              size="small"
              fullWidth
            />
            <label className="text-white font-semibold ">Thumbnail</label>
            <FileUploader
              handleChange={handleChangeThumbnail}
              name="file"
              types={thumbnailFileTypes}
            />
          </>
        )}

        {page === 2 && (
          <TextField
            className="bg-violet-400/60 text-white"
            label="Description"
            variant="outlined"
            size="small"
            multiline
            fullWidth
            placeholder={vid?.description.slice(0, 20)}
            inputProps={{ maxLength: 100 }}
            InputProps={{
              style: {
                overflowWrap: "break-word", // Wrap long words onto the next line
                fontSize: "small",
              },
            }}
          />
        )}
      </div>

      <div className="flex justify-around mt-5">
        <div
          className="p-2 flex-1 flex justify-center items-center hover:bg-violet-700/70 transition cursor-pointer"
          onClick={handleBack}
        >
          {page === 1 ? "Profile" : "Back"}
        </div>

        <div
          className="p-2 flex-1 flex justify-center items-center hover:bg-violet-700/70 transition cursor-pointer"
          onClick={handleSave}
        >
          {page === 2 ? "Save" : "Next"}
        </div>
      </div>
      {page === 2 && (
        <div>
          <h1 className="font-semibold">Do you want to delete the video?</h1>
          <div
            className="w-full cursor-pointer mt-3 hover:bg-red-800 bg-red-600 flex justify-center items-center p-3"
            onClick={handleDelete}
          >
            {isLoading ? (
              <BeatLoader color="rgba(54, 99, 214, 1)" />
            ) : (
              <AiOutlineDelete size={24} />
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default UpdateVideo;
