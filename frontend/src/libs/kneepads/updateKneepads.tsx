import { Kneepads } from "../../../interface";

export default async function updateKneepads(kneepad: Kneepads, number: string, token?: string) {
    const response = await fetch(
      `http://127.0.0.1:5000/api/v1/kneepads/update/${number}`,
      {
        method: "PUT",
        headers: {
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(kneepad),
      }
    );
    if (!response.ok) {
      throw new Error("Cannot update kneepads")
    };
  
    return await response.json();
  }