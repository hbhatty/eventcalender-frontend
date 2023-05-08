import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Home from "./pages/Home"
import AddE from "./pages/AddE";
import axios from "axios";
import { useEffect, useState } from "react";
import SignUp from "./pages/SignUp";
import ResetPassword from "./pages/ResetPassword";

function App() {
  const [events, setEvents] = useState([])
  const [update, setUpdate] = useState(false)
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("Month")
  
  const getEvents = async () => {
    try {
      const res = await axios.get(process.env.REACT_APP_EVENT)
      setEvents(res.data)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    getEvents()
  }, [update])
  return (
    <Router>
      <Routes>
        <Route path = "/" element = {<Home events = {events} setSelectedCity = {setSelectedCity} selectedCity = {selectedCity} selectedMonth = {selectedMonth} setSelectedMonth = {setSelectedMonth}/>}/>
        <Route path = "/add-event" element = {<AddE setUpdate= {setUpdate}/>}/>
        <Route path = '/signup' element = {<SignUp/>}/>
        <Route path = '/reset-password/:id' element = {<ResetPassword/>}/>
      </Routes>
    </Router>
  );
}

export default App;
