import pb from "./lib/pocketbase";

type FormData = { name: string; email: string; password: string; passwordConfirm: string };

export default () => {
  console.log(pb.authStore);

  return (
    <main className="w-full h-screen flex flex-col items-center justify-center bg-gray-50 sm:px-4">
      <div className="w-full space-y-6 text-gray-600 sm:max-w-md">
        {pb.authStore.model?.id} {pb.authStore.model?.name} {pb.authStore.model?.email}
      </div>
    </main>
  );
};
