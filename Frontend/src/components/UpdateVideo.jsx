import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { MdPublic } from "react-icons/md";
import { AiFillLock } from "react-icons/ai";
import { TextField } from "@mui/material";
import { FileUploader } from "react-drag-drop-files";
function UpdateVideo() {
  const { videoID } = useParams();
  const [vid, setVid] = useState();
  const [togglePublic, setTogglePublic] = useState(true);
  const thumbnailFileTypes = ["JPG", "PNG", "JPEG"];
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
  if (vid) console.log(vid);
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
      <div className="mt-4">
        <TextField
          className="bg-violet-400/60 text-white"
          label="Title"
          variant="outlined"
          placeholder={vid?.title}
          size="small"
          fullWidth
        />
        <TextField
          className="bg-violet-400/60 text-white"
          label="Description"
          variant="outlined"
          size="large"
          multiline
          fullWidth
          InputProps={{
            style: {
              overflowWrap: "break-word", // Wrap long words onto the next line
            },
          }}
        />
        <label className="text-white font-semibold ">Thumbnail</label>
        <FileUploader
          handleChange={handleChangeThumbnail}
          name="file"
          types={thumbnailFileTypes}
        />
      </div>
    </div>
  );
}

export default UpdateVideo;
