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
      <ModeToggle className="border-brand-foreground/30 text-brand-foreground hover:bg-brand-foreground/10 hover:text-brand-foreground" />
      <AppNav signedIn={!!user} username={username} layout="desktop" tone="on-brand" />
      {user ? (
        <UserButton />
      ) : (
        <SignInButton mode="modal">
          <Button className="bg-brand-foreground text-brand hover:bg-brand-foreground/90">Sign in</Button>
        </SignInButton>
      )}
    </div>
  );
}

export default DesktopNavbar;
