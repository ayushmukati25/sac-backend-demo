import type { LucideIcon } from "lucide-react";

type CardProps = {
  title: string;
  icon: LucideIcon;
  action?: React.ReactNode;
  className?: string;
  bodyClassName?: string;
  children: React.ReactNode;
};

export default function Card({ title, icon: Icon, action, className = "", bodyClassName = "", children }: CardProps) {
  return (
    <section className={`flex min-h-0 flex-col rounded-2xl border border-neutral-200 bg-white p-4 ${className}`}>
      <div className="flex items-center justify-between gap-3">
        <h2 className="flex items-center gap-2 text-sm font-bold text-ink">
          <span className="flex size-7 items-center justify-center rounded-lg bg-neutral-100 text-ink">
            <Icon className="size-4" />
          </span>
          {title}
        </h2>
        {action}
      </div>
      <div className={`mt-3 min-h-0 flex-1 ${bodyClassName}`}>{children}</div>
    </section>
  );
}
