// Define the User Profile interface

  
  // Define a function to fetch the user profile
  export const getMe = async (): Promise<UserProfile | null> => {
    try {
      const response = await fetch("http://127.0.0.1:5000/api/docs#/user/get_user_me", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Assuming token is stored in localStorage
        },
      });
  
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
  
      const data: UserProfile = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching user profile:", error);
      return null;
    }
  };
  