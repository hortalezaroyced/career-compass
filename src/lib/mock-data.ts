export type ApplicationStatus = "saved" | "applied" | "interview" | "offer" | "rejected";

export interface Application {
  id: string;
  company: string;
  role: string;
  location: string;
  salary?: string;
  status: ApplicationStatus;
  appliedDate: string;
  logo?: string;
  notes?: string;
}

export const applications: Application[] = [
  { id: "1", company: "Stripe", role: "Senior Frontend Engineer", location: "Remote", salary: "$180k–220k", status: "interview", appliedDate: "2025-04-28" },
  { id: "2", company: "Linear", role: "Product Engineer", location: "San Francisco", salary: "$170k–210k", status: "applied", appliedDate: "2025-05-02" },
  { id: "3", company: "Vercel", role: "DX Engineer", location: "Remote", salary: "$160k–200k", status: "applied", appliedDate: "2025-05-04" },
  { id: "4", company: "Figma", role: "Senior Designer Engineer", location: "New York", salary: "$190k–230k", status: "saved", appliedDate: "2025-05-06" },
  { id: "5", company: "Notion", role: "Frontend Engineer", location: "Remote", salary: "$150k–190k", status: "offer", appliedDate: "2025-04-12" },
  { id: "6", company: "Anthropic", role: "Full-stack Engineer", location: "Remote", salary: "$200k–250k", status: "interview", appliedDate: "2025-04-25" },
  { id: "7", company: "Retool", role: "Frontend Engineer", location: "Remote", salary: "$160k–195k", status: "rejected", appliedDate: "2025-04-08" },
  { id: "8", company: "Raycast", role: "Senior Engineer", location: "Berlin", salary: "€110k–140k", status: "saved", appliedDate: "2025-05-08" },
];

export interface Resume {
  id: string;
  title: string;
  updated: string;
  template: string;
  score: number;
}

export const resumes: Resume[] = [
  { id: "r1", title: "Frontend Engineer · 2025", updated: "2 days ago", template: "Modern", score: 87 },
  { id: "r2", title: "Product Engineer", updated: "1 week ago", template: "Minimal", score: 74 },
  { id: "r3", title: "Senior FE · Remote", updated: "3 weeks ago", template: "Editorial", score: 91 },
];

export interface InterviewQuestion {
  id: string;
  question: string;
  category: "behavioral" | "technical" | "system-design" | "culture";
  difficulty: "easy" | "medium" | "hard";
}

export const interviewQuestions: InterviewQuestion[] = [
  { id: "q1", question: "Tell me about a time you disagreed with a teammate. How did you resolve it?", category: "behavioral", difficulty: "easy" },
  { id: "q2", question: "Design a URL shortener that scales to 100M URLs per day.", category: "system-design", difficulty: "hard" },
  { id: "q3", question: "How would you optimize a React app with poor render performance?", category: "technical", difficulty: "medium" },
  { id: "q4", question: "Why do you want to work here, and what would your first 90 days look like?", category: "culture", difficulty: "easy" },
  { id: "q5", question: "Walk me through how you'd debug a memory leak in a production Node service.", category: "technical", difficulty: "hard" },
  { id: "q6", question: "Tell me about a project where you owned the outcome end-to-end.", category: "behavioral", difficulty: "medium" },
];

export interface ATSResult {
  score: number;
  matched: string[];
  missing: string[];
  suggestions: { title: string; detail: string; severity: "high" | "medium" | "low" }[];
}

export const atsResult: ATSResult = {
  score: 78,
  matched: ["React", "TypeScript", "Next.js", "REST APIs", "CI/CD", "Agile"],
  missing: ["GraphQL", "AWS", "Kubernetes", "Terraform"],
  suggestions: [
    { title: "Add measurable impact to top role", detail: "Quantify the 30% performance improvement with specific metrics (LCP, TTI).", severity: "high" },
    { title: "Mention GraphQL experience", detail: "JD mentions GraphQL 3 times. Add to skills if you have any exposure.", severity: "high" },
    { title: "Shorten summary section", detail: "Trim from 5 lines to 3 for better ATS parsing.", severity: "medium" },
    { title: "Use standard section headers", detail: "Rename 'My Story' to 'Summary' for ATS compatibility.", severity: "low" },
  ],
};

export interface ReviewIssue {
  id: string;
  severity: "critical" | "warning" | "suggestion";
  section: string;
  issue: string;
  suggestion: string;
}

export const reviewIssues: ReviewIssue[] = [
  { id: "i1", severity: "critical", section: "Summary", issue: "Generic opening lacks specificity", suggestion: "Senior frontend engineer with 7 years building consumer products at scale, specializing in React performance and design systems." },
  { id: "i2", severity: "warning", section: "Experience · Stripe", issue: "No measurable outcomes in 2 of 4 bullets", suggestion: "Led migration to React 19, reducing bundle size 34% and improving LCP from 2.8s to 1.4s across 12M MAU." },
  { id: "i3", severity: "suggestion", section: "Skills", issue: "Skills list is alphabetical instead of priority-ordered", suggestion: "Lead with the 5 skills most relevant to your target roles." },
  { id: "i4", severity: "warning", section: "Education", issue: "Includes graduation year from 2008", suggestion: "Remove graduation year if 10+ years out to avoid age bias." },
];

export const invoices = [
  { id: "INV-2025-005", date: "May 1, 2025", amount: "$29.00", status: "paid" },
  { id: "INV-2025-004", date: "Apr 1, 2025", amount: "$29.00", status: "paid" },
  { id: "INV-2025-003", date: "Mar 1, 2025", amount: "$29.00", status: "paid" },
];

export const statusLabels: Record<ApplicationStatus, string> = {
  saved: "Saved",
  applied: "Applied",
  interview: "Interview",
  offer: "Offer",
  rejected: "Rejected",
};

export const statusOrder: ApplicationStatus[] = ["saved", "applied", "interview", "offer", "rejected"];
