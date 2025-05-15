export default async function updateEvent(
    event_form : FormData,
    event_name_param: string,
    token?: string
){
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/event/update?event_name_param=${event_name_param}`,
        {
            method: "PUT",
            headers: {
                authorization: `Bearer ${token}`,
              },
            body: event_form
        });
    const data = await response.json();
    console.log("data", data);
    if (!response.ok) {
        throw new Error("Failed to update event");
    }
    return data;
}