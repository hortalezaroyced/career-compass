import { createFileRoute, Link } from "@tanstack/react-router";
import { Screen } from "@/components/layout/app-shell";
import { ScoreGauge, StatTile, Section, Chip } from "@/components/ui-ext/primitives";
import { Briefcase, FileText, MessagesSquare, TrendingUp, ArrowRight, Sparkles, CheckCircle2, Linkedin, Globe, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import { applications, statusLabels } from "@/lib/mock-data";

export const Route = createFileRoute("/app/dashboard")({
  head: () => ({ meta: [{ title: "Home — Aria" }] }),
  component: Dashboard,
});

const tools = [
  { to: "/app/resume", label: "Resume Builder", icon: FileText, tone: "bg-primary/10 text-primary" },
  { to: "/app/ats", label: "ATS Checker", icon: CheckCircle2, tone: "bg-accent/40 text-accent-foreground" },
  { to: "/app/review", label: "AI Review", icon: Sparkles, tone: "bg-highlight/10 text-highlight" },
  { to: "/app/interview", label: "Interview Prep", icon: MessagesSquare, tone: "bg-secondary text-secondary-foreground" },
  { to: "/app/tracker", label: "Tracker", icon: Briefcase, tone: "bg-primary/10 text-primary" },
  { to: "/app/linkedin", label: "LinkedIn", icon: Linkedin, tone: "bg-accent/40 text-accent-foreground" },
  { to: "/app/portfolio", label: "Portfolio", icon: Globe, tone: "bg-highlight/10 text-highlight" },
  { to: "/app/github", label: "GitHub", icon: Github, tone: "bg-secondary text-secondary-foreground" },
];

function Dashboard() {
  const interviews = applications.filter((a) => a.status === "interview");
  return (
    <Screen title="Welcome back, Alex" subtitle="You have 2 interviews this week. Let's get you ready.">
      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
        <StatTile label="Active apps" value={applications.filter(a => !["rejected", "saved"].includes(a.status)).length} icon={Briefcase} />
        <StatTile label="Interviews" value={interviews.length} delta="+2 this week" tone="success" icon={MessagesSquare} />
        <StatTile label="Resume score" value="87" tone="warning" icon={TrendingUp} />
        <StatTile label="ATS pass rate" value="78%" tone="highlight" icon={CheckCircle2} />
      </div>

      {/* Hero card */}
      <div className="mt-6 rounded-3xl gradient-warm p-6 lg:p-8 flex flex-col lg:flex-row items-center gap-6">
        <ScoreGauge value={87} size={130} label="Resume" />
        <div className="flex-1 text-center lg:text-left">
          <h2 className="font-display text-xl lg:text-2xl font-semibold">Your resume is in good shape</h2>
          <p className="text-sm text-foreground/70 mt-1">3 high-impact suggestions could push you to 92.</p>
          <Button asChild className="mt-4 rounded-full">
            <Link to="/app/review">View suggestions <ArrowRight className="size-4 ml-1" /></Link>
          </Button>
        </div>
      </div>

      {/* Quick tools */}
      <Section title="Quick actions" className="mt-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {tools.map((t) => (
            <Link
              key={t.to}
              to={t.to}
              className="rounded-2xl border border-border/60 bg-card p-4 hover:shadow-soft transition-shadow flex flex-col gap-3 min-h-[110px]"
            >
              <div className={`size-10 rounded-xl flex items-center justify-center ${t.tone}`}>
                <t.icon className="size-5" />
              </div>
              <div className="font-medium text-sm">{t.label}</div>
            </Link>
          ))}
        </div>
      </Section>

      {/* Upcoming interviews */}
      <Section title="Upcoming interviews" className="mt-8" action={<Link to="/app/tracker" className="text-sm text-primary">View all</Link>}>
        <div className="space-y-2">
          {interviews.map((app) => (
            <div key={app.id} className="rounded-2xl border border-border/60 bg-card p-4 flex items-center gap-3">
              <div className="size-11 rounded-xl bg-muted flex items-center justify-center font-display font-semibold">
                {app.company[0]}
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-medium truncate">{app.role}</div>
                <div className="text-sm text-muted-foreground truncate">{app.company} · {app.location}</div>
              </div>
              <Chip tone="primary">{statusLabels[app.status]}</Chip>
            </div>
          ))}
        </div>
      </Section>

      {/* Recent activity */}
      <Section title="Recent activity" className="mt-8">
        <div className="rounded-2xl border border-border/60 bg-card divide-y divide-border/60">
          {[
            { t: "ATS check", d: "Stripe — Senior Frontend Engineer", time: "2h ago", score: "82" },
            { t: "Resume updated", d: "Frontend Engineer · 2025", time: "Yesterday" },
            { t: "Interview practice", d: "System design — 25 min", time: "2 days ago" },
          ].map((a, i) => (
            <div key={i} className="p-4 flex items-center justify-between">
              <div>
                <div className="font-medium text-sm">{a.t}</div>
                <div className="text-xs text-muted-foreground">{a.d}</div>
              </div>
              <div className="text-xs text-muted-foreground">{a.time}</div>
            </div>
          ))}
        </div>
      </Section>
    </Screen>
  );
}
