"use server";

import { cookies } from "next/headers";

async function getRefreshToken() {
  const cookieStore = await cookies();
  const token = cookieStore.get("refreshToken")?.value;

  return token;
}

async function setRefreshToken(refreshToken: string) {
  const cookieStore = await cookies();
  cookieStore.set({
    name: "refreshToken",
    value: refreshToken,
    httpOnly: true,
  });
}

async function clearRefreshToken() {
  const cookieStore = await cookies();
  cookieStore.delete("refreshToken");
}

export { getRefreshToken, setRefreshToken, clearRefreshToken };