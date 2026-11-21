import React from "react";
import ModeToggle from "./ModeToggle";
import { Button } from "./ui/button";
import { currentUser } from "@clerk/nextjs/server";
import { SignInButton, UserButton } from "@clerk/nextjs";
import { AppNav } from "./nav/AppNav";

async function DesktopNavbar() {
  const user = await currentUser();
  const username = user?.username ?? user?.emailAddresses[0]?.emailAddress.split("@")[0];

  return (
    <div className="hidden md:flex items-center gap-2">
      <ModeToggle />
      <AppNav signedIn={!!user} username={username} layout="desktop" />
      {user ? (
        <UserButton />
      ) : (
        <SignInButton mode="modal">
          <Button>Sign in</Button>
        </SignInButton>
      )}
    </div>
  );
}

export default DesktopNavbar;
