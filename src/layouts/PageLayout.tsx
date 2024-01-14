import { Toaster } from "@/components/ui/toaster";
import { Outlet } from "react-router-dom";

const PageLayout = () => {
  return (
    <div className="mx-auto flex min-h-screen max-w-screen-md items-center justify-center">
      <Outlet />
      <Toaster />
    </div>
  );
};

export default PageLayout;
