import { createFileRoute } from "@tanstack/react-router";
import { Screen } from "@/components/layout/app-shell";
import { Section, Chip } from "@/components/ui-ext/primitives";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { invoices } from "@/lib/mock-data";
import { CreditCard, Plus, Check, Download } from "lucide-react";
import { Progress } from "@/components/ui/progress";

export const Route = createFileRoute("/app/billing")({
  head: () => ({ meta: [{ title: "Billing — Aria" }] }),
  component: Billing,
});

const paymentMethods = [
  { id: "stripe", name: "Stripe", desc: "Cards, Apple Pay, Google Pay", emoji: "💳" },
  { id: "paypal", name: "PayPal", desc: "Pay with your PayPal balance", emoji: "🅿️" },
  { id: "gcash", name: "GCash", desc: "Philippine e-wallet", emoji: "🇵🇭" },
  { id: "maya", name: "Maya", desc: "Philippine e-wallet", emoji: "💚" },
  { id: "paymongo", name: "PayMongo", desc: "PH cards & bank transfer", emoji: "🏦" },
];

function Billing() {
  return (
    <Screen title="Billing" subtitle="Manage your plan, payment methods, and invoices.">
      {/* Current plan */}
      <div className="rounded-3xl gradient-warm p-6 lg:p-8 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div>
          <Chip tone="primary">Current plan</Chip>
          <h3 className="font-display text-2xl font-semibold mt-2">Pro · $12/mo</h3>
          <p className="text-sm text-foreground/70 mt-1">Renews May 28, 2025</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="rounded-full bg-background/60">Change plan</Button>
          <Button variant="ghost" className="rounded-full">Cancel</Button>
        </div>
      </div>

      <Section title="Usage this month" className="mt-8">
        <div className="grid sm:grid-cols-3 gap-3">
          {[
            { label: "ATS checks", value: 14, max: 100 },
            { label: "AI rewrites", value: 38, max: 200 },
            { label: "Interview minutes", value: 92, max: 300 },
          ].map((u) => (
            <div key={u.label} className="rounded-2xl border border-border/60 bg-card p-4">
              <div className="text-sm text-muted-foreground">{u.label}</div>
              <div className="font-display text-2xl font-semibold mt-1 tabular-nums">{u.value}<span className="text-sm text-muted-foreground"> / {u.max}</span></div>
              <Progress value={(u.value / u.max) * 100} className="mt-2 h-1.5" />
            </div>
          ))}
        </div>
      </Section>

      <Section
        title="Payment methods"
        className="mt-8"
        action={
          <Sheet>
            <SheetTrigger asChild><Button variant="outline" size="sm" className="rounded-full"><Plus className="size-4 mr-1" /> Add method</Button></SheetTrigger>
            <SheetContent side="bottom" className="h-auto max-h-[80vh]">
              <SheetHeader><SheetTitle>Add payment method</SheetTitle></SheetHeader>
              <div className="mt-4 space-y-2">
                {paymentMethods.map((m) => (
                  <button key={m.id} className="w-full flex items-center gap-3 p-4 rounded-2xl border border-border hover:border-primary/40 hover:bg-muted/40 transition-colors text-left">
                    <div className="size-10 rounded-xl bg-muted flex items-center justify-center text-xl">{m.emoji}</div>
                    <div className="flex-1">
                      <div className="font-medium">{m.name}</div>
                      <div className="text-xs text-muted-foreground">{m.desc}</div>
                    </div>
                  </button>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        }
      >
        <div className="rounded-2xl border border-border/60 bg-card divide-y divide-border/60">
          <div className="p-4 flex items-center gap-3">
            <div className="size-10 rounded-xl bg-muted flex items-center justify-center"><CreditCard className="size-5" /></div>
            <div className="flex-1">
              <div className="font-medium">Visa ending 4242</div>
              <div className="text-xs text-muted-foreground">Expires 12/27 · Default</div>
            </div>
            <Chip tone="success"><Check className="size-3" /> Active</Chip>
          </div>
        </div>
      </Section>

      <Section title="Invoices" className="mt-8">
        <div className="rounded-2xl border border-border/60 bg-card divide-y divide-border/60">
          {invoices.map((inv) => (
            <div key={inv.id} className="p-4 flex items-center justify-between gap-3">
              <div>
                <div className="font-medium text-sm">{inv.id}</div>
                <div className="text-xs text-muted-foreground">{inv.date}</div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium">{inv.amount}</span>
                <Chip tone="success">Paid</Chip>
                <Button variant="ghost" size="icon" className="rounded-full"><Download className="size-4" /></Button>
              </div>
            </div>
          ))}
        </div>
      </Section>
    </Screen>
  );
}
