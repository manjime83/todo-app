import PageLayout from "@/layouts/PageLayout";
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import NotFound from "@/pages/NotFound";
import SignUp from "@/pages/SignUp";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
  {
    element: <PageLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "login", element: <Login /> },
      { path: "signup", element: <SignUp /> },
      { path: "*", element: <NotFound /> },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
