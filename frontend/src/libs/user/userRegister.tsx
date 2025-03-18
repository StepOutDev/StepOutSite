export default async function userRegister(
    register_form : FormData
){
    const response = await fetch(
        `http://127.0.0.1:5000/api/v1/user/register`,
        {
            method: "POST",
            // headers: {
            //     "Content-Type": "multipart/form-data",
            //   },
            body: register_form
        });
    // console.log(response.status, response.headers)
    const data = await response.json();
    // console.log(data);
    if (!response.ok) {
        throw new Error("Failed to log-in");
    }
    return data;
}