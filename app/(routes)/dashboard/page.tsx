import React from 'react'
import HistoryList from './_components/HistoryList'
import { Button } from '@/components/ui/button'
import DoctorsAgentList from './_components/DoctorsAgentList'
import AddNewSessionDialog from './_components/AddNewSections'

function Dashboard() {
  return (
    <div>
        <div className='flex justify-between items-center mb-6'>
            <h1 className='text-2xl font-bold'>My Dashboard</h1>
            <AddNewSessionDialog/>
        </div>
        <HistoryList/>
        <DoctorsAgentList/>
    </div>
  )
}

export default Dashboard