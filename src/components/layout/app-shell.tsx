import { Link, useRouterState } from "@tanstack/react-router";
import {
  LayoutDashboard,
  FileText,
  CheckCircle2,
  Sparkles,
  MessagesSquare,
  Briefcase,
  Linkedin,
  Globe,
  Github,
  CreditCard,
  Settings,
  Menu,
  Bell,
  ArrowLeft,
} from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useState } from "react";

export const navItems = [
  { to: "/app/dashboard", label: "Home", icon: LayoutDashboard },
  { to: "/app/resume", label: "Resumes", icon: FileText },
  { to: "/app/ats", label: "ATS Check", icon: CheckCircle2 },
  { to: "/app/review", label: "AI Review", icon: Sparkles },
  { to: "/app/interview", label: "Interview", icon: MessagesSquare },
  { to: "/app/tracker", label: "Tracker", icon: Briefcase },
  { to: "/app/linkedin", label: "LinkedIn", icon: Linkedin },
  { to: "/app/portfolio", label: "Portfolio", icon: Globe },
  { to: "/app/github", label: "GitHub", icon: Github },
  { to: "/app/billing", label: "Billing", icon: CreditCard },
  { to: "/app/settings", label: "Settings", icon: Settings },
] as const;

// Bottom tabs (mobile) — 5 most-used
export const bottomTabs = [
  { to: "/app/dashboard", label: "Home", icon: LayoutDashboard },
  { to: "/app/resume", label: "Resume", icon: FileText },
  { to: "/app/tracker", label: "Tracker", icon: Briefcase },
  { to: "/app/interview", label: "Interview", icon: MessagesSquare },
  { to: "/app/settings", label: "Profile", icon: Settings },
] as const;

function useActive() {
  const path = useRouterState({ select: (s) => s.location.pathname });
  return (to: string) => path === to || path.startsWith(to + "/");
}

export function SideRail() {
  const isActive = useActive();
  return (
    <aside className="hidden lg:flex w-64 shrink-0 flex-col border-r border-border/60 bg-sidebar/70 backdrop-blur">
      <div className="px-6 py-6">
        <Link to="/" className="flex items-center gap-2">
          <div className="size-8 rounded-xl gradient-sage shadow-soft" />
          <span className="font-display text-lg font-semibold tracking-tight">Aria</span>
        </Link>
      </div>
      <nav className="flex-1 px-3 space-y-0.5 overflow-y-auto">
        {navItems.map((item) => {
          const active = isActive(item.to);
          return (
            <Link
              key={item.to}
              to={item.to}
              className={cn(
                "group flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors",
                active
                  ? "bg-primary/10 text-foreground"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <item.icon className={cn("size-4", active && "text-primary")} />
              <span>{item.label}</span>
              {active && (
                <motion.div
                  layoutId="rail-active"
                  className="ml-auto h-5 w-1 rounded-full bg-primary"
                />
              )}
            </Link>
          );
        })}
      </nav>
      <div className="p-3 border-t border-border/60">
        <div className="flex items-center gap-3 p-2 rounded-xl hover:bg-muted">
          <div className="size-9 rounded-full bg-accent text-accent-foreground flex items-center justify-center text-sm font-semibold">A</div>
          <div className="min-w-0">
            <div className="text-sm font-medium truncate">Alex Reed</div>
            <div className="text-xs text-muted-foreground truncate">Pro plan</div>
          </div>
        </div>
      </div>
    </aside>
  );
}

export function BottomTabBar() {
  const isActive = useActive();
  return (
    <nav className="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-background/85 backdrop-blur-xl border-t border-border/60 safe-bottom">
      <div className="grid grid-cols-5 px-2">
        {bottomTabs.map((tab) => {
          const active = isActive(tab.to);
          return (
            <Link
              key={tab.to}
              to={tab.to}
              className="flex flex-col items-center justify-center gap-1 py-2.5 min-h-[56px] relative"
            >
              <tab.icon className={cn("size-[22px] transition-colors", active ? "text-primary" : "text-muted-foreground")} />
              <span className={cn("text-[10px] font-medium tracking-wide", active ? "text-foreground" : "text-muted-foreground")}>{tab.label}</span>
              {active && (
                <motion.div
                  layoutId="tab-active"
                  className="absolute top-0 h-0.5 w-10 rounded-full bg-primary"
                />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

interface AppBarProps {
  title?: string;
  back?: boolean;
  action?: React.ReactNode;
}

export function AppBar({ title, back, action }: AppBarProps) {
  const [open, setOpen] = useState(false);
  return (
    <header className="lg:hidden sticky top-0 z-30 bg-background/85 backdrop-blur-xl border-b border-border/60 safe-top">
      <div className="flex items-center gap-2 px-4 h-14">
        {back ? (
          <button onClick={() => history.back()} className="size-10 -ml-2 flex items-center justify-center rounded-full hover:bg-muted">
            <ArrowLeft className="size-5" />
          </button>
        ) : (
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <button className="size-10 -ml-2 flex items-center justify-center rounded-full hover:bg-muted">
                <Menu className="size-5" />
              </button>
            </SheetTrigger>
            <SheetContent side="left" className="w-72 p-0">
              <SheetHeader className="p-6 border-b">
                <SheetTitle className="font-display text-lg flex items-center gap-2">
                  <div className="size-7 rounded-lg gradient-sage" />
                  Aria
                </SheetTitle>
              </SheetHeader>
              <nav className="p-3 space-y-0.5">
                {navItems.map((item) => (
                  <Link
                    key={item.to}
                    to={item.to}
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground"
                  >
                    <item.icon className="size-4" />
                    {item.label}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        )}
        <div className="flex-1 min-w-0">
          {title && <h1 className="font-display text-lg font-semibold truncate">{title}</h1>}
        </div>
        {action ?? (
          <Button variant="ghost" size="icon" className="rounded-full">
            <Bell className="size-5" />
          </Button>
        )}
      </div>
    </header>
  );
}

interface ScreenProps {
  title?: string;
  subtitle?: string;
  back?: boolean;
  action?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export function Screen({ title, subtitle, back, action, children, className }: ScreenProps) {
  return (
    <>
      <AppBar title={title} back={back} action={action} />
      <div className={cn("px-4 lg:px-10 pt-4 lg:pt-8 pb-24 lg:pb-12 max-w-6xl mx-auto w-full", className)}>
        <div className="hidden lg:flex lg:items-end lg:justify-between mb-8">
          <div>
            {title && <h1 className="font-display text-3xl font-semibold tracking-tight">{title}</h1>}
            {subtitle && <p className="text-muted-foreground mt-1">{subtitle}</p>}
          </div>
          {action}
        </div>
        {subtitle && <p className="lg:hidden text-sm text-muted-foreground mb-4 -mt-1">{subtitle}</p>}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          {children}
        </motion.div>
      </div>
    </>
  );
}

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex bg-background">
      <SideRail />
      <main className="flex-1 min-w-0 flex flex-col">
        {children}
      </main>
      <BottomTabBar />
    </div>
  );
}
