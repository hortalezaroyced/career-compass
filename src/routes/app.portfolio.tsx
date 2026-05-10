import { createFileRoute } from "@tanstack/react-router";
import { AnalyzerScreen } from "@/components/ui-ext/analyzer-screen";
import { Globe } from "lucide-react";

export const Route = createFileRoute("/app/portfolio")({
  head: () => ({ meta: [{ title: "Portfolio Analyzer — Aria" }] }),
  component: () => (
    <AnalyzerScreen
      title="Portfolio Analyzer"
      subtitle="Design, content, and performance feedback for your site."
      inputLabel="Portfolio URL"
      placeholder="https://your-site.com"
      defaultValue="alexreed.dev"
      icon={Globe}
      scores={[
        { label: "Design", value: 84 },
        { label: "Content", value: 71 },
        { label: "Performance", value: 92 },
        { label: "SEO", value: 68 },
      ]}
      insights={[
        { title: "Excellent Lighthouse score", detail: "LCP 1.2s, CLS 0.02 — top 5% of portfolios.", positive: true },
        { title: "Project descriptions are too short", detail: "Each project should explain problem, solution, and outcome." },
        { title: "Missing meta description", detail: "Add a 150-char meta description for the homepage." },
      ]}
      recommendations={[
        "Expand each project with 3 short paragraphs",
        "Add a clear CTA in the hero",
        "Set canonical tags and OG image for top pages",
      ]}
    />
  ),
});
