import { Kneepads } from "../../../interface";

export default async function getAllKneepads(token?: string) {
    const response = await fetch(
      `${process.env.BACKEND_URL}/api/v1/kneepads/get_all`,
      {
        method: "GET",
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    );
    if (!response.ok) {
      console.log(response)
      console.log(token)
      throw new Error("Cannot get all kneepads")
    };
    const responseJson = await response.json();
    // const kneepads : Kneepads[] = JSON.parse(responseJson.data);
    // console.log(kneepads);
    return await responseJson.data;
  }