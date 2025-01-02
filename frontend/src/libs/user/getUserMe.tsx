import Cookies from 'js-cookie';

const getUserMe = async (token : string) => {
  try {
    const jwt = Cookies.get('jwt');

    if (!jwt) {
      console.error("JWT token not found in cookies.");
      throw new Error("JWT token is required for authentication.");
    }

    console.log("Fetching user data with token:", jwt);

    const response = await fetch("http://127.0.0.1:5000/api/v1/user/me", {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
      credentials: "include", // Include cookies
    });

    if (!response.ok) {
      const errorResponse = await response.json();
      console.error("Error fetching user data:", errorResponse);
      throw new Error("Failed to fetch user data.");
    }

    const data = await response.json();
    console.log("User data:", data);
    return data.data;
  } catch (error) {
    console.error("Error in getUserMe:", error);
    throw error;
  }
};

export default getUserMe;
