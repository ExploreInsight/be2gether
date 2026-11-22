import { clerkMiddleware } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const PREVIEW = process.env.NEXT_PUBLIC_PREVIEW === "1";

export default PREVIEW ? () => NextResponse.next() : clerkMiddleware();

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
