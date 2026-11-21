'use client'
import React, { useState } from 'react'
import { Button } from './ui/button'
import { useTheme } from 'next-themes'
import { LogOutIcon, MenuIcon, MoonIcon, SunIcon } from 'lucide-react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from './ui/sheet';
import { SignInButton, SignOutButton, useAuth, useUser } from '@clerk/nextjs';
import { AppNav } from './nav/AppNav';


const MobileNavbar = () => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const { user } = useUser();   
  const { isSignedIn } = useAuth();
  const { theme, setTheme } = useTheme();

  return (
    <div className='flex md:hidden items-center space-x-2'>
      {/* Theme Toggle */}
      <Button
        variant='ghost'
        size='icon'
        aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        className="mr-2"
      >
        <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
        <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      </Button>

      {/* Mobile Menu */}
      <Sheet open={showMobileMenu} onOpenChange={setShowMobileMenu}>
        <SheetTrigger asChild>
          <Button variant='ghost' size='icon'>
            <MenuIcon className='h-6 w-6' />
          </Button>
        </SheetTrigger>
        <SheetContent side='right' className='w-[300px]'>
          <SheetHeader>
            <SheetTitle>Menu</SheetTitle>
          </SheetHeader>

          <div className="mt-6 flex flex-col gap-1">
            <AppNav
              signedIn={!!isSignedIn}
              username={user?.username ?? user?.emailAddresses[0]?.emailAddress.split("@")[0]}
              layout="sheet"
              onNavigate={() => setShowMobileMenu(false)}
            />

            {isSignedIn ? (
              <SignOutButton>
                <Button
                  variant="ghost"
                  onClick={() => setShowMobileMenu(false)}
                  className="justify-start gap-3"
                >
                  <LogOutIcon className="size-4" />
                  Log out
                </Button>
              </SignOutButton>
            ) : (
              <SignInButton mode="modal">
                <Button className="mt-2 w-full">Sign in</Button>
              </SignInButton>
            )}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}

export default MobileNavbar;
