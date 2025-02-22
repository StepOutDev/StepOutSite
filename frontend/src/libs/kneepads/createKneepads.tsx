import { Kneepads } from "../../../interface";

export default async function createKneepads(kneepad: Kneepads, token: string) {
    const response = await fetch(
      `http://127.0.0.1:5000/api/v1/kneepads/create`,
      {
        method: "POST",
        headers: {
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(kneepad),
      }
    );
    if (!response.ok) {
      throw new Error("Cannot create kneepads")
    };
  
    return await response.json();
  }