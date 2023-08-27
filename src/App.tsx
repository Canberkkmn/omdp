import { lazy, Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import ErrorPage from "./views/error";
import SplashScreen from "./components/common/SplashScreen/SplashScreen";

import "./App.scss";

const HomePageLazy = lazy(() => import("./views/home"));
const MoviePageLazy = lazy(() => import("./views/movie"));

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <Suspense fallback={<SplashScreen />}>
          <HomePageLazy />
        </Suspense>
      ),
      errorElement: <ErrorPage />,
    },
    {
      path: "/item/:id",
      element: (
        <Suspense fallback={<SplashScreen />}>
          <MoviePageLazy />
        </Suspense>
      ),
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
