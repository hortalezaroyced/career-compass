import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface ScoreGaugeProps {
  value: number;
  size?: number;
  label?: string;
  className?: string;
}

export function ScoreGauge({ value, size = 140, label, className }: ScoreGaugeProps) {
  const stroke = 10;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;
  const color = value >= 80 ? "var(--color-success)" : value >= 60 ? "var(--color-warning)" : "var(--color-destructive)";

  return (
    <div className={cn("relative inline-flex items-center justify-center", className)} style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={radius} stroke="var(--color-muted)" strokeWidth={stroke} fill="none" />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth={stroke}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div className="font-display text-3xl font-semibold tabular-nums">{value}</div>
        {label && <div className="text-xs text-muted-foreground mt-0.5">{label}</div>}
      </div>
    </div>
  );
}

interface StatTileProps {
  label: string;
  value: string | number;
  delta?: string;
  icon?: React.ComponentType<{ className?: string }>;
  tone?: "default" | "success" | "warning" | "highlight";
}

export function StatTile({ label, value, delta, icon: Icon, tone = "default" }: StatTileProps) {
  const toneClass = {
    default: "bg-card",
    success: "bg-primary/5",
    warning: "bg-accent/30",
    highlight: "bg-highlight/10",
  }[tone];
  return (
    <div className={cn("rounded-2xl border border-border/60 p-4 lg:p-5", toneClass)}>
      <div className="flex items-center gap-2 text-xs text-muted-foreground">
        {Icon && <Icon className="size-3.5" />}
        <span className="uppercase tracking-wide font-medium">{label}</span>
      </div>
      <div className="mt-2 flex items-baseline gap-2">
        <div className="font-display text-2xl lg:text-3xl font-semibold tabular-nums">{value}</div>
        {delta && <div className="text-xs text-success font-medium">{delta}</div>}
      </div>
    </div>
  );
}

interface SegmentedControlProps<T extends string> {
  options: { value: T; label: string }[];
  value: T;
  onChange: (v: T) => void;
  className?: string;
}

export function SegmentedControl<T extends string>({ options, value, onChange, className }: SegmentedControlProps<T>) {
  return (
    <div className={cn("inline-flex p-1 rounded-full bg-muted text-sm", className)}>
      {options.map((opt) => (
        <button
          key={opt.value}
          onClick={() => onChange(opt.value)}
          className={cn(
            "relative px-4 py-1.5 rounded-full font-medium transition-colors",
            value === opt.value ? "text-foreground" : "text-muted-foreground hover:text-foreground"
          )}
        >
          {value === opt.value && (
            <motion.div
              layoutId="seg-active"
              className="absolute inset-0 rounded-full bg-background shadow-soft"
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
            />
          )}
          <span className="relative">{opt.label}</span>
        </button>
      ))}
    </div>
  );
}

export function EmptyState({ icon: Icon, title, description, action }: {
  icon?: React.ComponentType<{ className?: string }>;
  title: string;
  description?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-dashed border-border p-10 text-center">
      {Icon && (
        <div className="mx-auto size-12 rounded-2xl bg-muted flex items-center justify-center mb-4">
          <Icon className="size-5 text-muted-foreground" />
        </div>
      )}
      <h3 className="font-display text-lg font-semibold">{title}</h3>
      {description && <p className="text-sm text-muted-foreground mt-1 max-w-sm mx-auto">{description}</p>}
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}

export function Section({ title, action, children, className }: {
  title?: string;
  action?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={cn("space-y-3", className)}>
      {(title || action) && (
        <div className="flex items-center justify-between">
          {title && <h2 className="font-display text-lg lg:text-xl font-semibold">{title}</h2>}
          {action}
        </div>
      )}
      {children}
    </section>
  );
}

export function Chip({ children, tone = "default" }: { children: React.ReactNode; tone?: "default" | "success" | "warning" | "destructive" | "primary" }) {
  const t = {
    default: "bg-muted text-muted-foreground",
    success: "bg-primary/10 text-primary",
    primary: "bg-primary/10 text-primary",
    warning: "bg-accent/40 text-accent-foreground",
    destructive: "bg-destructive/10 text-destructive",
  }[tone];
  return <span className={cn("inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium", t)}>{children}</span>;
}
