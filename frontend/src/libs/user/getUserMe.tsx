
export default async function getUserMe(token: string) {
  const response = await fetch(
    `http://127.0.0.1:5000/api/v1/user/me`,
    {
      method: "GET",
      headers: {
        authorization: `Bearer ${token}`,
      },
    }
  );
  if (!response.ok) {
    throw new Error("Cannot get user me")
  };
  
  const responseJson = await response.json();
  console.log("getUserMe Response:", responseJson); // Debug API response
  return await responseJson.data;
}