import { Navigate } from "react-router-dom";
import pb from "./lib/pocketbase";

export default () => {
  const logout = () => {
    pb.authStore.clear();
  };

  if (!pb.authStore.isValid) {
    return <Navigate to="/login" />;
  }

  return (
    <main className="w-full h-screen flex flex-col items-center justify-center bg-gray-50 sm:px-4">
      <div className="w-full space-y-6 text-gray-600 sm:max-w-md">
        {pb.authStore.model?.id} {pb.authStore.model?.name} {pb.authStore.model?.email}
        <button onClick={logout}>Logout</button>
      </div>
    </main>
  );
};
