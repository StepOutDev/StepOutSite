export default async function deleteKneepads(number: string, token: string) {
    const response = await fetch(
      `http://127.0.0.1:5000/api/v1/kneepads/delete/${number}`,
      {
        method: "DELETE",
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    );
    if (!response.ok) {
      throw new Error("Cannot delete kneepads")
    };
  
    return await response.json();
  }