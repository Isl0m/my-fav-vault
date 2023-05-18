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
      </div>
    </main>
  );
};

export default Auth;
