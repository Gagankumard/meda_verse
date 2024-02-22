import { useState } from "react";
import { Outlet } from "react-router-dom";
function App() {
  return (
    <div className="bg-blk bg-cover">
      <Outlet />
    </div>
  );
}

export default App;
