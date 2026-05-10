import { createFileRoute, Link } from "@tanstack/react-router";
import { Screen } from "@/components/layout/app-shell";
import { Section, Chip } from "@/components/ui-ext/primitives";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { interviewQuestions } from "@/lib/mock-data";
import { Play, Sparkles } from "lucide-react";

export const Route = createFileRoute("/app/interview")({
  head: () => ({ meta: [{ title: "Interview Prep — Aria" }] }),
  component: Interview,
});

function Interview() {
  return (
    <Screen title="Interview Prep" subtitle="Generate tailored questions and practice with timed sessions.">
      <div className="rounded-2xl border border-border/60 bg-card p-5 lg:p-6">
        <div className="grid lg:grid-cols-3 gap-3">
          <div>
            <Label>Role</Label>
            <Input defaultValue="Senior Frontend Engineer" className="mt-1.5 rounded-xl" />
          </div>
          <div>
            <Label>Level</Label>
            <Select defaultValue="senior">
              <SelectTrigger className="mt-1.5 rounded-xl"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="junior">Junior</SelectItem>
                <SelectItem value="mid">Mid</SelectItem>
                <SelectItem value="senior">Senior</SelectItem>
                <SelectItem value="staff">Staff+</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Type</Label>
            <Select defaultValue="mixed">
              <SelectTrigger className="mt-1.5 rounded-xl"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="behavioral">Behavioral</SelectItem>
                <SelectItem value="technical">Technical</SelectItem>
                <SelectItem value="system">System design</SelectItem>
                <SelectItem value="mixed">Mixed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <Button className="rounded-full mt-4"><Sparkles className="size-4 mr-1" /> Generate questions</Button>
      </div>

      <Section title="Generated questions" className="mt-8">
        <div className="space-y-2">
          {interviewQuestions.map((q) => (
            <div key={q.id} className="rounded-2xl border border-border/60 bg-card p-4 flex items-start gap-3">
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap gap-1.5 mb-2">
                  <Chip tone="primary">{q.category}</Chip>
                  <Chip>{q.difficulty}</Chip>
                </div>
                <p className="text-sm">{q.question}</p>
              </div>
              <Button asChild size="sm" variant="outline" className="rounded-full shrink-0">
                <Link to="/app/interview/session"><Play className="size-3.5 mr-1" /> Practice</Link>
              </Button>
            </div>
          ))}
        </div>
      </Section>
    </Screen>
  );
}
