import React from 'react'
import Image from 'next/image'
import { doctorAgent } from './DoctorAgentCard'

type props = {
    doctorAgent:doctorAgent;
    setSelectedDoctor: any;
    selectedDoctor: doctorAgent;
}
function SuggestedDoctorCard({doctorAgent,setSelectedDoctor,selectedDoctor}:props) {
  return (
    <div className={`flex flex-col items-center p-4 border rounded-lg shadow-sm hover:border-blue-500 cursor-pointer ${selectedDoctor?.id == doctorAgent?.id && 'border-blue-500'}`}
    onClick={() => setSelectedDoctor(doctorAgent)}>
        <Image src={`/${doctorAgent?.image}`}
        alt={doctorAgent?.specialist} 
        width={100}
        height={100}
        className='w-full h-[100px] object-cover rounded-1xl object-cover p-1'
        />
        <h2 className='font-bold text-sm'>{doctorAgent?.specialist}</h2>
        <p className='text-xs text-grey-500 text-center line-clamp-2'>{doctorAgent?.description}</p>
    </div>
  )
}

export default SuggestedDoctorCard