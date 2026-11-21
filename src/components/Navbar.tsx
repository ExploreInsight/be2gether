import React from 'react'
import DesktopNavbar from './DesktopNavbar'
import MobileNavbar from './MobileNavbar'
import { currentUser } from '@clerk/nextjs/server'
import { syncUser } from '@/actions/user.action'
import { Logo } from './brand/Logo'

async function Navbar(){
  const user = await currentUser();
  if(user) await syncUser(); // kind of like post request using server action to sync user with db
  return (
    <nav className='sticky top-0 w-full bg-primary text-primary-foreground z-50'>
      <div className='max-w-6xl mx-auto px-4'>
        <div className='flex items-center justify-between h-16'>
          <div className='flex items-center'>
            <Logo tone="inverse" />
          </div>
          <DesktopNavbar />
          <MobileNavbar />
        </div>
        </div>
    </nav>
  )
}

export default Navbar