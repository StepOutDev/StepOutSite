export default async function userSignin(
    student_id: string,
    password: string
  ) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/user/login`, {
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