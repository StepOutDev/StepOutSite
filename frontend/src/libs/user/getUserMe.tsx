
export default async function getUserMe(token: string) {
  const response = await fetch(
    `${process.env.BACKEND_URL}/api/v1/user/me`,
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