import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Home from "./views/home";
import ErrorPage from "./views/error";

import "./App.scss";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
      errorElement: <ErrorPage />,
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
