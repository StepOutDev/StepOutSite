import React from "react";
import { Modal } from "@mui/material";
import { Event } from "../../../interface";

interface ShowMoreModalProps {
  open: boolean;
  onClose: () => void;
  event: Event;
}

export default function ShowMoreModal({ open, onClose, event }: ShowMoreModalProps) {
  return (
    <Modal open={open} onClose={onClose}>
      <div className="fixed inset-0 bg-black bg-opacity-50 p-5 flex justify-center items-center z-50">
        <div className="bg-gray-50 rounded-lg w-full max-w-4xl shadow-lg relative z-50 overflow-y-auto max-h-[90vh]">

          <div className="relative inset-0 z-0 rounded-t-lg overflow-hidden shadow-md w-full h-[400px]">
              <img
                src={event.image || "/images/logo/Logo1.png"}
                className="w-full h-full object-cover"
                alt="Event Image"
              />
              <div className="absolute inset-0 bg-black bg-opacity-80 h-[400px]"></div>
            </div>

          <div className="absolute top-[175px] left-1/2 -translate-x-1/2 z-10 rounded-lg overflow-hidden shadow-md w-full max-w-[400px] h-[200px]">
              <img
                src={event.image || "/images/logo/Logo1.png"}
                className="w-full h-full object-cover"
                alt="Event Image"
              />
          </div>

          <div className="flex flex-col items-center m-6 gap-5"> 

            <h2 className="text-[32px] md:text-[36px] font-semibold text-[#422A40] text-center">
              {event.event_name}
            </h2>

            <div className="flex flex-col space-y-4 text-sm text-[#222A40] w-[80%]">
              <div className="flex md:flex-row flex-col gap-2 justify-center">
                <div className="flex items-center shadow-xl p-4 rounded-lg bg-white">
                  <CalendarIcon /> <span className="ml-2">{event.day}</span>
                </div>
                <div className="flex items-center shadow-xl p-4 rounded-lg bg-white">
                  <ClockIcon /> <span className="ml-2">{event.time}</span>
                </div>
                <div className="flex items-center shadow-xl p-4 rounded-lg bg-white">
                  <LocationIcon /> <span className="ml-2">{event.place}</span>
                </div>
              </div>
              <div className="flex flex-col gap-2 shadow-xl p-4 pb-6 rounded-lg bg-white">
                <p className="mt-2 font-bold">Description:</p>
                <p>
                  {event.description.split("\n").map((line, index) => (
                    <span key={index}>{line}<br /></span>
                  ))}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}

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
