interface ShowMoreProps {
    event_name: string;
    day: string;
    time: string;
    place: string;
    description: string;
    image: string;
    onClose: () => void;
  }
  
  export default function ShowMore({ event_name, day, time, place, description, image, onClose }: ShowMoreProps) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 p-5 flex justify-center items-center z-50">
        <div className="bg-white p-6 rounded-xl w-full mx-[10%] shadow-lg relative z-50">
          
          <button
            className="absolute top-2 right-4 text-[#422A40] hover:text-black z-50"
            onClick={onClose}
          >
            ✖
          </button>
          
          <h2 className="md:text-3xl font-bold text-2xl text-[#422A40] text-center mb-4">{event_name}</h2>
  
          <div className="flex md:flex-row flex-col items-center gap-5">
            {/* Image */}
            <div className="flex m-4 rounded-xl overflow-hidden shadow-md w-full max-w-[400px] h-[200px]">
              <img src={image} className="w-full h-full object-cover" alt="Event Image" />
            </div>
  
            {/* Details */}
            <div className="text-[14px] text-[#222A40] space-y-2 w-full gap-5">
              <div className="flex items-center">
                <CalendarIcon /> <span className="ml-2">{day}</span>
              </div>
              <div className="flex items-center">
                <ClockIcon /> <span className="ml-2">{time}</span>
              </div>
              <div className="flex items-center">
                <LocationIcon /> <span className="ml-2">{place}</span>
              </div>
              <p className="mt-2"><strong>Description:</strong></p>
              <p>
                {description.split("\n").map((line, index) => (
                  <span key={index}>{line}<br /></span>
                ))}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  // SVG Icons
  export const CalendarIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25M3 18.75A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75M3 11.25h18" />
    </svg>
  );
  
  export const ClockIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
    </svg>
  );
  
  export const LocationIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
    </svg>
  );
  