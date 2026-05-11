import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AuthShell, SocialButtons, Divider } from "./login";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, Upload } from "lucide-react";

export const Route = createFileRoute("/signup")({
  head: () => ({ meta: [{ title: "Sign up — Ascendrox" }, { name: "description", content: "Create your Ascendrox account." }] }),
  component: Signup,
});

const STAGES = ["Student", "Fresh Graduate", "Entry-Level Professional", "Mid-Level Professional", "Senior Professional", "Career Shifter", "Freelancer"];
const INDUSTRIES = ["Technology", "Healthcare", "Finance", "Education", "Marketing", "Government", "Other"];

function StepDots({ step }: { step: 1 | 2 }) {
  return (
    <div className="flex items-center justify-center gap-2 mb-5">
      <span className="text-xs font-medium text-muted-foreground">Step {step} of 2</span>
      <div className="flex gap-1.5 ml-1">
        <div className={`h-1.5 rounded-full transition-all ${step >= 1 ? "w-6 bg-primary" : "w-3 bg-muted"}`} />
        <div className={`h-1.5 rounded-full transition-all ${step >= 2 ? "w-6 bg-primary" : "w-3 bg-muted"}`} />
      </div>
    </div>
  );
}

function Signup() {
  const navigate = useNavigate();
  const [step, setStep] = useState<1 | 2>(1);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [confirmPw, setConfirmPw] = useState("");
  const [stage, setStage] = useState("");
  const [role, setRole] = useState("");
  const [industry, setIndustry] = useState("");

  const strength = pw.length === 0 ? 0 : pw.length < 6 ? 1 : pw.length < 10 ? 2 : 3;
  const strengthLabel = ["", "Weak", "Okay", "Strong"][strength];
  const strengthColor = ["bg-muted", "bg-destructive", "bg-warning", "bg-success"][strength];

  const step1Valid = name.trim() && email.trim() && pw.length >= 6 && pw === confirmPw;
  const passwordsMismatch = confirmPw.length > 0 && pw !== confirmPw;

  return (
    <AuthShell
      title={step === 1 ? "Create your account" : "Personalize your journey"}
      subtitle={step === 1 ? "Free forever. No credit card required." : "Tell us a bit about your career so we can tailor Ascendrox."}
      footer={step === 1 ? <>Already have an account? <Link to="/login" className="text-primary font-medium hover:underline">Log in</Link></> : undefined}
    >
      <StepDots step={step} />

      <AnimatePresence mode="wait" initial={false}>
        {step === 1 ? (
          <motion.div
            key="step1"
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -16 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          >
            <SocialButtons />
            <Divider />
            <form
              className="space-y-4"
              onSubmit={(e) => {
                e.preventDefault();
                if (step1Valid) setStep(2);
              }}
            >
              <div className="space-y-1.5">
                <Label htmlFor="name">Full name</Label>
                <Input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Alex Reed" className="h-11 rounded-xl" />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="email">Email address</Label>
                <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" className="h-11 rounded-xl" />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" value={pw} onChange={(e) => setPw(e.target.value)} placeholder="••••••••" className="h-11 rounded-xl" />
                <div className="flex gap-1 mt-2">
                  {[0, 1, 2].map((i) => (
                    <div key={i} className={`flex-1 h-1 rounded-full ${i < strength ? strengthColor : "bg-muted"}`} />
                  ))}
                </div>
                {strengthLabel && <p className="text-xs text-muted-foreground">{strengthLabel}</p>}
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="confirm">Confirm password</Label>
                <Input id="confirm" type="password" value={confirmPw} onChange={(e) => setConfirmPw(e.target.value)} placeholder="••••••••" className="h-11 rounded-xl" />
                {passwordsMismatch && <p className="text-xs text-destructive">Passwords don't match.</p>}
              </div>
              <Button type="submit" disabled={!step1Valid} className="w-full rounded-full h-11">
                Continue
              </Button>
              <p className="text-xs text-muted-foreground text-center">By continuing you agree to our Terms and Privacy Policy.</p>
            </form>
          </motion.div>
        ) : (
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -16 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          >
            <form
              className="space-y-4"
              onSubmit={(e) => {
                e.preventDefault();
                navigate({ to: "/onboarding" });
              }}
            >
              <div className="space-y-1.5">
                <Label>Current career stage</Label>
                <Select value={stage} onValueChange={setStage}>
                  <SelectTrigger className="h-11 rounded-xl">
                    <SelectValue placeholder="Select your stage" />
                  </SelectTrigger>
                  <SelectContent>
                    {STAGES.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="role">Target role</Label>
                <Input id="role" value={role} onChange={(e) => setRole(e.target.value)} placeholder="e.g. Software Engineer" className="h-11 rounded-xl" />
              </div>
              <div className="space-y-1.5">
                <Label>Industry</Label>
                <Select value={industry} onValueChange={setIndustry}>
                  <SelectTrigger className="h-11 rounded-xl">
                    <SelectValue placeholder="Select your industry" />
                  </SelectTrigger>
                  <SelectContent>
                    {INDUSTRIES.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>

              <div className="rounded-2xl border border-dashed border-border bg-muted/30 p-4 flex items-center gap-3">
                <div className="size-10 rounded-xl bg-background flex items-center justify-center shadow-soft">
                  <Upload className="size-4 text-muted-foreground" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium">Upload resume</p>
                  <p className="text-xs text-muted-foreground">Optional — you can do this later.</p>
                </div>
                <Button type="button" variant="outline" size="sm" className="rounded-full">Upload</Button>
              </div>

              <div className="flex flex-col gap-2 pt-1">
                <Button type="submit" className="w-full rounded-full h-11">Complete setup</Button>
                <Button asChild type="button" variant="ghost" className="w-full rounded-full h-11">
                  <Link to="/onboarding">Skip for now</Link>
                </Button>
              </div>

              <button
                type="button"
                onClick={() => setStep(1)}
                className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground"
              >
                <ArrowLeft className="size-3.5" /> Back to account details
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </AuthShell>
  );
}
