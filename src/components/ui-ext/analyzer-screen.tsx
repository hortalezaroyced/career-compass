import { Screen } from "@/components/layout/app-shell";
import { ScoreGauge, Section, Chip } from "@/components/ui-ext/primitives";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sparkles, CheckCircle2, AlertCircle, ArrowRight } from "lucide-react";
import { LucideIcon } from "lucide-react";

interface AnalyzerProps {
  title: string;
  subtitle: string;
  inputLabel: string;
  placeholder: string;
  icon: LucideIcon;
  scores: { label: string; value: number }[];
  insights: { title: string; detail: string; positive?: boolean }[];
  recommendations: string[];
  defaultValue?: string;
}

export function AnalyzerScreen({
  title, subtitle, inputLabel, placeholder, icon: Icon, scores, insights, recommendations, defaultValue,
}: AnalyzerProps) {
  const overall = Math.round(scores.reduce((s, x) => s + x.value, 0) / scores.length);
  return (
    <Screen title={title} subtitle={subtitle}>
      <div className="rounded-2xl border border-border/60 bg-card p-5">
        <label className="text-sm font-medium flex items-center gap-2 mb-2"><Icon className="size-4 text-primary" /> {inputLabel}</label>
        <div className="flex flex-col sm:flex-row gap-2">
          <Input defaultValue={defaultValue} placeholder={placeholder} className="rounded-xl h-11 flex-1" />
          <Button className="rounded-full h-11 px-6"><Sparkles className="size-4 mr-1" /> Analyze</Button>
        </div>
      </div>

      <Section title="Overall" className="mt-8">
        <div className="rounded-3xl gradient-warm p-6 lg:p-8 flex flex-col lg:flex-row items-center gap-6">
          <ScoreGauge value={overall} size={130} label="Overall" />
          <div className="flex-1 grid grid-cols-2 lg:grid-cols-4 gap-3 w-full">
            {scores.map((s) => (
              <div key={s.label} className="rounded-2xl bg-background/60 p-4">
                <div className="text-xs text-muted-foreground uppercase tracking-wide">{s.label}</div>
                <div className="font-display text-2xl font-semibold mt-1 tabular-nums">{s.value}</div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <Section title="Insights" className="mt-8">
        <div className="space-y-2">
          {insights.map((i, idx) => (
            <div key={idx} className="rounded-2xl border border-border/60 bg-card p-4 flex gap-3">
              <div className={`size-8 rounded-lg flex items-center justify-center shrink-0 ${i.positive ? "bg-success/10 text-success" : "bg-warning/20 text-warning"}`}>
                {i.positive ? <CheckCircle2 className="size-4" /> : <AlertCircle className="size-4" />}
              </div>
              <div>
                <div className="font-medium text-sm">{i.title}</div>
                <div className="text-sm text-muted-foreground mt-0.5">{i.detail}</div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Recommended next steps" className="mt-8">
        <div className="rounded-2xl border border-border/60 bg-card p-5 space-y-3">
          {recommendations.map((r, i) => (
            <div key={i} className="flex items-start gap-3">
              <div className="size-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-semibold shrink-0 mt-0.5">{i + 1}</div>
              <p className="text-sm">{r}</p>
            </div>
          ))}
          <Button variant="outline" className="rounded-full mt-2">Apply all <ArrowRight className="size-4 ml-1" /></Button>
        </div>
      </Section>
    </Screen>
  );
}
