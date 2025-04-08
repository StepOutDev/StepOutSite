import { FormEvent } from "../../../interface";

export default async function createEvent(event: FormEvent, token?: string) {

  const formData = new FormData();
  
  formData.append('event_name', event.event_name);
  formData.append('day', event.day);
  formData.append('time', event.time);
  formData.append('place', event.place);
  formData.append('description', event.description);

  event.song.forEach((s, index) => {
    formData.append(`song[${index}]`, s);
  });

  if (event.image) {
    formData.append("image", event.image); 
  }

  const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/event/create`,
      {
        method: "POST",
        headers: {
          authorization: `Bearer ${token}`,
        },
        body: formData,
      }
    );
    if (!response.ok) {
      throw new Error("Cannot create events")
      console.log(response);
      console.log(JSON.stringify(event));
    };
  
    return await response.json();
  }