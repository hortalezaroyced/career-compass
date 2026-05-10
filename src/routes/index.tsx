import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  ArrowRight,
  FileText,
  CheckCircle2,
  Sparkles,
  MessagesSquare,
  Briefcase,
  Linkedin,
  Globe,
  Github,
  Star,
  Zap,
  Shield,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Aria — AI copilot for your career" },
      { name: "description", content: "Build resumes, beat ATS, ace interviews, and track every application — all in one calm, AI-native workspace." },
      { property: "og:title", content: "Aria — AI copilot for your career" },
      { property: "og:description", content: "Build resumes, beat ATS, ace interviews, and track every application." },
    ],
  }),
  component: Landing,
});

const features = [
  { icon: FileText, title: "Resume Builder", desc: "Beautiful templates with live preview and section-by-section editing." },
  { icon: CheckCircle2, title: "ATS Checker", desc: "Score your resume against any job description in seconds." },
  { icon: Sparkles, title: "AI Resume Review", desc: "Line-by-line feedback with suggested rewrites you can accept inline." },
  { icon: MessagesSquare, title: "Interview Prep", desc: "Generate role-specific questions and practice with timed sessions." },
  { icon: Briefcase, title: "Application Tracker", desc: "A calm kanban on web, a focused list on mobile. Never lose a thread." },
  { icon: Linkedin, title: "LinkedIn Optimizer", desc: "Headline, about, and experience rewrites tuned to your goals." },
  { icon: Globe, title: "Portfolio Analyzer", desc: "Get design, content, and performance feedback on your site." },
  { icon: Github, title: "GitHub Analyzer", desc: "Surface your strongest projects and polish your README presence." },
];

