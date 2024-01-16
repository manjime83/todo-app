import { buttonVariants } from "@/components/ui/button";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center gap-y-4">
      <h1 className="text-9xl font-bold">404</h1>
      <h2 className="text-3xl font-light">Page Not Found</h2>
      <p className="my-6">Sorry, the page you are looking for could not be found.</p>
      <Link to="/" className={buttonVariants({ variant: "default" })}>
        Back to Homepage
      </Link>
    </div>
  );
};

export default NotFound;
