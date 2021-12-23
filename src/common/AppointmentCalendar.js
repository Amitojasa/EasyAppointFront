import React, { useEffect, useState } from 'react';

import { getDoctors } from '../admin/helper/adminapicall';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateTimePicker from '@mui/lab/DateTimePicker';
import './style.css'
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { createAppointment } from '../user/helper/patientapicalls';
import { isAuthenticated } from '../auth/helper';


const AppointmentCalendar=(props)=>{
  const [selectedDoctor,updateDoctor]=useState(false)
  const {patientId}=useParams()
  const [doctorList,updateDoctorList]=useState([])
  const [isLoading,setIsLoading]=useState(false)
  const [date,setDate]=useState(null)
  const [isProcessed,processed]=useState(false)
  const { user, token } = isAuthenticated();
  const [isBooked,updateBookingStatus]=useState(false)

  useEffect(()=>{
    setIsLoading(true)
    getDoctors()
      .then(
        data=>{
          console.log(data)
          if(data.error){
            alert(data.error)
          } 
          else
            updateDoctorList(data)
          setIsLoading(false)
        }
      )
  },[])

  useEffect(()=>{

  },[date])

  

  const proceedAppointment=()=>{
    if(isProcessed)
      return
    processed(true)
    createAppointment(patientId,selectedDoctor,date,token)
    .then(data=>{
      if(data.error)
      {
        alert(data.error)
      }
      else{
        updateBookingStatus(data.message)
      }
      processed(false)
      console.log(data)
    })

  }

  return isBooked?(
    <div className='booked_appointment_state'>
      {isBooked}
    </div>
  ):(
    <div className='new_appointment'>
    <h2>New Appointment</h2>
    {isLoading&&(
      <div>
        Fetching Doctor List...
      </div>
    )}
    <p className='title'>Select Doctor</p>
    <div className='doctor_list'>
    {doctorList.map(doctor=>(
      
      <div onClick={()=>updateDoctor(doctor._id)} className={`doctor ${doctor._id==selectedDoctor?"active":""}`}>
        <img src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgxyIZLtuBzp1FJdiLkk9qVWy5lnaRWxRMAv_xOZoPua4qPrYSDEhZ3i11YMrD2791iTw&usqp=CAU"} />
        <p>{doctor.name}</p>
      </div>
    ))}

    </div>
    {
      selectedDoctor&&(
        <div>
        <p className='title'>Pick available date</p>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DateTimePicker
            renderInput={(props) => <TextField {...props} />}
            minDateTime={new Date()}
            label="DateTimePicker"
            value={date}
            onChange={(value) => {
              setDate(value);
            }}
          />
        </LocalizationProvider>
        </div>
      )
    }
    {
      date&&(
        <div className='btn btn-success' onClick={()=>proceedAppointment()}>
          {!isProcessed?"Process":"Processing..."}
        </div>
      )
    }
    </div>
  )
}

export default AppointmentCalendar