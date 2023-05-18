"use client";

import {
  ComponentProps,
  type FC,
  type PropsWithChildren,
} from "react";
import { LiteralUnion, signIn, signOut } from "next-auth/react";
import { BuiltInProviderType } from "next-auth/providers";

type ButtonProps = PropsWithChildren & ComponentProps<"button">;

export const Button: FC<ButtonProps> = ({ children, ...rest }) => {
  return (
    <button
      type="button"
      className="
      inline-flex items-center justify-center gap-2
      text-white text-sm bg-sky-500 hover:bg-sky-700 font-medium rounded-lg 
      px-5 py-2.5 mr-2 mb-2 dark:bg-sky-600 dark:hover:bg-sky-700
      "
      {...rest}
    >
      {children}
    </button>
  );
};

type SignInTypes = LiteralUnion<BuiltInProviderType>;
type SignInButtonType = ButtonProps & {
  signInType?: SignInTypes;
};

export const SignInButton:FC<SignInButtonType> = ({ children, signInType, ...rest }) => {
  return (
    <Button onClick={() => signIn(signInType)} {...rest}>
      {children}
    </Button>
  );
};

export const SignOutButton = () => {
  return (
    <Button style={{ marginRight: 10 }} onClick={() => signOut()}>
      Sign Out
    </Button>
  );
};
