import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AuthShell } from "./login";

export const Route = createFileRoute("/reset-password")({
  head: () => ({ meta: [{ title: "Set new password — Aria" }] }),
  component: Reset,
});

function Reset() {
  return (
    <AuthShell title="Set a new password" subtitle="Choose a strong, memorable password.">
      <form className="space-y-4">
        <div className="space-y-1.5">
          <Label htmlFor="password">New password</Label>
          <Input id="password" type="password" placeholder="••••••••" className="h-11 rounded-xl" />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="confirm">Confirm password</Label>
          <Input id="confirm" type="password" placeholder="••••••••" className="h-11 rounded-xl" />
        </div>
        <Button asChild className="w-full rounded-full h-11">
          <Link to="/login">Save password</Link>
        </Button>
      </form>
    </AuthShell>
  );
}
