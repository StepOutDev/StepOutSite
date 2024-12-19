  // const getUserMe = async (token: string) => {
  //   // try {
  //   //   // Debugging: Log the token to verify it
  //   //   console.log("Fetching user data with token:", token);

  //   //   // Fetch user data from the backend
  //   //   const response = await fetch("http://127.0.0.1:5000/api/v1/user/me", {
  //   //     method: "GET",
  //   //     headers: {
  //   //       Authorization: `Bearer ${token}`.trim(), // Use the dynamic token parameter
  //   //       Accept: "application/json", // Accept header is enough for GET
  //   //     },
  //   //   });

  //   //   // Check if the response is successful (HTTP 200-299)
  //   //   if (!response.ok) {
  //   //     console.error("Authorization Header:", `Bearer ${token}`);
  //   //     const errorData = await response.json().catch(() => ({}));
  //   //     console.error("Error in API response:", errorData);
  //   //     throw new Error(`HTTP error! status: ${response.status}`);
  //   //   }

  //   //   // Parse and log the JSON response
  //   //   const responseData = await response.json();
  //   //   console.log("Response data from API:", responseData);

  //   //   // Return the user data from the response
  //   //   return responseData.data;
  //   // } catch (error: any) {
  //   //   console.error("Error in getUserMe function:", error.message || error);
  //   //   throw error;
  //   // }

  //   const response = await fetch("http://127.0.0.1:5000/api/v1/user/me", {
  //     method: "GET",
  //     headers: {
  //       Authorization: `Bearer ${token}`.trim(),
  //       Accept: "application/json",
  //     },
  //     //credentials: "include", // Include credentials for CORS if needed

  //   });
    
  //   const responseData = await response.json();
  //   console.log("Response Data:", responseData);  // Log response body
  //   console.log("Authorization Header:", `Bearer ${token}`.trim());

    
  //   if (!response.ok) {
  //     console.error("Error Response:", responseData);
  //     throw new Error(`HTTP error! status: ${response.status}`);
  //   }

  //   return responseData.data;  
  // };

 


  import { useEffect, useState } from 'react';
  import Cookies from 'js-cookie';

  const getUserMe = async (token: string) => {
    // try {
      console.log('cookies', JSON.stringify(Cookies.get('jwt'))); // This will show the cookie content


      console.log("Fetching user data with token:", token);
      console.log("Authorization Header:", `Bearer ${token}`);
  
      const response = await fetch("http://127.0.0.1:5000/api/v1/user/me", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
          "Accept": "application/json",
        },
        credentials: "include",
      });

      // Check if the response is OK (status 200)
      // if (!response.ok) {
      //   const errorResponse = await response.json();
      //   console.error("Error fetching user data:", errorResponse);
      //   throw new Error(`Error: ${errorResponse.message || response.status}`);
      // }
  
      const responseData = await response.json();
      console.log("Response Data:", responseData);
  
      if (!response.ok) {
        console.error("Error Response:", responseData);
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      return responseData.data;
    // } catch (error: any) {
    //   console.error("Error in getUserMe function:", error.message || error);
    //   throw error;
    // }
  };
  
export default getUserMe;

// export default async function getUserMe(token: string) {
//   console.log('Authorization Token:', token);

//   const response = await fetch(`http://127.0.0.1:5000/api/v1/user/me`, {
//     method: "GET",
//     headers: {
//       'Authorization': `Bearer ${token}`,
//       'Accept': 'application/json',
//       'Content-Type': 'application/json',
//     }
//   });

//   const responseData = await response.json();
//   console.log("Response Data:", responseData);

//   if (!response.ok) {
//     console.error("Error Response:", responseData);
//     throw new Error(`HTTP error! status: ${response.status}`);
//   }

//   return responseData.data;

  

// console.log(response);
//   const result = await response.json(); // Parse the response
//   console.log(result.data);
//   return {
//     token: result.data, // Extract token from 'data' field
//   };
// }
