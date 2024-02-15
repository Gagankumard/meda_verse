import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
// import Login from "./Pages/Login.jsx";
import Signup from "./Pages/Signup.jsx";
import SignInSide from "./Pages/Login.jsx";
import Login from "./Pages/Login.jsx";
import { Provider } from "react-redux";
import { store } from "./store/store.js";
import LandingPage from "./Pages/LandingPage.jsx";
import AllVideos from "./components/AllVideos.jsx";
import VideoPage from "./Pages/VideoPage.jsx";
import Publish from "./Pages/Publish.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <LandingPage />,
        children: [
          {
            path: "/",
            element: <AllVideos />,
          },
          {
            path: "/:videoID",
            element: <VideoPage />,
          },
          {
            path: "/publish",
            element: <Publish />,
          },
        ],
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
    ],
  },
]);
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
