import Link from "next/link";
import { AuthButtons } from "./AuthButtons";
import { Wordmark } from "./Wordmark";

/** Phone header: spine-blue strip with the wordmark. Navigation lives in the tab bar. */
export function TopBar() {
  return (
    <header className="on-spine sticky top-0 z-30 flex h-14 items-center justify-between bg-spine px-4 text-on-spine lg:hidden">
      <Link href="/" aria-label="be2gether home"><Wordmark /></Link>
      <AuthButtons onSpine />
    </header>
  );
}
