import React from 'react'
import './App.css'
import UserLocation from './UserLocation'

function App() {
  const DUMMY_DATA = [
    { "name":"Contruction 1", "lat": 12.9314, "lng": 77.5934 },
    { "name":"Contruction 2", "lat": 12.9027, "lng": 77.6071 },
    { "name":"Contruction 5", "lat": 12.9011, "lng": 77.6004 },
    { "name":"Contruction 3", "lat": 12.8338, "lng": 77.6202 },
    { "name":"Contruction 4", "lat": 13.0043, "lng": 77.5052 }
  ]
  return (
    <>
      <UserLocation list={DUMMY_DATA}/>
    </>
  )
}

export default App


