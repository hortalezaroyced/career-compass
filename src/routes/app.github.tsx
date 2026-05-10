import { createFileRoute } from "@tanstack/react-router";
import { AnalyzerScreen } from "@/components/ui-ext/analyzer-screen";
import { Github } from "lucide-react";

export const Route = createFileRoute("/app/github")({
  head: () => ({ meta: [{ title: "GitHub Analyzer — Aria" }] }),
  component: () => (
    <AnalyzerScreen
      title="GitHub Analyzer"
      subtitle="Surface your strongest projects and polish your README presence."
      inputLabel="GitHub username"
      placeholder="your-handle"
      defaultValue="alexreed"
      icon={Github}
      scores={[
        { label: "Activity", value: 88 },
        { label: "READMEs", value: 62 },
        { label: "Variety", value: 75 },
        { label: "Profile", value: 70 },
      ]}
      insights={[
        { title: "Strong 12-month contribution streak", detail: "412 contributions — recruiters will notice.", positive: true },
        { title: "3 pinned repos lack READMEs", detail: "Add a hero, demo, and install instructions." },
        { title: "No profile README", detail: "Add a short bio with current focus and how to reach you." },
      ]}
      recommendations={[
        "Pin your 6 strongest repos (have 3, missing 3)",
        "Add gif demos to your top 2 projects",
        "Create a profile README with your tagline",
      ]}
    />
  ),
});
