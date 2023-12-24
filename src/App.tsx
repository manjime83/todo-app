import Home from "@/pages/Home";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([{ path: "/", element: <Home /> }]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
