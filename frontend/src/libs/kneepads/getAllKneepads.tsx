export default async function getAllKneepads(token: string) {
    const response = await fetch(
      `http://127.0.0.1:5000/api/v1/kneepads/get_all`,
      {
        method: "GET",
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    );
    if (!response.ok) {
      throw new Error("Cannot get all kneepads")
    };
  
    return await response.json();
  }