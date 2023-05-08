import React from 'react'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import EventS from '../components/Events/Display/EventS'
import { useEffect } from 'react'


const Home = ({ events, setSelectedCity, selectedCity, selectedMonth, setSelectedMonth }) => {
  let selectedEvents = [];
  const getMonth = (date) => {
    return new Date(date).toLocaleString("default", { month: "long" })
  }
  const capitalise = (item) => {
    return item.charAt(0).toUpperCase() + item.slice(1);
  };
  events.forEach(item => {
    item.location.city = capitalise(item.location.city)
  })
  const getEventsByCity = () => {
    events.forEach(item => {
      if (selectedCity === item.location.city && selectedEvents.filter(event => event._id === item._id).length === 0) {
        selectedEvents.push(item);
      }
    })
  }
  events.forEach(item => {
    if ((selectedMonth === "Month" || selectedMonth === "Any") && selectedCity === item.location.city && selectedEvents.filter(event => event._id === item._id).length === 0) {
      selectedEvents.push(item);
    }
  })

  events.forEach(item => {
    if (getMonth(item.date) === selectedMonth && selectedCity === item.location.city && selectedEvents.filter(event => event._id === item._id).length === 0) {
      selectedEvents.push(item);
    }
  })
  useEffect(() => {
    setSelectedMonth("Month");
    getEventsByCity();
  }, [selectedCity])

  return (
    <>
      <Navbar />
      <Hero events={events} setSelectedCity={setSelectedCity} selectedCity={selectedCity} />
      <EventS events={selectedEvents} selectedEvents={selectedEvents} selectedCity={selectedCity} setSelectedMonth={setSelectedMonth} selectedMonth={selectedMonth} />
    </>
  )
}

export default Home