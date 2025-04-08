export default async function getOneKneepads(number : string, token?: string) {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/kneepads/get_one/${number}`,
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