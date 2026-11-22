import type { ReactNode } from "react";
import { Toaster } from "@/components/ui/Toaster";
import { ComposerDialog } from "@/components/feed/ComposerDialog";
import { AsideColumn } from "./AsideColumn";
import { Boot } from "./Boot";
import { Rail } from "./Rail";
import { TabBar } from "./TabBar";
import { TopBar } from "./TopBar";

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-dvh">
      <Boot />
      <Rail />
      <div className="min-w-0 flex-1">
        <TopBar />
        <div className="mx-auto flex w-full max-w-[62rem] gap-10 px-4 pb-[calc(6rem+var(--safe-bottom))] pt-6 sm:px-8 lg:pb-16 lg:pt-10">
          <main id="main" className="min-w-0 flex-1 xl:max-w-[42rem]">{children}</main>
          <AsideColumn />
        </div>
      </div>
      <TabBar />
      <ComposerDialog />
      <Toaster />
    </div>
  );
}
