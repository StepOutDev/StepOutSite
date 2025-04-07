export default async function getAllEvents() {
    const response = await fetch(
      `http://127.0.0.1:5000/api/v1/event/get_all`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      }
    );
    if (!response.ok) {
      console.log(response)
      throw new Error("Cannot get all events")
    };
    const responseJson = await response.json();
    return await responseJson.data;
  }