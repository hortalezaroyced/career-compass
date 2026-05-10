import { createFileRoute } from "@tanstack/react-router";
import { Screen } from "@/components/layout/app-shell";
import { Section, ScoreGauge, Chip } from "@/components/ui-ext/primitives";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Upload, FileText, AlertCircle, CheckCircle2, Copy } from "lucide-react";
import { atsResult } from "@/lib/mock-data";

export const Route = createFileRoute("/app/ats")({
  head: () => ({ meta: [{ title: "ATS Checker — Aria" }] }),
  component: ATS,
});

function ATS() {
  return (
    <Screen title="ATS Checker" subtitle="Score your resume against any job description.">
      <div className="grid lg:grid-cols-2 gap-4">
        <div className="rounded-2xl border border-border/60 bg-card p-5">
          <div className="flex items-center gap-2 mb-3"><FileText className="size-4 text-primary" /><span className="font-medium">Your resume</span></div>
          <div className="rounded-xl border-2 border-dashed border-border p-6 text-center">
            <Upload className="size-6 mx-auto text-muted-foreground mb-2" />
            <p className="text-sm font-medium">Frontend Engineer · 2025.pdf</p>
            <p className="text-xs text-muted-foreground mt-1">Click to swap</p>
          </div>
        </div>
        <div className="rounded-2xl border border-border/60 bg-card p-5">
          <div className="flex items-center gap-2 mb-3"><FileText className="size-4 text-primary" /><span className="font-medium">Job description</span></div>
          <Textarea placeholder="Paste the JD here…" className="rounded-xl min-h-[140px]" defaultValue="We are looking for a senior frontend engineer experienced in React, TypeScript, GraphQL, and AWS to build consumer-scale products…" />
        </div>
      </div>

      <Button className="rounded-full mt-4 w-full lg:w-auto">Run ATS check</Button>

      {/* Results */}
      <Section title="Results" className="mt-10">
        <div className="rounded-3xl gradient-warm p-6 lg:p-8 flex flex-col lg:flex-row items-center gap-6">
          <ScoreGauge value={atsResult.score} size={140} label="ATS score" />
          <div className="flex-1 text-center lg:text-left">
            <h3 className="font-display text-xl font-semibold">Solid match — almost there</h3>
            <p className="text-sm text-foreground/70 mt-1">Add 2 missing keywords and quantify 3 bullets to push past 90.</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-4 mt-4">
          <div className="rounded-2xl border border-border/60 bg-card p-5">
            <h4 className="font-medium mb-3 flex items-center gap-2"><CheckCircle2 className="size-4 text-success" /> Matched ({atsResult.matched.length})</h4>
            <div className="flex flex-wrap gap-1.5">
              {atsResult.matched.map((k) => <Chip key={k} tone="success">{k}</Chip>)}
            </div>
          </div>
          <div className="rounded-2xl border border-border/60 bg-card p-5">
            <h4 className="font-medium mb-3 flex items-center gap-2"><AlertCircle className="size-4 text-warning" /> Missing ({atsResult.missing.length})</h4>
            <div className="flex flex-wrap gap-1.5">
              {atsResult.missing.map((k) => <Chip key={k} tone="warning">{k}</Chip>)}
            </div>
          </div>
        </div>
      </Section>

      <Section title="Suggestions" className="mt-8">
        <div className="space-y-2">
          {atsResult.suggestions.map((s, i) => (
            <div key={i} className="rounded-2xl border border-border/60 bg-card p-4 flex gap-3">
              <div className={`size-8 rounded-lg flex items-center justify-center shrink-0 ${s.severity === "high" ? "bg-destructive/10 text-destructive" : s.severity === "medium" ? "bg-accent/40 text-accent-foreground" : "bg-muted text-muted-foreground"}`}>
                <AlertCircle className="size-4" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-medium text-sm">{s.title}</div>
                <div className="text-sm text-muted-foreground mt-0.5">{s.detail}</div>
              </div>
              <Button variant="ghost" size="icon" className="rounded-full shrink-0"><Copy className="size-4" /></Button>
            </div>
          ))}
        </div>
      </Section>
    </Screen>
  );
}
