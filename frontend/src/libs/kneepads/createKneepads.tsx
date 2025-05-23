import { Kneepads } from "../../../interface";

export default async function createKneepads(kneepad: Kneepads, token?: string) {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/kneepads/create`,
      {
        method: "POST",
        headers: {
          authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(kneepad),
      }
    );
    if (!response.ok) {
      throw new Error("Cannot create kneepads")
    };
  
    return await response.json();
  }