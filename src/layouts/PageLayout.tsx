import { Toaster } from "@/components/ui/toaster";
import { Outlet } from "react-router-dom";

const PageLayout = () => {
  return (
    <div className="absolute top-0 z-[-2] h-screen w-screen bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.4),hsl(var(--primary)))]">
      <div className="mx-auto flex min-h-screen max-w-screen-md items-center justify-center">
        <Outlet />
        <Toaster />
      </div>
    </div>
  );
};

export default PageLayout;
