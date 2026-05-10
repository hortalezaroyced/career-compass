import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/onboarding")({
  head: () => ({ meta: [{ title: "Welcome to Aria" }] }),
  component: Onboarding,
});

const steps = [
  {
    title: "What brings you to Aria?",
    subtitle: "Pick what fits best — you can change this later.",
    options: ["Looking for a new role", "Open to opportunities", "Coaching others", "Just exploring"],
  },
  {
    title: "What role are you targeting?",
    subtitle: "We'll tailor templates and questions to your goals.",
    options: ["Software engineering", "Product / Design", "Data / ML", "Marketing / Sales", "Other"],
  },
  {
    title: "How much experience do you have?",
    subtitle: "Helps us match the right tone.",
    options: ["Student / new grad", "1–3 years", "4–7 years", "8+ years"],
  },
];

function Onboarding() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [companies, setCompanies] = useState("");
  const navigate = useNavigate();
  const total = steps.length + 1;

  const choose = (opt: string) => {
    const next = [...answers];
    next[step] = opt;
    setAnswers(next);
    setTimeout(() => setStep((s) => s + 1), 200);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="px-4 lg:px-8 h-16 flex items-center justify-between">
        {step > 0 ? (
          <button onClick={() => setStep(step - 1)} className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
            <ArrowLeft className="size-4" /> Back
          </button>
        ) : <div />}
        <div className="flex gap-1.5">
          {Array.from({ length: total }).map((_, i) => (
            <div key={i} className={cn("h-1.5 rounded-full transition-all", i <= step ? "w-8 bg-primary" : "w-2 bg-muted")} />
          ))}
        </div>
        <button onClick={() => navigate({ to: "/app/dashboard" })} className="text-sm text-muted-foreground hover:text-foreground">Skip</button>
      </header>

      <main className="flex-1 flex items-center justify-center px-4">
        <div className="w-full max-w-md">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25 }}
            >
              {step < steps.length ? (
                <>
                  <h1 className="font-display text-3xl lg:text-4xl font-semibold tracking-tight">{steps[step].title}</h1>
                  <p className="text-muted-foreground mt-2">{steps[step].subtitle}</p>
                  <div className="mt-8 space-y-2">
                    {steps[step].options.map((opt) => (
                      <button
                        key={opt}
                        onClick={() => choose(opt)}
                        className={cn(
                          "w-full text-left px-5 py-4 rounded-2xl border-2 transition-colors min-h-[56px]",
                          answers[step] === opt ? "border-primary bg-primary/5" : "border-border hover:border-primary/40"
                        )}
                      >
                        <span className="font-medium">{opt}</span>
                      </button>
                    ))}
                  </div>
                </>
              ) : (
                <>
                  <h1 className="font-display text-3xl lg:text-4xl font-semibold tracking-tight">Any dream companies?</h1>
                  <p className="text-muted-foreground mt-2">We'll keep an eye out and tailor your prep.</p>
                  <Input
                    value={companies}
                    onChange={(e) => setCompanies(e.target.value)}
                    placeholder="Stripe, Linear, Vercel…"
                    className="mt-8 h-12 rounded-xl text-base"
                  />
                  <Button asChild className="w-full mt-6 rounded-full h-12 text-base">
                    <Link to="/app/dashboard">Enter Aria <ArrowRight className="size-4 ml-1" /></Link>
                  </Button>
                </>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
