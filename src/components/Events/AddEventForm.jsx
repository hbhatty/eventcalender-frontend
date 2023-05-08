import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { userState } from "../../atoms/userAtom";

const AddEventForm = ({ setUpdate }) => {
  const navigate = useNavigate();
  const [userStateValue] = useRecoilState(userState);
  const [eventInput, setEventInput] = useState({
    eventName: "",
    description: "",
    date: "",
    start: "",
    end: "",
    address: "",
    city: "",
    postal: "",
    url: "",
    price: 0,
  });
  const [addEventErrorMsg, setAddEventErrorMsg] = useState("");
  const handleInput = (e) => {
    const { name, value } = e.target;
    setEventInput({
      ...eventInput,
      [name]: value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    //error checking
    const hold = eventInput;
    if (
      hold.eventName &&
      hold.description &&
      hold.start &&
      hold.date &&
      hold.end &&
      hold.city &&
      hold.postal &&
      hold.url &&
      hold.price
    ) {
      const date = new Date(hold.date).toISOString();
      const event = {
        orgName: "UFC",
        eventName: hold.eventName,
        description: hold.description,
        date: date,
        start: hold.start,
        end: hold.end,
        location: {
          address: hold.address,
          city: hold.city,
          postal: hold.postal,
        },
        url: hold.url,
        price: hold.price,
      };
      try {
        const res = await axios.post(process.env.REACT_APP_EVENT, event);
        console.log(res);
        if (res.status === 201) {
          setUpdate(true);
          navigate("/");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <div className="max-w-7xl py-10 md:py-12 lg:py-14 md:mx-auto">
      {userStateValue.name && (
        <>
        <div>
        <h1 className="text-center text-xl md:text-2xl lg:text-3xl font-medium tracking-wider">
          Hey {userStateValue.name}
        </h1>
        <h1 className="text-center text-xl md:text-2xl lg:text-3xl font-medium tracking-wider pt-6 pb-12">
          Add an event!
        </h1>
      </div>
      <form
        className="w-11/12 mx-auto flex flex-col gap-6 md:gap-8 bg-white text-gray-700 py-6 md:py-14 px-8 md:px-12 rounded-xl text-lg shadow-lg
      "
      >
        <div className="flex flex-col gap-2">
          <label htmlFor="eventName" className="font-medium text-gray-500">
            Event Name
          </label>
          <input
            className="w-full border rounded-lg py-1 px-2 md:py-2 md:px-4 shadow-inner
            bg-gray-100 focus:bg-white"
            id="eventName"
            name="eventName"
            type="text"
            placeholder="Enter an Event"
            onChange={handleInput}
            required
          ></input>
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="description" className="font-medium text-gray-500">
            Brief Desciption
          </label>
          <textarea
            className="w-full border rounded-lg py-1 px-2 md:py-2 md:px-4 shadow-inner
            bg-gray-100 focus:bg-white"
            id="description"
            name="description"
            rows={4}
            placeholder="A brief description"
            onChange={handleInput}
            required
          ></textarea>
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="date" className="font-medium text-gray-500">
            Date
          </label>
          <input
            className="w-full border rounded-lg py-1 px-2 md:py-2 md:px-4 shadow-inner
            bg-gray-100 focus:bg-white"
            id="date"
            name="date"
            type="date"
            onChange={handleInput}
            required
          ></input>
        </div>
        <div className="flex flex-row items-center justify-between gap-10">
          <div className="w-1/2 flex flex-col gap-2">
            <label htmlFor="start" className="font-medium text-gray-500">
              Start Time
            </label>
            <input
              className="w-full border rounded-lg py-1 px-2 md:py-2 md:px-4 shadow-inner
            bg-gray-100 focus:bg-white"
              id="start"
              name="start"
              type="time"
              placeholder="Enter a UFC Event!"
              onChange={handleInput}
              required
            ></input>
          </div>
          <div className="w-1/2 flex flex-col gap-2">
            <label htmlFor="end" className="font-medium text-gray-500">
              End Time
            </label>
            <input
              className="w-full border rounded-lg py-1 px-2 md:py-2 md:px-4 shadow-inner
            bg-gray-100 focus:bg-white"
              id="end"
              name="end"
              type="time"
              placeholder="Enter a UFC Event!"
              onChange={handleInput}
              required
            ></input>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <label className="font-medium text-gray-500">Address</label>
          <input
            className="w-full border rounded-lg py-1 px-2 md:py-2 md:px-4 shadow-inner
            bg-gray-100 focus:bg-white"
            id="address"
            name="address"
            type="text"
            placeholder="Enter an address"
            onChange={handleInput}
            required
          ></input>
        </div>
        <div className="flex flext-row gap-10">
          <input
            className="w-full border rounded-lg py-1 px-2 md:py-2 md:px-4 shadow-inner
            bg-gray-100 focus:bg-white"
            id="city"
            name="city"
            type="text"
            placeholder="Town/City"
            onChange={handleInput}
            required
          ></input>
          <input
            className="w-full border rounded-lg py-1 px-2 md:py-2 md:px-4 shadow-inner
            bg-gray-100 focus:bg-white"
            id="postal"
            name="postal"
            type="text"
            placeholder="Postcode"
            onChange={handleInput}
            required
          ></input>
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="url" className="font-medium text-gray-500">
            Link To Event
          </label>
          <input
            className="w-full border rounded-lg py-1 px-2 md:py-2 md:px-4 shadow-inner
            bg-gray-100 focus:bg-white"
            id="url"
            name="url"
            type="url"
            placeholder="Enter a URL"
            onChange={handleInput}
            required
          ></input>
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="price" className="font-medium text-gray-500">
            Price
          </label>
          <input
            className="w-full border rounded-lg py-1 px-2 md:py-2 md:px-4 shadow-inner
            bg-gray-100 focus:bg-white"
            id="price"
            name="price"
            type="number"
            min={0}
            placeholder="Enter a $ amount"
            onChange={handleInput}
            required
          ></input>
        </div>
        {addEventErrorMsg && <p className="text-center text-red-500">{addEventErrorMsg}</p>}
        <button
          className="bg-emerald-700 text-white tracking-wide rounded-lg py-3 px-6 my-4 md:mt-6 font-semibold hover:opacity-75"
          onClick={handleSubmit}
        >
          Add Event
        </button>
      </form>
        </>
      )}
    </div>
  );
};

export default AddEventForm;