function Landing() {
  return (
    <div className="min-h-screen bg-background">
      {/* Nav */}
      <header className="sticky top-0 z-40 backdrop-blur-xl bg-background/70 border-b border-border/40">
        <div className="max-w-6xl mx-auto px-4 lg:px-8 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="size-8 rounded-xl gradient-sage shadow-soft" />
            <span className="font-display text-lg font-semibold">Aria</span>
          </Link>
          <nav className="hidden md:flex items-center gap-8 text-sm">
            <a href="#features" className="text-muted-foreground hover:text-foreground">Features</a>
            <Link to="/pricing" className="text-muted-foreground hover:text-foreground">Pricing</Link>
            <a href="#faq" className="text-muted-foreground hover:text-foreground">FAQ</a>
          </nav>
          <div className="flex items-center gap-2">
            <Link to="/login" className="text-sm text-muted-foreground hover:text-foreground px-3 py-2">Log in</Link>
            <Button asChild className="rounded-full">
              <Link to="/signup">Get started</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 gradient-hero opacity-90" />
        <div className="relative max-w-6xl mx-auto px-4 lg:px-8 pt-16 lg:pt-28 pb-20 lg:pb-32 text-center">
          <motion.div
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/60 px-3 py-1 text-xs font-medium text-muted-foreground"
          >
            <Sparkles className="size-3 text-primary" />
            Now with AI interview practice
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.05 }}
            className="mt-6 font-display text-4xl sm:text-5xl lg:text-7xl font-semibold tracking-tight max-w-4xl mx-auto leading-[1.05]"
          >
            The calm, AI-native way to <span className="italic text-primary">land your next role</span>.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.15 }}
            className="mt-6 text-base lg:text-lg text-muted-foreground max-w-xl mx-auto"
          >
            Build resumes, beat ATS, prep interviews, and track applications — in one workspace designed for focus, not friction.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.25 }}
            className="mt-8 flex items-center justify-center gap-3 flex-wrap"
          >
            <Button asChild size="lg" className="rounded-full px-6 h-12 text-base">
              <Link to="/signup">Start free <ArrowRight className="size-4 ml-1" /></Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="rounded-full px-6 h-12 text-base bg-background/60">
              <Link to="/app/dashboard">View demo</Link>
            </Button>
          </motion.div>
          <div className="mt-10 flex items-center justify-center gap-6 text-xs text-muted-foreground">
            <div className="flex items-center gap-1"><Star className="size-3.5 fill-current text-highlight" /> 4.9 from 12,000+ users</div>
            <div className="hidden sm:flex items-center gap-1"><Shield className="size-3.5 text-primary" /> Privacy-first</div>
            <div className="hidden sm:flex items-center gap-1"><Zap className="size-3.5 text-primary" /> Free forever plan</div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 lg:py-28">
        <div className="max-w-6xl mx-auto px-4 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="font-display text-3xl lg:text-5xl font-semibold tracking-tight">Eight tools, one calm workspace.</h2>
            <p className="mt-3 text-muted-foreground">Each tool does one thing well — and they all share your context.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.4, delay: i * 0.04 }}
                className="rounded-3xl border border-border/60 bg-card p-6 hover:shadow-soft transition-shadow"
              >
                <div className="size-10 rounded-2xl bg-primary/10 flex items-center justify-center mb-4">
                  <f.icon className="size-5 text-primary" />
                </div>
                <h3 className="font-display text-lg font-semibold">{f.title}</h3>
                <p className="text-sm text-muted-foreground mt-1.5">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 lg:py-28 bg-surface">
        <div className="max-w-5xl mx-auto px-4 lg:px-8">
          <h2 className="text-center font-display text-3xl lg:text-5xl font-semibold tracking-tight">From draft to offer in three moves.</h2>
          <div className="mt-12 grid md:grid-cols-3 gap-6">
            {[
              { n: "01", t: "Build", d: "Pick a template, drop in your story, get an AI-polished resume in minutes." },
              { n: "02", t: "Optimize", d: "Score against the JD, fix gaps, and rewrite weak lines with one tap." },
              { n: "03", t: "Apply & track", d: "Save listings, log applications, and prep for interviews — all in flow." },
            ].map((s) => (
              <div key={s.n} className="rounded-3xl bg-background border border-border/60 p-6">
                <div className="font-display text-5xl text-primary/30">{s.n}</div>
                <h3 className="mt-2 font-display text-xl font-semibold">{s.t}</h3>
                <p className="text-sm text-muted-foreground mt-1">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 lg:py-28">
        <div className="max-w-4xl mx-auto px-4 lg:px-8">
          <div className="rounded-[2rem] gradient-warm p-10 lg:p-16 text-center relative overflow-hidden">
            <h2 className="font-display text-3xl lg:text-5xl font-semibold tracking-tight">Your career, with a calmer copilot.</h2>
            <p className="mt-3 text-foreground/80 max-w-md mx-auto">Start with the free plan. Upgrade when you're ready.</p>
            <Button asChild size="lg" className="mt-6 rounded-full px-6 h-12">
              <Link to="/signup">Create your account <ArrowRight className="size-4 ml-1" /></Link>
            </Button>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-20 max-w-3xl mx-auto px-4 lg:px-8">
        <h2 className="font-display text-3xl font-semibold tracking-tight text-center">Questions, answered.</h2>
        <div className="mt-8 divide-y divide-border/60">
          {[
            { q: "Is there a free plan?", a: "Yes. You can build resumes, run ATS checks, and track applications for free, forever." },
            { q: "Do you support Filipino payment methods?", a: "Yes — we support GCash, Maya, and PayMongo alongside Stripe and PayPal." },
            { q: "Will there be mobile apps?", a: "iOS and Android apps are launching soon. The web app is built mobile-first today." },
            { q: "Is my data private?", a: "Your resumes and notes are encrypted. We never train models on your private data." },
          ].map((f) => (
            <details key={f.q} className="group py-5">
              <summary className="flex justify-between items-center cursor-pointer list-none">
                <span className="font-medium">{f.q}</span>
                <span className="text-muted-foreground group-open:rotate-45 transition-transform text-2xl leading-none">+</span>
              </summary>
              <p className="mt-2 text-sm text-muted-foreground">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      <footer className="border-t border-border/60 py-10">
        <div className="max-w-6xl mx-auto px-4 lg:px-8 flex flex-col md:flex-row gap-4 justify-between items-center text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <div className="size-6 rounded-lg gradient-sage" />
            <span className="font-display font-semibold text-foreground">Aria</span>
            <span>© 2025</span>
          </div>
          <div className="flex gap-6">
            <Link to="/pricing">Pricing</Link>
            <Link to="/login">Log in</Link>
            <a href="#">Privacy</a>
            <a href="#">Terms</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
