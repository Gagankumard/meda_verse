import React from "react";
import logout from "../assets/logout.png";
function LoggedOut() {
  return (
    <div className="mt-36 pl-36 flex justify-center items-center flex-col">
      <p className="p-2 text-3xl font-bold text-white">Login pls</p>
      <img src={logout} width={350} />
    </div>
  );
}

export default LoggedOut;
