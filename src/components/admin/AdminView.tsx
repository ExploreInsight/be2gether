"use client";
import { useResource } from "@/hooks/useResource";
import { useSession } from "@/stores/session";
import { EmptyState, ErrorState } from "@/components/ui/State";
import { AuthButtons } from "@/components/layout/AuthButtons";
import { DemoPanel } from "./DemoPanel";
import { ReportList } from "./ReportList";
import type { ReportRow } from "@/types";

export function AdminView() {
  const me = useSession((s) => s.me);
  const status = useSession((s) => s.status);
  const reports = useResource<ReportRow[]>(me?.isAdmin ? "/api/admin/reports" : null);
  return (
    <div className="space-y-8">
      <h1 className="border-b-2 border-ink pb-2 font-display text-5xl font-black uppercase leading-none">Admin</h1>
      {status === "ready" && !me && <EmptyState title="Sign in" action={<AuthButtons />}>Admins can review reports here.</EmptyState>}
      {me && !me.isAdmin && <EmptyState title="Admins only">Your account is not listed in ADMIN_EMAILS.</EmptyState>}
      {me?.isAdmin && (
        <>
          <section aria-labelledby="rep" className="space-y-3">
            <h2 id="rep" className="font-display text-3xl font-black uppercase leading-none">Reports</h2>
            {reports.status === "error" ? <ErrorState message={reports.error} onRetry={reports.reload} /> : <ReportList rows={reports.data} loading={reports.status === "loading"} onChanged={reports.reload} />}
          </section>
          <DemoPanel />
        </>
      )}
    </div>
  );
}
