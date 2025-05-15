export default async function deleteEvent(event_name: string, token?: string) {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/event/delete?event_name=${event_name}`,
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