import React, { useState } from "react";
import EventCards from "./EventCards";
import axios from "axios"
import { BsCaretDownFill, BsCaretUp } from "react-icons/bs";

const EventS = ({ events, setSelectedMonth, selectedMonth }) => {
  const [drop, setDrop] = useState(false);
  const months = ["Any", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

  const eventsThisMonth = [];
  const futureEvents = [];

  events.forEach((item) => {
    const currDate = new Date().getDate();
    const currMonth = new Date().getMonth();
    const currYear = new Date().getFullYear();
    const itemMonth = new Date(item.date).getMonth();
    const itemYear = new Date(item.date).getFullYear();

    if (itemMonth + itemYear === currYear + currMonth) {
      eventsThisMonth.push(item);
    }
    if (itemYear >= currYear && itemMonth > currMonth) {
      futureEvents.push(item);
    }
  });
  const handleSelectMonth = (item) => {
      setSelectedMonth(item);
      setDrop(false);
    }
  return (
    <div className="max-w-7xl mx-auto py-8 md:py-0">
      <div className="w-full max-w-4xl lg:max-w-5xl flex flex-row items-center justify-between px-6 md:px-16 pt-4 pb-6 md:pt-8 md:pb-10">
        <h3 className="text-2xl md:text-3xl tracking-wide">
          Currently:{" "}
          {new Date().toLocaleString("default", {
            month: "long",
            year: "numeric",
          })}
        </h3>
        {drop ? (
          <>
            <div className="relative">
              <div
                className="w-fit mr-4 flex flex-row items-center border-b border-gray-300 cursor-pointer text-red-500"
                onClick={() => setDrop(false)}
              >
                <p className="text-sm mr-2 md:text-2xl tracking-wide md:tracking-wider md:px-2">
                  Select Month
                </p>
                <BsCaretUp className="text-sm md:text-2xl" />
              </div>
              <div className="absolute z-10 max-w-max md:max-w-full top-8 right-2 md:top-12 bg-red-300 rounded-xl py-4 mt-1 text-white text-lg md:text-xl font-semibold tracking-wider text-center">
                {months.map((item) => (
                  <p
                    key={item}
                    className="w-full cursor-pointer px-6 md:px-12 py-3 hover:bg-rose-50 hover:text-red-500"
                    onClick={()=> handleSelectMonth(item)}
                  >
                    {item}
                  </p>
                ))}
              </div>
            </div>
          </>
        ) : (
          <>
            <div
              className="w-fit mr-4 flex flex-row items-center border-b border-gray-300 cursor-pointer hover:border-rose-500"
              onClick={() => setDrop(true)}
            >
              <p className="text-xl md:text-2xl text-gray-500 tracking-wide md:tracking-wider px-2">
                {selectedMonth}
              </p>
              <BsCaretDownFill className="text-gray-300 text-xl md:text-2xl" />
            </div>
          </>
        )}
      </div>
      {eventsThisMonth.length !== 0 ? (
        <div className="w-full md:px-6 py-4">
          {eventsThisMonth.map((items) => (
            <EventCards
              key={items._id}
              orgName={items.orgName}
              eventName={items.eventName}
              description={items.description}
              date={items.date}
              start={items.start}
              end={items.end}
              address={items.location.address}
              city={items.location.city}
              postal={items.location.postal}
              url={items.url}
              price={items.price}
            />
          ))}
        </div>
      ) : (
        <div className="max-w-5xl">
          <p className="text-center text-2xl pt-20 pb-8 text-gray-400 font-medium tracking-wider leading-relaxed"></p>
          <p className="text-center text-2xl pb-8 text-gray-400 font-medium tracking-wider leading-relaxed px-8">
            There are currently no events in {selectedMonth}
          </p>
        </div>
      )}
      {futureEvents.length !== 0 && (
        <>
          <h3 className="text-2xl md:text-3xl tracking-wide px-6 md:px-16 pt-4 pb-6 md:pt-8 md:pb-10">
            Upcoming:
          </h3>
          <div className="w-full md:px-6 py-4">
            {futureEvents.map((items) => (
              <EventCards
                key={items._id}
                orgName={items.orgName}
                eventName={items.eventName}
                description={items.description}
                date={items.date}
                start={items.start}
                end={items.end}
                address={items.location.address}
                city={items.location.city}
                postal={items.location.postal}
                url={items.url}
                price={items.price}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default EventS;
