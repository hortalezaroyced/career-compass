import { createFileRoute } from "@tanstack/react-router";
import { Screen } from "@/components/layout/app-shell";
import { Section } from "@/components/ui-ext/primitives";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ChevronDown, ChevronRight, Plus, Eye, Download, GripVertical, Sparkles } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet";

export const Route = createFileRoute("/app/resume/builder")({
  head: () => ({ meta: [{ title: "Resume Builder — Aria" }] }),
  component: Builder,
});

const sections = [
  { id: "basics", label: "Basics" },
  { id: "summary", label: "Summary" },
  { id: "experience", label: "Experience" },
  { id: "education", label: "Education" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
];

function ResumePreview() {
  return (
    <div className="bg-background rounded-2xl shadow-soft border border-border/60 p-8 lg:p-10 aspect-[3/4] overflow-hidden text-foreground">
      <div className="border-b border-border pb-4 mb-4">
        <h2 className="font-display text-2xl font-semibold">Alex Reed</h2>
        <p className="text-sm text-muted-foreground">Senior Frontend Engineer · alex@reed.dev · linkedin.com/in/alexreed</p>
      </div>
      <div className="space-y-4 text-sm">
        <div>
          <h3 className="font-display font-semibold text-xs uppercase tracking-wider text-muted-foreground">Summary</h3>
          <p className="mt-1 leading-relaxed">7 years building consumer products at scale. Specialty in React performance, design systems, and developer experience.</p>
        </div>
        <div>
          <h3 className="font-display font-semibold text-xs uppercase tracking-wider text-muted-foreground">Experience</h3>
          <div className="mt-1">
            <div className="flex justify-between">
              <span className="font-medium">Stripe — Senior Frontend Engineer</span>
              <span className="text-xs text-muted-foreground">2022 — Present</span>
            </div>
            <ul className="mt-1 list-disc pl-5 text-xs space-y-0.5 text-muted-foreground">
              <li>Led React 19 migration, reducing bundle 34%</li>
              <li>Shipped redesigned checkout, +12% conversion</li>
              <li>Mentored 4 engineers across 2 teams</li>
            </ul>
          </div>
        </div>
        <div>
          <h3 className="font-display font-semibold text-xs uppercase tracking-wider text-muted-foreground">Skills</h3>
          <p className="mt-1 text-xs">React · TypeScript · Next.js · Design Systems · Performance · CI/CD</p>
        </div>
      </div>
    </div>
  );
}

function SectionEditor({ id, label }: { id: string; label: string }) {
  const [open, setOpen] = useState(id === "basics");
  return (
    <div className="rounded-2xl border border-border/60 bg-card overflow-hidden">
      <button onClick={() => setOpen(!open)} className="w-full flex items-center gap-2 p-4 text-left hover:bg-muted/40">
        <GripVertical className="size-4 text-muted-foreground hidden lg:block" />
        <span className="font-medium flex-1">{label}</span>
        {open ? <ChevronDown className="size-4 text-muted-foreground" /> : <ChevronRight className="size-4 text-muted-foreground" />}
      </button>
      {open && (
        <div className="p-4 pt-0 space-y-3 border-t border-border/60">
          {id === "basics" && (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div><Label>Full name</Label><Input defaultValue="Alex Reed" className="mt-1.5 rounded-xl" /></div>
                <div><Label>Title</Label><Input defaultValue="Senior Frontend Engineer" className="mt-1.5 rounded-xl" /></div>
                <div><Label>Email</Label><Input defaultValue="alex@reed.dev" className="mt-1.5 rounded-xl" /></div>
                <div><Label>Location</Label><Input defaultValue="Remote · USA" className="mt-1.5 rounded-xl" /></div>
              </div>
            </>
          )}
          {id === "summary" && (
            <Textarea defaultValue="7 years building consumer products at scale. Specialty in React performance, design systems, and developer experience." className="rounded-xl min-h-[100px]" />
          )}
          {id !== "basics" && id !== "summary" && (
            <>
              <Button variant="outline" className="rounded-full w-full"><Plus className="size-4 mr-1" /> Add {label.toLowerCase()}</Button>
              <Button variant="ghost" size="sm" className="w-full text-primary"><Sparkles className="size-3.5 mr-1" /> Generate with AI</Button>
            </>
          )}
        </div>
      )}
    </div>
  );
}

function Builder() {
  return (
    <Screen
      title="Resume Builder"
      action={<div className="flex gap-2"><Button variant="outline" className="rounded-full"><Eye className="size-4 mr-1" /> Preview</Button><Button className="rounded-full"><Download className="size-4 mr-1" /> Export PDF</Button></div>}
    >
      {/* Mobile preview button */}
      <div className="lg:hidden flex gap-2 mb-4">
        <Sheet>
          <SheetTrigger asChild><Button variant="outline" className="flex-1 rounded-full"><Eye className="size-4 mr-1" /> Preview</Button></SheetTrigger>
          <SheetContent side="bottom" className="h-[90vh]">
            <SheetHeader><SheetTitle>Preview</SheetTitle></SheetHeader>
            <div className="mt-4 overflow-y-auto"><ResumePreview /></div>
          </SheetContent>
        </Sheet>
        <Button className="flex-1 rounded-full"><Download className="size-4 mr-1" /> Export</Button>
      </div>

      <div className="grid lg:grid-cols-[1fr_1.2fr] gap-6">
        <div className="space-y-3">
          <Section title="Sections">
            <div className="space-y-2">
              {sections.map((s) => <SectionEditor key={s.id} {...s} />)}
              <Button variant="outline" className="w-full rounded-full"><Plus className="size-4 mr-1" /> Add section</Button>
            </div>
          </Section>
        </div>
        <div className="hidden lg:block sticky top-8 self-start">
          <ResumePreview />
        </div>
      </div>
    </Screen>
  );
}
