import React from 'react'
import DesktopNavbar from './DesktopNavbar'
import MobileNavbar from './MobileNavbar'
import { currentUser } from '@clerk/nextjs/server'
import { syncUser } from '@/actions/user.action'
import { Wordmark } from './brand/Wordmark'

async function Navbar(){
  const user = await currentUser();
  if(user) await syncUser(); // kind of like post request using server action to sync user with db
  return (
    <nav className='sticky top-0 w-full border-b bg-background z-50'>
      <div className='max-w-7xl mx-auto px-4'>
        <div className='flex items-center justify-between h-14'>
          <div className='flex items-center'>
            <Wordmark />
          </div>
          <DesktopNavbar />
          <MobileNavbar />
        </div>
        </div>
    </nav>
  )
}

export default Navbar