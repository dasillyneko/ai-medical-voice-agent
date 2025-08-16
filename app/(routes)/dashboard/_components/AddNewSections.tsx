"use client"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import axios from "axios"
import { doctorAgent } from "./DoctorAgentCard"

import React, { use, useState } from 'react'
import { ArrowRight, Loader2 } from "lucide-react"
import DoctorAgentCard from "./DoctorAgentCard"
import { index } from "drizzle-orm/gel-core"
import SuggestedDoctorCard from "./SuggestedDoctorCard"
import {useRouter} from 'next/navigation'

function AddNewSessionDialog() {
    const [note,setNote]=useState<string>();
    const [loading,setLoading]=useState<boolean>(false);
    const [suggestedDoctors,setSuggestedDoctors]=useState<doctorAgent[]>();
    const [showDoctors,setShowDoctors]=useState<boolean>(false);
    const [selectedDoctor,setSelectedDoctor]=useState<doctorAgent>();

    const router=useRouter();

    const OnClickNext=async ()=>{
        setLoading(true);
        const result=await axios.post('/api/suggest-doctors',{
            notes:note
        });
        console.log(result.data);

        //const doctors = Array.isArray(result.data) ? result.data : [];

        setSuggestedDoctors(result.data);

        setLoading(false);
    }


const onStartConsultation=async ()=>{
    //SAVE info to database 
    setLoading(true);
    const result=await axios.post('/api/session-chat',{
        notes:note,
        selectedDoctor:selectedDoctor
    });
    console.log(result.data);
    if(result.data?.sessionId){
        console.log(result.data.sessionId);
        // Redirect to the conversation page
        router.push('/dashboard/medical-agent/'+result.data.sessionId);
    }
    setLoading(false);
}


  return (
    <Dialog>
        <DialogTrigger>
            <Button className='mt-3'>Start a Consultation</Button>
        </DialogTrigger>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Add Basic Details</DialogTitle>
                <DialogDescription asChild>

                    {!suggestedDoctors? <div>
                        <h2>Add symptoms or any other details</h2>
                        <Textarea placeholder='Add your symptoms here...' 
                        className="h-[150px] mt-2" 
                        onChange={(e) => setNote(e.target.value)}/>
                    </div>:
                    <div>
                        <h2>Select The Doctor</h2>
                        <div className="grid grid-cols-2 gap-4 ">
                            {/* // Suggested Doctors */}
                            {suggestedDoctors.map((doctor,index) => (
                                <SuggestedDoctorCard key={index} doctorAgent={doctor} setSelectedDoctor={()=>setSelectedDoctor(doctor)}
                                //@ts-ignore
                                selectedDoctor={selectedDoctor}/>
                            ))}
                        </div>
                    </div>}
                    
                </DialogDescription>
            </DialogHeader>
            <DialogFooter>
                <DialogClose>
                    <Button variant={'outline'} >Cancel</Button>
                </DialogClose>

                {!suggestedDoctors ? <Button disabled={!note||loading} onClick={() => OnClickNext()}>
                    
                    Next{loading ? <Loader2 className="animate-spin"/> : <ArrowRight/>}</Button> 
                    : <Button disabled={loading || !selectedDoctor} onClick={() => onStartConsultation()}>Start Consultation
                        {loading ? <Loader2 className="animate-spin"/> : <ArrowRight/>}
                    </Button>}

            </DialogFooter>
        </DialogContent>
    </Dialog>
  )
}

export default AddNewSessionDialog