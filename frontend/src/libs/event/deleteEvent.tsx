export default async function deleteEvent(event_name: string, token?: string) {
    const response = await fetch(
      `http://127.0.0.1:5000/api/v1/event/delete?event_name=${event_name}`,
      {
        method: "DELETE",
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    );
    if (!response.ok) {
      throw new Error("Cannot delete event")
    };
  
    return await response.json();
  }