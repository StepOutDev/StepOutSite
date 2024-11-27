export default async function userSignin(
    student_id: string,
    password: string
  ) {
    const response = await fetch(`http://127.0.0.1:5000/api/v1/user/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        student_id: student_id,
        password: password,
      }),
    });
    if (!response.ok) {
      throw new Error("Failed to log-in");
    }
  
    return await response.json();
  }