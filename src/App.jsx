import { useState } from 'react'
import reactLogo from './assets/react.svg'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Registeration from './pages/Registeration'
import Client from './pages/Client'
import DoctorRegistration from './pages/DoctorRegistration'
import Doctor from './pages/Doctor'
import ClientProfile from './pages/ClientProfile'

function App() {
  const [count, setCount] = useState(0)

  const array = [
    {
      "time": '9-10',
      "doctorName": "Dr. Smith",
    },
    {
      "time": '10-11',
      "doctorName": "Dr. Smith"
    },
    {
      "time": '11-12',
      "doctorName": "Dr. Jan"
    }
  ]

  // const SetUp = async() => {

  //   // Booking Slot
  //   await fetch("http://localhost:8080/setup", {
  //     method: "POST",
  //     headers: {
  //       'Accept': 'application/json',
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify(array)
  //   }).then(result => result.json().then(data => {
  //     console.log(data);
  //   })).catch(err => console.log(err))

  //   // User
  //   await fetch("http://localhost:8080/createP_Account", {
  //     method: "POST",
  //     headers: {
  //       'Accept': 'application/json',
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify(array)
  //   })
  // }
  // SetUp()
  
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/register" exact element={<Registeration />} />
          <Route path="/register/doctor" element={<DoctorRegistration />} />
          <Route path="/client/:id" element={<Client />} />
          <Route path="/doctor/:id" element={<Doctor />} />
          <Route path="/client/profile/:id" element={<ClientProfile />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
