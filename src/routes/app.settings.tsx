import { createFileRoute, Link } from "@tanstack/react-router";
import { Screen } from "@/components/layout/app-shell";
import { Section } from "@/components/ui-ext/primitives";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { useTheme } from "next-themes";
import { Sun, Moon, LogOut, Trash2, Download } from "lucide-react";

export const Route = createFileRoute("/app/settings")({
  head: () => ({ meta: [{ title: "Settings — Aria" }] }),
  component: Settings,
});

function Settings() {
  const { theme, setTheme } = useTheme();
  return (
    <Screen title="Profile & Settings" subtitle="Account, preferences, and notifications.">
      <Section title="Profile">
        <div className="rounded-2xl border border-border/60 bg-card p-5 lg:p-6 space-y-4">
          <div className="flex items-center gap-4">
            <div className="size-16 rounded-2xl bg-accent text-accent-foreground flex items-center justify-center font-display text-2xl font-semibold">A</div>
            <div>
              <div className="font-medium">Alex Reed</div>
              <div className="text-sm text-muted-foreground">alex@reed.dev</div>
            </div>
            <Button variant="outline" size="sm" className="rounded-full ml-auto">Change photo</Button>
          </div>
          <div className="grid sm:grid-cols-2 gap-3">
            <div><Label>Full name</Label><Input defaultValue="Alex Reed" className="mt-1.5 rounded-xl" /></div>
            <div><Label>Email</Label><Input defaultValue="alex@reed.dev" className="mt-1.5 rounded-xl" /></div>
          </div>
          <div><Label>Bio</Label><Textarea defaultValue="Senior frontend engineer focused on calm, high-craft consumer products." className="mt-1.5 rounded-xl" /></div>
          <Button className="rounded-full">Save changes</Button>
        </div>
      </Section>

      <Section title="Appearance" className="mt-8">
        <div className="rounded-2xl border border-border/60 bg-card p-5 grid grid-cols-2 gap-3">
          <button onClick={() => setTheme("light")} className={`rounded-xl border-2 p-4 text-left transition-colors ${theme === "light" ? "border-primary" : "border-border"}`}>
            <Sun className="size-5 mb-2" /><div className="font-medium">Light</div><div className="text-xs text-muted-foreground">Warm cream</div>
          </button>
          <button onClick={() => setTheme("dark")} className={`rounded-xl border-2 p-4 text-left transition-colors ${theme === "dark" ? "border-primary" : "border-border"}`}>
            <Moon className="size-5 mb-2" /><div className="font-medium">Dark</div><div className="text-xs text-muted-foreground">Espresso</div>
          </button>
        </div>
      </Section>

      <Section title="Notifications" className="mt-8">
        <div className="rounded-2xl border border-border/60 bg-card divide-y divide-border/60">
          {[
            { l: "Interview reminders", d: "Push 1 hour before scheduled interviews" },
            { l: "Application status changes", d: "Email + push when a status changes" },
            { l: "Weekly job digest", d: "Top matches every Monday morning" },
            { l: "Product updates", d: "Major releases only — never spam" },
          ].map((n) => (
            <div key={n.l} className="p-4 flex items-center gap-3">
              <div className="flex-1">
                <div className="font-medium text-sm">{n.l}</div>
                <div className="text-xs text-muted-foreground">{n.d}</div>
              </div>
              <Switch defaultChecked />
            </div>
          ))}
        </div>
      </Section>

      <Section title="Account" className="mt-8">
        <div className="rounded-2xl border border-border/60 bg-card divide-y divide-border/60">
          <button className="w-full p-4 flex items-center gap-3 text-left hover:bg-muted/40">
            <Download className="size-4 text-muted-foreground" />
            <div className="flex-1">
              <div className="font-medium text-sm">Export your data</div>
              <div className="text-xs text-muted-foreground">Download all resumes, applications, and notes</div>
            </div>
          </button>
          <Link to="/login" className="w-full p-4 flex items-center gap-3 text-left hover:bg-muted/40">
            <LogOut className="size-4 text-muted-foreground" />
            <div className="flex-1">
              <div className="font-medium text-sm">Log out</div>
            </div>
          </Link>
          <button className="w-full p-4 flex items-center gap-3 text-left hover:bg-destructive/5 text-destructive">
            <Trash2 className="size-4" />
            <div className="flex-1">
              <div className="font-medium text-sm">Delete account</div>
              <div className="text-xs text-destructive/70">Permanent — cannot be undone</div>
            </div>
          </button>
        </div>
      </Section>
    </Screen>
  );
}
