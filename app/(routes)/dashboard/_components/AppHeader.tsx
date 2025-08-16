import React from 'react'
import Image from 'next/image';
import { UserButton } from '@clerk/nextjs';

const menuOptions= [
    { id:1, name: 'Home', href: '/home' },
    { id:2, name: 'History', href: '/history' },
    { id:3, name: 'Pricing', href: '/pricing' },
    { id:4, name: 'Profile', href: '/profile' },
];

function AppHeader() {
  return (
    <div className='flex items-center justify-between p-4 shadow px-10 md:px-20 lg:px-40'>
        <Image src="/logo.svg" alt="Logo" width={36} height={18} /> 
        <div className="hidden md:flex items-center gap-12">
            {menuOptions.map((option,index) => (
                <div key={index}>
                    <h2 className='hover:font-bold cursor-pointer transition-all'>{option.name}</h2>
                </div>
            ))}
        </div>
        <UserButton/>
    </div>
  )
}

export default AppHeader