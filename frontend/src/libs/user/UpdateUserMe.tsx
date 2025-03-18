export default async function updateUser(
    token: string | undefined,
    userRole: string,
    studentId: string | null,
    formData: FormData
  ) {
    let url = "http://127.0.0.1:5000/api/v1/user/update";
    url += `?student_id=${studentId}`;
    // if (userRole.toLowerCase() !== "core" && userRole.toLowerCase() !== "admin" && studentId) {
      
    // }
    // } else if (userRole.toLowerCase() === "core" && studentId) {
    //   url += `?student_id=${studentId}`;
    // }

  
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        authorization: `Bearer ${token}`,
      },
      body: formData, // multipart/form-data ไม่ต้องกำหนด Content-Type เอง
    });
  
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to update user");
    }
  
    return await response.json();
  }
  