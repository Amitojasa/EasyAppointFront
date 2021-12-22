import React, { useEffect, useState } from 'react';



import { AppointmentPicker } from 'react-appointment-picker';
import { getDoctors } from '../admin/helper/adminapicall';
import './style.css'

const days = [
  [
    { id: 1, number: 1, isSelected: true, periods: 2 },
    { id: 2, number: 2 },
    null,
    { id: 3, number: '3', isReserved: true },
    { id: 4, number: '4' },
    null,
    { id: 5, number: 5 },
    { id: 6, number: 6 }
  ],
  [
    { id: 7, number: 1, isReserved: true, periods: 3 },
    { id: 8, number: 2, isReserved: true },
    null,
    { id: 9, number: '3', isReserved: true },
    { id: 10, number: '4' },
    null,
    { id: 11, number: 5 },
    { id: 12, number: 6 }
  ],
  [
    { id: 13, number: 1 },
    { id: 14, number: 2 },
    null,
    { id: 15, number: 3, isReserved: true },
    { id: 16, number: '4' },
    null,
    { id: 17, number: 5 },
    { id: 18, number: 6 }
  ],
  [
    { id: 19, number: 1 },
    { id: 20, number: 2 },
    null,
    { id: 21, number: 3 },
    { id: 22, number: '4' },
    null,
    { id: 23, number: 5 },
    { id: 24, number: 6 }
  ],
  [
    { id: 25, number: 1, isReserved: true },
    { id: 26, number: 2 },
    null,
    { id: 27, number: '3', isReserved: true },
    { id: 28, number: '4' },
    null,
    { id: 29, number: 5 },
    { id: 30, number: 6, isReserved: true }
  ]
];

const AppointmentCalendar=(props)=>{
  const [selectedDoctor,updateDoctor]=useState(false)
  const [slots,updateSlots]=useState(days)
  const [doctorList,updateDoctorList]=useState([])
  const [isLoading,setIsLoading]=useState(false)
  const [schedule,updateSchedule]=useState(false)
  const [isBooked,updateBookedState]=useState({status:false,text:"Process"})
  useEffect(()=>{
    setIsLoading(true)
    getDoctors()
      .then(
        data=>{
          console.log(data)
          if(data.error)
            console.log(data.error)
          else
            setTimeout(()=>{updateDoctorList(data)
          console.log(data)
          setIsLoading(false)},3000)
        }
      )
  },[])

  const addAppointment=(time,addcb)=>{
    console.log(time)
    updateSchedule(true)
  }

  const removAppointment=(time,removecb)=>{
    updateSchedule(false)
  }

  return isBooked.status?(
    <div className='book_success'>
      We have received your appointment, You'll get your confirmation soon!!
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
        <>
        <p className='title'>Pick available schedule</p>
        <AppointmentPicker
          addAppointmentCallback={()=>addAppointment()}
          //removeAppointmentCallback={()=>removAppointment()}
          initialDay={new Date('2018-05-05')}
          days={slots}
          maxReservableAppointments={1}
          alpha
          visible
          continuous
          selectedByDefault
          loading={isLoading}
        />
        </>
      )
    }
    {
      schedule&&(
        <div className='btn btn-success' onClick={()=>{if(isBooked.text=='processing') return; updateBookedState({status:false,text:'processing...'});setTimeout(
          ()=>{updateBookedState({status:true,text:"successful"})},3000
        )}}>
          {isBooked.text}
        </div>
      )
    }
    </div>
  )
}

export default AppointmentCalendar