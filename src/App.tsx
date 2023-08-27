import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Home from "./views/home";
import ErrorPage from "./views/error";
import MoviePage from "./views/movie";

import "./App.scss";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
      errorElement: <ErrorPage />,
    },
    {
      path: "/item/:id",
      element: <MoviePage />,
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
