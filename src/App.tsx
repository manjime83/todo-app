import Home from "@/pages/Home";
import SignUp from "@/pages/SignUp";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import PageLayout from "./layouts/PageLayout";

export const router = createBrowserRouter([
  {
    element: <PageLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/signup", element: <SignUp /> },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
