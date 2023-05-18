import { SignInButton, SignOutButton } from "../components/buttons.component";
import { BsGithub, BsGoogle } from "react-icons/bs";
import { User } from "../components/user.component";

const Auth = async () => {
  return (
    <main className="min-h-screen ">
      <div className="flex flex-col items-center justify-between gap-8 max-w-xl mx-auto">
        <div className="text-center">
          <User />
          <h1 className="text-4xl text-slate-900 text-center font-semibold">
            Get started
          </h1>
          <p className="mt-2 text-sm text-slate-500">Create new accout</p>
        </div>
        <div className="flex flex-col">
          <SignInButton signInType="google">
            Continue with Google <BsGoogle />
          </SignInButton>
          <SignInButton signInType="github">
            Continue with GitHub <BsGithub />
          </SignInButton>
          <SignOutButton />
        </div>
        <form>
          <div>
            <label
              htmlFor="email"
              className="block my-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
              focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 
              dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
              placeholder="you@example.com"
              required
            />
            <label
              htmlFor="password"
              className="block my-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
              focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 
              dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
              placeholder="*****"
              required
            />
            <button
              type="button"
              className="text-white bg-sky-500 hover:bg-sky-700 font-medium rounded-lg 
            text-sm px-5 py-2.5 mt-4 dark:bg-sky-600 dark:hover:bg-sky-700"
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default Auth;
