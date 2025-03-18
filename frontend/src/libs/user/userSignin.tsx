  // export default async function userSignin(
  //   student_id: string,
  //   password: string
  // ) {
  //   const response = await fetch(`http://127.0.0.1:5000/api/v1/user/login`, {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       student_id: student_id,
  //       password: password,
  //     }),
  //   });
  //   if (!response.ok) {
  //     throw new Error("Failed to log-in");
  //   }

  //   return await response.json();
  // }


  // userSignin.ts







  import Cookies from 'js-cookie'; // You can use a library like js-cookie for easier cookie handling.
  import * as cookie from 'cookie';
  // import { cookies } from 'next/headers'

  export default async function userSignin(student_id: string, password: string) {
    const response = await fetch(`http://127.0.0.1:5000/api/v1/user/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include", // This ensures the JWT cookie is sent with the request
      body: JSON.stringify({
        student_id: student_id,
        password: password,
      }),
    });

    if (!response.ok) {
      // Log the response for debugging
      const errorResponse = await response.json();
      console.error("Error response:", errorResponse);
      throw new Error("Failed to log in. " + errorResponse.message || "");
    }
    // console.log(response);
    const result = await response.json(); // Parse the response
    console.log("Login successful, token:", JSON.stringify(result.data));


  // Assuming result.data.cookie is structured according to the backend `Cookie` struct
  // const cookieData = result.data?.cookie; // Ensure this is the correct field in your response
  const tokenData = result.data;
  // if (cookieData) {
  //   Cookies.set(cookieData.Name, cookieData.Value, {
  //     path: cookieData.Path || "/", // Default to root path if not provided
  //     expires: cookieData.Expires ? new Date(cookieData.Expires) : undefined, // Convert `Expires` to Date object
  //     secure: cookieData.Secure || false, // Set secure flag
  //     sameSite: cookieData.SameSite || "Strict", // Default to `Strict` for safety
  //   });


  //   console.log(`Cookie ${cookieData.Name} set successfully.`);
  // } else {
  //   console.error("Cookie data not found in the response.");
  // }

  // if (cookieData) {console.log('cookieData',cookieData);}
  // else {console.log('cookieData not found in the response.');}

  if (tokenData) {  console.log('tokenData',tokenData);}
  else {console.log('tokenData not found in the response.');}




    // Ensure result.data is a string
    const token = typeof result.data === 'string' ? result.data : JSON.stringify(result.data);

    // Set the token as a cookie
    // console.log('tokennnn', result.data);
    //Cookies.set('jwt', JSON.stringify(result.data), {sameSite: 'Strict', httpOnly: false});
    // Cookies.set('jwt', token, {
    //   path: '/',
    //   sameSite: 'Strict',
    // });
    // console.log('cookies', Cookies.get('jwt')); // This will be an object.
    
    //const cookie = require('cookie');


    // document.cookie = `token=${result.data}; Max-Age=604800; Path=/; SameSite=Strict; HttpOnly=false`;
    // result.setHeader('Set-Cookie',
    //   cookie.serialize('token', result.data,
    //   {
    //       httpOnly: true,
    //       sameSite: 'strict',
    //       path: '/'
    //   }))
    
    console.log('cookies',Cookies.get('jwt')); // Logs all cookies as an object
    // console.log('Set-cookies',response.headers.get('Set-Cookie'));



    // const cookieStore = await cookies()
    // const theme = cookieStore.getAll()
    // console.log('cookie nextheader',theme);
    // Extract the 'jwt' cookie
    // const jwtCookie = theme.find((cookie) => cookie.name === 'jwt');
    // if (jwtCookie) {
    //   try {
    //     const parsedJwt = JSON.parse(jwtCookie.value);
    //     console.log('Parsed JWT:', parsedJwt);
    //   } catch (error) {
    //     console.error('Failed to parse JWT cookie:', jwtCookie.value);
    //   }
    // } else {
    //   console.error('JWT cookie not found.');
    // }

    return { token: result.data,} // Extract token from 'data' field };
    // return {
    //   token: result.data, // Extract token from 'data' field
    // };
  }
