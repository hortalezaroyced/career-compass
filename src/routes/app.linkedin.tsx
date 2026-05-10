import { createFileRoute } from "@tanstack/react-router";
import { AnalyzerScreen } from "@/components/ui-ext/analyzer-screen";
import { Linkedin } from "lucide-react";

export const Route = createFileRoute("/app/linkedin")({
  head: () => ({ meta: [{ title: "LinkedIn Optimizer — Aria" }] }),
  component: () => (
    <AnalyzerScreen
      title="LinkedIn Optimizer"
      subtitle="Headline, About, and Experience feedback tuned to your goals."
      inputLabel="LinkedIn profile URL"
      placeholder="linkedin.com/in/your-name"
      defaultValue="linkedin.com/in/alexreed"
      icon={Linkedin}
      scores={[
        { label: "Headline", value: 72 },
        { label: "About", value: 64 },
        { label: "Experience", value: 81 },
        { label: "Keywords", value: 70 },
      ]}
      insights={[
        { title: "Headline buries your specialty", detail: "Lead with the problem you solve, not just your title." },
        { title: "Strong recent role bullets", detail: "Quantified impact across 3 of 4 bullets — keep this pattern.", positive: true },
        { title: "About section is a wall of text", detail: "Break into 3 short paragraphs with one CTA at the end." },
      ]}
      recommendations={[
        "Rewrite headline: 'Senior FE Engineer · React performance, design systems · Open to remote'",
        "Add a 1-line tagline at the top of About",
        "Surface 2 highlight projects under Featured",
      ]}
    />
  ),
});
