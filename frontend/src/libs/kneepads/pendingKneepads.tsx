import { Kneepads } from "../../../interface";

export default async function pendingKneepads(kneepad: Kneepads, number: string, token?: string) {
    const response = await fetch(
      `http://127.0.0.1:5000/api/v1/kneepads/pending?number=${number}`,
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