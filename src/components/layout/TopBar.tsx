import Link from "next/link";
import { AuthButtons } from "./AuthButtons";
import { Wordmark } from "./Wordmark";

/** Phone header. Navigation lives in the tab bar. */
export function TopBar() {
  return (
    <header className="sticky top-0 z-30 flex h-14 items-center justify-between border-b border-rule bg-card/95 px-4 lg:hidden">
      <Link href="/" aria-label="be2gether home"><Wordmark /></Link>
      <AuthButtons />
    </header>
  );
}
