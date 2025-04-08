import { Kneepads } from "../../../interface";

export default async function returnKneepads(kneepad: Kneepads, number: string, token?: string) {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/kneepads/return?number=${number}`,
      {
        method: "PUT",
        headers: {
          authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(kneepad),
      }
    );

    if (!response.ok) {
      throw new Error("Cannot pending kneepads")
    };
  
    return await response.json();
  }