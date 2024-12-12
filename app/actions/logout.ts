"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function logout() {
  // Delete the authentication cookie
  cookies().delete("token-client");

  // Redirect to homepage
  redirect("/");
}
