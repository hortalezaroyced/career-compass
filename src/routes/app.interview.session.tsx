import { createFileRoute } from "@tanstack/react-router";
import { Screen } from "@/components/layout/app-shell";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Mic, Square, SkipForward } from "lucide-react";
import { useState, useEffect } from "react";

export const Route = createFileRoute("/app/interview/session")({
  head: () => ({ meta: [{ title: "Practice — Aria" }] }),
  component: Session,
});

function Session() {
  const [seconds, setSeconds] = useState(0);
  const [running, setRunning] = useState(true);
  useEffect(() => {
    if (!running) return;
    const i = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(i);
  }, [running]);
  const mm = String(Math.floor(seconds / 60)).padStart(2, "0");
  const ss = String(seconds % 60).padStart(2, "0");
  return (
    <Screen title="Practice session" back>
      <div className="rounded-3xl gradient-warm p-6 lg:p-10 text-center">
        <div className="text-xs uppercase tracking-wider text-foreground/60 mb-3">Behavioral · Easy</div>
        <p className="font-display text-2xl lg:text-3xl font-semibold leading-snug max-w-2xl mx-auto">
          Tell me about a time you disagreed with a teammate. How did you resolve it?
        </p>
        <div className="mt-6 font-display text-5xl tabular-nums">{mm}:{ss}</div>
      </div>

      <div className="mt-6 rounded-2xl border border-border/60 bg-card p-4">
        <Textarea placeholder="Type or speak your answer…" className="rounded-xl min-h-[180px] border-0 focus-visible:ring-0 shadow-none p-0 resize-none" />
      </div>

      <div className="mt-6 flex items-center justify-center gap-3">
        <Button variant="outline" className="rounded-full" onClick={() => setRunning(false)}>
          <Square className="size-4 mr-1" /> Stop
        </Button>
        <Button className="rounded-full size-16 p-0">
          <Mic className="size-6" />
        </Button>
        <Button variant="outline" className="rounded-full">
          <SkipForward className="size-4 mr-1" /> Next
        </Button>
      </div>
    </Screen>
  );
}
