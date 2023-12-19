import { ClientResponseError } from "pocketbase";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import pb from "./lib/pocketbase";

type FormData = { name: string; email: string; password: string; passwordConfirm: string };

export default () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<FormData>({
    defaultValues: {
      name: "Manuel Jiménez",
      email: "man.jime@gmail.com",
      password: "Salo2014",
      passwordConfirm: "Salo2014",
    },
  });

  const signup = async (data: FormData) => {
    try {
      const record = await pb.collection("users").create({
        name: data.name,
        email: data.email,
        password: data.password,
        passwordConfirm: data.passwordConfirm,
      });
      console.log(record);
      navigate("/login");
    } catch (e) {
      if (e instanceof ClientResponseError) {
        const data = e.response.data as { [field: string]: { code: string; message: string } };

        console.error(JSON.stringify(data, null, 2));
        if (data["name"]) {
          setError("name", { type: data["name"].code, message: data["name"].message });
        }
        if (data["email"]) {
          setError("email", { type: data["email"].code, message: data["email"].message });
        }
        if (data["password"]) {
          setError("password", { type: data["password"].code, message: data["password"].message });
        }
        if (data["passwordConfirm"]) {
          setError("passwordConfirm", { type: data["passwordConfirm"].code, message: data["passwordConfirm"].message });
        }
      } else {
        console.error(e);
      }
    }
  };

  const googleSignup = async () => {
    try {
      const authData = await pb.collection("users").authWithOAuth2({ provider: "google" });
      navigate("/");
    } catch (e) {
      if (e instanceof ClientResponseError) {
        console.error(JSON.stringify(e, null, 2));
      } else {
        console.error(e);
      }
    }
  };

  return (
    <main className="w-full h-screen flex flex-col items-center justify-center bg-gray-50 sm:px-4">
      <div className="w-full space-y-6 text-gray-600 sm:max-w-md">
        <div className="text-center">
          <div className="mt-5 space-y-2">
            <h3 className="text-gray-800 text-2xl font-bold sm:text-3xl">Create an account</h3>
            <p className="">
              Already have an account?{" "}
              <a href="login" className="font-medium text-indigo-600 hover:text-indigo-500">
                Log in
              </a>
            </p>
          </div>
        </div>
        <div className="bg-white shadow p-4 py-6 sm:p-6 sm:rounded-lg">
          <form onSubmit={handleSubmit(signup)} className="space-y-5">
            <div>
              <label className="font-medium">Name</label>
              <input
                type="text"
                {...register("name")}
                required
                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
              />{" "}
              {errors.name && <p>{errors.name.message}</p>}
            </div>
            <div>
              <label className="font-medium">Email</label>
              <input
                type="email"
                {...register("email")}
                required
                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
              />
              {errors.email && <p>{errors.email.message}</p>}
            </div>
            <div>
              <label className="font-medium">Password</label>
              <input
                type="password"
                {...register("password")}
                required
                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
              />{" "}
              {errors.password && <p>{errors.password.message}</p>}
            </div>
            <div>
              <label className="font-medium">Confirm Password</label>
              <input
                type="password"
                {...register("passwordConfirm")}
                required
                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
              />{" "}
              {errors.passwordConfirm && <p>{errors.passwordConfirm.message}</p>}
            </div>
            <button
              type="submit"
              className="w-full px-4 py-2 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150"
            >
              Create account
            </button>
          </form>
          <div className="mt-5">
            <button
              onClick={googleSignup}
              className="w-full flex items-center justify-center gap-x-3 py-2.5 mt-5 border rounded-lg text-sm font-medium hover:bg-gray-50 duration-150 active:bg-gray-100"
            >
              <svg className="w-5 h-5" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clip-path="url(#clip0_17_40)">
                  <path
                    d="M47.532 24.5528C47.532 22.9214 47.3997 21.2811 47.1175 19.6761H24.48V28.9181H37.4434C36.9055 31.8988 35.177 34.5356 32.6461 36.2111V42.2078H40.3801C44.9217 38.0278 47.532 31.8547 47.532 24.5528Z"
                    fill="#4285F4"
                  />
                  <path
                    d="M24.48 48.0016C30.9529 48.0016 36.4116 45.8764 40.3888 42.2078L32.6549 36.2111C30.5031 37.675 27.7252 38.5039 24.4888 38.5039C18.2275 38.5039 12.9187 34.2798 11.0139 28.6006H3.03296V34.7825C7.10718 42.8868 15.4056 48.0016 24.48 48.0016Z"
                    fill="#34A853"
                  />
                  <path
                    d="M11.0051 28.6006C9.99973 25.6199 9.99973 22.3922 11.0051 19.4115V13.2296H3.03298C-0.371021 20.0112 -0.371021 28.0009 3.03298 34.7825L11.0051 28.6006Z"
                    fill="#FBBC04"
                  />
                  <path
                    d="M24.48 9.49932C27.9016 9.44641 31.2086 10.7339 33.6866 13.0973L40.5387 6.24523C36.2 2.17101 30.4414 -0.068932 24.48 0.00161733C15.4055 0.00161733 7.10718 5.11644 3.03296 13.2296L11.005 19.4115C12.901 13.7235 18.2187 9.49932 24.48 9.49932Z"
                    fill="#EA4335"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_17_40">
                    <rect width="48" height="48" fill="white" />
                  </clipPath>
                </defs>
              </svg>
              Continue with Google
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};
