export default async function getOneKneepads(number : string, token: string) {
    const response = await fetch(
      `http://127.0.0.1:5000/api/v1/kneepads/get_one/${number}`,
      {
        method: "GET",
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    );
    if (!response.ok) {
      throw new Error("Cannot get one kneepads")
    };
  
    return await response.json();
  }