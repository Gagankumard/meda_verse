import React from "react";
import { useNavigate } from "react-router-dom";

function UpdateProfile() {
  const navigate = useNavigate();
  return (
    <div>
      <div className=" flex justify-center items-center mt-auto">
        <button
          className="text-white font-semibold p-2 rounded-md bg-violet-700"
          onClick={() => navigate("/profile")}
        >
          Save
        </button>
      </div>
    </div>
  );
}

export default UpdateProfile;
