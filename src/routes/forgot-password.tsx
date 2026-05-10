import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AuthShell } from "./login";

export const Route = createFileRoute("/forgot-password")({
  head: () => ({ meta: [{ title: "Reset password — Aria" }] }),
  component: Forgot,
});

function Forgot() {
  return (
    <AuthShell
      title="Reset your password"
      subtitle="We'll send a reset link to your email."
      footer={<><Link to="/login" className="text-primary font-medium hover:underline">Back to log in</Link></>}
    >
      <form className="space-y-4">
        <div className="space-y-1.5">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="you@example.com" className="h-11 rounded-xl" />
        </div>
        <Button asChild className="w-full rounded-full h-11">
          <Link to="/reset-password">Send reset link</Link>
        </Button>
      </form>
    </AuthShell>
  );
}
