import { createFileRoute, Link } from "@tanstack/react-router";
import { Screen } from "@/components/layout/app-shell";
import { Section, Chip } from "@/components/ui-ext/primitives";
import { Button } from "@/components/ui/button";
import { resumes } from "@/lib/mock-data";
import { Plus, FileText, MoreHorizontal, Download } from "lucide-react";

export const Route = createFileRoute("/app/resume")({
  head: () => ({ meta: [{ title: "Resumes — Aria" }] }),
  component: Resumes,
});

function Resumes() {
  return (
    <Screen
      title="Resumes"
      subtitle="Build, refine, and tailor for each application."
      action={
        <Button asChild className="rounded-full"><Link to="/app/resume/builder"><Plus className="size-4 mr-1" /> New resume</Link></Button>
      }
    >
      {/* Mobile new btn */}
      <div className="lg:hidden mb-4">
        <Button asChild className="w-full rounded-full h-11"><Link to="/app/resume/builder"><Plus className="size-4 mr-1" /> New resume</Link></Button>
      </div>

      <Section title="Your resumes">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {resumes.map((r) => (
            <Link
              key={r.id}
              to="/app/resume/builder"
              className="group rounded-2xl border border-border/60 bg-card overflow-hidden hover:shadow-soft transition-shadow"
            >
              <div className="aspect-[3/4] bg-surface relative overflow-hidden">
                <div className="absolute inset-4 bg-background rounded-lg p-3 shadow-soft">
                  <div className="h-2 w-2/3 rounded-full bg-foreground/80 mb-2" />
                  <div className="h-1 w-1/2 rounded-full bg-muted-foreground/40 mb-3" />
                  <div className="space-y-1">
                    {Array.from({ length: 8 }).map((_, i) => (
                      <div key={i} className="h-1 rounded-full bg-muted" style={{ width: `${50 + ((i * 13) % 50)}%` }} />
                    ))}
                  </div>
                </div>
              </div>
              <div className="p-4 flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <div className="font-medium truncate">{r.title}</div>
                  <div className="text-xs text-muted-foreground">{r.template} · {r.updated}</div>
                </div>
                <Chip tone={r.score >= 85 ? "success" : "warning"}>{r.score}</Chip>
              </div>
            </Link>
          ))}

          <Link to="/app/resume/builder" className="rounded-2xl border-2 border-dashed border-border flex flex-col items-center justify-center min-h-[280px] hover:border-primary/40 hover:bg-muted/40 transition-colors">
            <div className="size-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-3"><Plus className="size-5" /></div>
            <div className="font-medium">New resume</div>
            <div className="text-xs text-muted-foreground mt-1">Pick a template to start</div>
          </Link>
        </div>
      </Section>

      <Section title="Templates" className="mt-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {["Modern", "Minimal", "Editorial", "Classic"].map((t) => (
            <div key={t} className="rounded-2xl border border-border/60 bg-card overflow-hidden">
              <div className="aspect-[3/4] bg-gradient-to-br from-surface to-muted flex items-center justify-center">
                <FileText className="size-8 text-muted-foreground/40" />
              </div>
              <div className="p-3 text-sm font-medium text-center">{t}</div>
            </div>
          ))}
        </div>
      </Section>
    </Screen>
  );
}
