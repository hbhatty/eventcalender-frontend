import { useState } from "react";
import { Link } from "react-router-dom";
import { AiOutlineDown, AiOutlineUp } from "react-icons/ai";

const EventCards = ({
  orgName,
  eventName,
  description,
  date,
  start,
  end,
  address,
  city,
  postal,
  url,
  price,
}) => {
  const [openModal, setOpenModal] = useState(false);

  const dates = new Date(date).toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const titleCap = (item) => {
    let capitaliseText = item.split(" ");
    for (let i = 0; i < capitaliseText.length; i++) {
      capitaliseText[i] =
        capitaliseText[i][0]?.toUpperCase() + capitaliseText[i].substring(1);
    }
    const text = capitaliseText.join(" ").trim();
    return text;
  };

  const capitalise = (item) => {
    return item.charAt(0).toUpperCase() + item.slice(1);
  };

  return (
    <div className="w-full max-w-3xl lg:max-w-4xl px-6 mb-10">
      <div className="md:flex md:flex-row">
        <div className="hidden md:block border-r border-gray-300 flex-row items-start mr-10">
          <div className="text-center text-lg lg:text-xl text-gray-500 px-8">
            {new Date(dates).toLocaleString("default", {
              weekday: "short",
              day: "numeric",
              month: "short",
            })}
          </div>
        </div>

        <div className="w-full bg-white py-6 px-8 md:px-12 rounded-xl shadow-lg shadow-gray-200">
          {price === 0 ? (
            <p className="text-right text-orange-600 font-medium text-xl tracking-wider">
              FREE
            </p>
          ) : (
            <p className="text-right text-green-500  font-medium text-xl tracking-wide">
              ${price.toFixed(2)}
            </p>
          )}
          <div className="text-slate-700 font-medium text-lg py-2 tracking-wide">
            <div className="w-full flex flex-col md:flex-row md:items-center md:gap-0.5 justify-between pb-1 md:pb-2">
              <p className="text-lg md:text-xl md:mr-4">
                {titleCap(eventName)}
              </p>

              {openModal ? (
                <>
                  <div
                    className="flex flex-row items-center gap-2 py-2 cursor-pointer hover:opacity-90"
                    onClick={() => setOpenModal(false)}
                  >
                    <p className="text-gray-500 text-sm">See description</p>
                    <AiOutlineUp className="text-sm" />
                  </div>
                </>
              ) : (
                <>
                  <div
                    className="flex flex-row items-center gap-2 py-2 cursor-pointer hover:opacity-90"
                    onClick={() => setOpenModal(true)}
                  >
                    <p className="text-blue-400 text-sm">See description</p>
                    <AiOutlineDown className="text-sm text-blue-500" />
                  </div>
                </>
              )}
            </div>
            {openModal && (
              <p className="pb-2 md:pt-4 md:pb-8">{capitalise(description)}</p>
            )}

            <div className="flex flex-col md:flex-row items-start justify-between">
              <div className="text-gray-500 pb-2 md:pb-4">
                <p>{titleCap(address)}</p>
                <p>{capitalise(city)}</p>
                <p>{titleCap(postal)}</p>
              </div>
              <div className="flex flex-col gap-1 md:text-xl">
                <p>
                  {start}-{end}
                </p>
                <p>{dates}</p>
                <p>{titleCap(orgName)}</p>
              </div>
            </div>
          </div>
          <Link
            to={url}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline hover:underline-offset-2 md:hover:underline-offset-4 hover:decoration-2 hover:decoration-indigo-400"
          >
            <p className="text-center text-slate-900 py-2 md:py-4 break-all">
              {url}
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EventCards;
