import { Toaster } from "@/components/ui/toaster";
import { Outlet } from "react-router-dom";

const PageLayout = () => {
  return (
    <>
      <Outlet />
      <Toaster />
    </>
  );
};

export default PageLayout;
