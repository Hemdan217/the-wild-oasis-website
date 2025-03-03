"use server";
import { signIn, signOut } from "./auth";

export const signInAction = async () => {
  await signIn("github", { redirectTo: "/account" });
};
export const signOutAction = async () => {
  await signOut();
};
