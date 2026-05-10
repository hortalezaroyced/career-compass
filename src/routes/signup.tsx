import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AuthShell, SocialButtons, Divider } from "./login";
import { useState } from "react";

export const Route = createFileRoute("/signup")({
  head: () => ({ meta: [{ title: "Sign up — Aria" }, { name: "description", content: "Create your Aria account." }] }),
  component: Signup,
});

function Signup() {
  const [pw, setPw] = useState("");
  const strength = pw.length === 0 ? 0 : pw.length < 6 ? 1 : pw.length < 10 ? 2 : 3;
  const strengthLabel = ["", "Weak", "Okay", "Strong"][strength];
  const strengthColor = ["bg-muted", "bg-destructive", "bg-warning", "bg-success"][strength];
  return (
    <AuthShell
      title="Create your account"
      subtitle="Free forever. No credit card required."
      footer={<>Already have an account? <Link to="/login" className="text-primary font-medium hover:underline">Log in</Link></>}
    >
      <SocialButtons />
      <Divider />
      <form className="space-y-4">
        <div className="space-y-1.5">
          <Label htmlFor="name">Full name</Label>
          <Input id="name" placeholder="Alex Reed" className="h-11 rounded-xl" />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="you@example.com" className="h-11 rounded-xl" />
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
        <Button asChild className="w-full rounded-full h-11">
          <Link to="/onboarding">Create account</Link>
        </Button>
        <p className="text-xs text-muted-foreground text-center">By continuing you agree to our Terms and Privacy Policy.</p>
      </form>
    </AuthShell>
  );
}
