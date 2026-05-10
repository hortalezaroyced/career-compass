import { createFileRoute, Link } from "@tanstack/react-router";
import { Check, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/pricing")({
  head: () => ({
    meta: [
      { title: "Pricing — Aria" },
      { name: "description", content: "Simple plans for every stage of your career search. Free forever, with Pro and Team upgrades." },
    ],
  }),
  component: Pricing,
});

const tiers = [
  {
    name: "Free",
    price: "$0",
    cadence: "forever",
    desc: "Get started with the essentials.",
    features: ["1 resume", "5 ATS checks / month", "Basic interview prep", "Application tracker (10 apps)"],
    cta: "Start free",
    highlight: false,
  },
  {
    name: "Pro",
    price: "$12",
    cadence: "/ month",
    desc: "For active job seekers.",
    features: ["Unlimited resumes", "Unlimited ATS & AI Review", "Interview practice + voice", "Unlimited applications", "LinkedIn / Portfolio / GitHub analyzers"],
    cta: "Start 7-day trial",
    highlight: true,
  },
  {
    name: "Team",
    price: "$29",
    cadence: "/ user / mo",
    desc: "For coaches and bootcamps.",
    features: ["Everything in Pro", "Shared templates", "Coach review queue", "Cohort analytics", "Priority support"],
    cta: "Contact sales",
    highlight: false,
  },
];

function Pricing() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border/60">
        <div className="max-w-6xl mx-auto px-4 lg:px-8 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
            <ArrowLeft className="size-4" /> Back
          </Link>
          <Link to="/" className="flex items-center gap-2">
            <div className="size-7 rounded-lg gradient-sage" />
            <span className="font-display font-semibold">Aria</span>
          </Link>
          <Button asChild size="sm" className="rounded-full"><Link to="/signup">Sign up</Link></Button>
        </div>
      </header>

      <section className="py-16 lg:py-24 text-center max-w-3xl mx-auto px-4">
        <h1 className="font-display text-4xl lg:text-6xl font-semibold tracking-tight">Simple pricing. Real value.</h1>
        <p className="mt-4 text-muted-foreground">Free forever for casual use. Upgrade when you're actively searching.</p>
      </section>

      <section className="px-4 pb-16">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-4">
          {tiers.map((t) => (
            <div
              key={t.name}
              className={cn(
                "rounded-3xl border p-6 lg:p-8 flex flex-col",
                t.highlight ? "border-primary/40 bg-primary/5 shadow-soft" : "border-border/60 bg-card"
              )}
            >
              {t.highlight && <div className="self-start mb-3 inline-flex items-center gap-1 rounded-full bg-primary px-2.5 py-0.5 text-xs font-medium text-primary-foreground">Most popular</div>}
              <h3 className="font-display text-2xl font-semibold">{t.name}</h3>
              <p className="text-sm text-muted-foreground mt-1">{t.desc}</p>
              <div className="mt-6 flex items-baseline gap-1">
                <span className="font-display text-5xl font-semibold">{t.price}</span>
                <span className="text-muted-foreground text-sm">{t.cadence}</span>
              </div>
              <ul className="mt-6 space-y-2.5 flex-1">
                {t.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm">
                    <Check className="size-4 text-primary mt-0.5 shrink-0" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <Button asChild className={cn("mt-8 rounded-full", t.highlight ? "" : "")} variant={t.highlight ? "default" : "outline"}>
                <Link to="/signup">{t.cta}</Link>
              </Button>
            </div>
          ))}
        </div>

        <div className="max-w-4xl mx-auto mt-16 rounded-3xl bg-surface border border-border/60 p-8">
          <h3 className="font-display text-xl font-semibold">We accept payments worldwide</h3>
          <p className="text-sm text-muted-foreground mt-1">Stripe, PayPal, GCash, Maya, and PayMongo for the Philippines.</p>
          <div className="mt-5 flex flex-wrap gap-2">
            {["Stripe", "PayPal", "GCash", "Maya", "PayMongo"].map((m) => (
              <span key={m} className="px-3 py-1.5 rounded-full bg-background border border-border/60 text-sm">{m}</span>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
