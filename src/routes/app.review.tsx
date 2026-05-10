import { createFileRoute } from "@tanstack/react-router";
import { Screen } from "@/components/layout/app-shell";
import { Section, Chip } from "@/components/ui-ext/primitives";
import { Button } from "@/components/ui/button";
import { reviewIssues } from "@/lib/mock-data";
import { Sparkles, X, Check } from "lucide-react";

export const Route = createFileRoute("/app/review")({
  head: () => ({ meta: [{ title: "AI Resume Review — Aria" }] }),
  component: Review,
});

const tone = {
  critical: "destructive",
  warning: "warning",
  suggestion: "primary",
} as const;

function Review() {
  return (
    <Screen title="AI Resume Review" subtitle="Line-by-line feedback with suggested rewrites.">
      <div className="rounded-3xl gradient-warm p-6 lg:p-8 flex items-center gap-4">
        <div className="size-12 rounded-2xl bg-background flex items-center justify-center"><Sparkles className="size-5 text-primary" /></div>
        <div className="flex-1">
          <h3 className="font-display text-lg lg:text-xl font-semibold">{reviewIssues.length} issues found</h3>
          <p className="text-sm text-foreground/70">Reviewing "Frontend Engineer · 2025"</p>
        </div>
        <Button className="rounded-full hidden sm:inline-flex">Re-run</Button>
      </div>

      <Section title="Issues" className="mt-6">
        <div className="space-y-3">
          {reviewIssues.map((i) => (
            <div key={i.id} className="rounded-2xl border border-border/60 bg-card p-5">
              <div className="flex items-center gap-2 mb-2">
                <Chip tone={tone[i.severity]}>{i.severity}</Chip>
                <span className="text-sm text-muted-foreground">{i.section}</span>
              </div>
              <div className="font-medium">{i.issue}</div>
              <div className="mt-3 rounded-xl bg-muted p-3 text-sm">
                <div className="text-xs uppercase tracking-wide text-muted-foreground mb-1">Suggested rewrite</div>
                <p>{i.suggestion}</p>
              </div>
              <div className="mt-3 flex gap-2">
                <Button size="sm" className="rounded-full"><Check className="size-3.5 mr-1" /> Apply</Button>
                <Button size="sm" variant="ghost" className="rounded-full"><X className="size-3.5 mr-1" /> Dismiss</Button>
              </div>
            </div>
          ))}
        </div>
      </Section>
    </Screen>
  );
}
