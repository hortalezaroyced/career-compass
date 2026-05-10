import { createFileRoute } from "@tanstack/react-router";
import { Screen } from "@/components/layout/app-shell";
import { SegmentedControl, Chip, EmptyState } from "@/components/ui-ext/primitives";
import { Button } from "@/components/ui/button";
import { applications, statusLabels, statusOrder, type ApplicationStatus, type Application } from "@/lib/mock-data";
import { Plus, Briefcase, MapPin } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/tracker")({
  head: () => ({ meta: [{ title: "Application Tracker — Aria" }] }),
  component: Tracker,
});

function ApplicationCard({ app }: { app: Application }) {
  return (
    <div className="rounded-2xl border border-border/60 bg-card p-4 hover:shadow-soft transition-shadow">
      <div className="flex items-start gap-3">
        <div className="size-10 rounded-xl bg-muted flex items-center justify-center font-display font-semibold shrink-0">
          {app.company[0]}
        </div>
        <div className="flex-1 min-w-0">
          <div className="font-medium truncate">{app.role}</div>
          <div className="text-sm text-muted-foreground truncate">{app.company}</div>
          <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
            <span className="flex items-center gap-1"><MapPin className="size-3" />{app.location}</span>
            {app.salary && <span>{app.salary}</span>}
          </div>
        </div>
      </div>
    </div>
  );
}

function Tracker() {
  const [view, setView] = useState<"list" | "kanban" | "timeline">("list");
  const [filter, setFilter] = useState<"all" | ApplicationStatus>("all");
  const filtered = filter === "all" ? applications : applications.filter((a) => a.status === filter);

  return (
    <Screen
      title="Tracker"
      subtitle={`${applications.length} applications`}
      action={<Button className="rounded-full"><Plus className="size-4 mr-1" /> Add application</Button>}
    >
      {/* View switcher: kanban only on lg, list+timeline mobile */}
      <div className="hidden lg:flex mb-4">
        <SegmentedControl
          options={[{ value: "kanban", label: "Kanban" }, { value: "list", label: "List" }, { value: "timeline", label: "Timeline" }]}
          value={view}
          onChange={setView as (v: string) => void}
        />
      </div>
      <div className="lg:hidden mb-4">
        <SegmentedControl
          options={[{ value: "list", label: "List" }, { value: "timeline", label: "Timeline" }]}
          value={view === "kanban" ? "list" : view}
          onChange={setView as (v: string) => void}
        />
      </div>

      {/* Filters */}
      {view !== "kanban" && (
        <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4 lg:mx-0 lg:px-0 mb-4">
          {(["all", ...statusOrder] as const).map((s) => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={cn(
                "px-3.5 py-1.5 rounded-full text-sm whitespace-nowrap transition-colors min-h-[36px]",
                filter === s ? "bg-foreground text-background" : "bg-muted text-muted-foreground hover:text-foreground"
              )}
            >
              {s === "all" ? "All" : statusLabels[s]}
              <span className="ml-1.5 text-xs opacity-70">{s === "all" ? applications.length : applications.filter((a) => a.status === s).length}</span>
            </button>
          ))}
        </div>
      )}

      {view === "list" && (
        <div className="space-y-2">
          {filtered.length === 0 ? (
            <EmptyState icon={Briefcase} title="No applications" description="Add your first application to start tracking." />
          ) : (
            filtered.map((a) => (
              <div key={a.id} className="flex items-center gap-3">
                <div className="flex-1"><ApplicationCard app={a} /></div>
                <Chip tone={a.status === "offer" ? "success" : a.status === "rejected" ? "destructive" : a.status === "interview" ? "primary" : "default"}>
                  {statusLabels[a.status]}
                </Chip>
              </div>
            ))
          )}
        </div>
      )}

      {view === "kanban" && (
        <div className="grid grid-cols-5 gap-3 overflow-x-auto">
          {statusOrder.map((s) => (
            <div key={s} className="min-w-[220px] rounded-2xl bg-surface p-3">
              <div className="flex items-center justify-between mb-3 px-1">
                <span className="font-medium text-sm">{statusLabels[s]}</span>
                <span className="text-xs text-muted-foreground">{applications.filter((a) => a.status === s).length}</span>
              </div>
              <div className="space-y-2">
                {applications.filter((a) => a.status === s).map((a) => <ApplicationCard key={a.id} app={a} />)}
              </div>
            </div>
          ))}
        </div>
      )}

      {view === "timeline" && (
        <div className="relative pl-6 space-y-4">
          <div className="absolute left-2 top-0 bottom-0 w-px bg-border" />
          {[...filtered].sort((a, b) => b.appliedDate.localeCompare(a.appliedDate)).map((a) => (
            <div key={a.id} className="relative">
              <div className="absolute -left-[18px] top-5 size-3 rounded-full bg-primary border-4 border-background" />
              <div className="text-xs text-muted-foreground mb-1">{a.appliedDate}</div>
              <ApplicationCard app={a} />
            </div>
          ))}
        </div>
      )}
    </Screen>
  );
}
