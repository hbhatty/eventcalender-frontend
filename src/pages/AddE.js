import React from 'react'
import AddEventForm from '../components/Events/AddEventForm'
import Navbar from '../components/Navbar'

const AddE = ({setUpdate}) => {
  return (
    <>
    <Navbar/>
    <AddEventForm setUpdate = {setUpdate}/>
    </>
  )
}

export default AddE