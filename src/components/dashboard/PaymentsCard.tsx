import { Receipt } from "lucide-react";
import { formatGBP, payments, type PaymentStatus } from "@/lib/member-data";
import Card from "./Card";

const statusStyles: Record<PaymentStatus, string> = {
  Paid: "bg-neutral-100 text-neutral-600",
  Refunded: "bg-neutral-100 text-neutral-500",
  Cashback: "bg-emerald-50 text-emerald-700",
};

const totalPaid = payments.filter((p) => p.amount > 0).reduce((sum, p) => sum + p.amount, 0);
const totalCashback = payments.filter((p) => p.amount < 0).reduce((sum, p) => sum - p.amount, 0);
// What the same treatments would have cost at average private fees, with no membership.
const withoutSac = payments.reduce((sum, p) => sum + (p.privateFee ?? 0), 0);

export default function PaymentsCard({ className }: { className?: string }) {
  return (
    <Card title="Payment history" icon={Receipt} className={className} bodyClassName="flex flex-col">
      <div className="grid grid-cols-3 gap-2">
        <Summary label="Total paid" value={formatGBP(totalPaid)} />
        <Summary label="Cashback" value={formatGBP(totalCashback)} accent="text-emerald-600" />
        <Summary
          label={
            <>
              {/* The full name doesn't fit the narrow phone-width box. */}
              <span className="sm:hidden">Without SAC</span>
              <span className="hidden sm:inline">Without smileaccessclub</span>
            </>
          }
          value={formatGBP(withoutSac)}
          accent="text-orange-600"
        />
      </div>

      {/* Absolutely positioned on desktop so the list never stretches its grid row; it scrolls instead. */}
      <div className="relative mt-3 min-h-0 flex-1">
        <ul className="scrollbar-ink divide-y divide-neutral-100 overflow-y-auto pr-2 lg:absolute lg:inset-0">
          {payments.map((p) => (
            <li key={p.id} className="flex items-center justify-between gap-3 py-2">
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-ink">{p.description}</p>
                <p className="text-xs text-neutral-500">
                  {p.date} · {p.method}
                </p>
              </div>
              <div className="shrink-0 text-right">
                <p className={`text-sm font-semibold tabular-nums ${p.amount < 0 ? "text-emerald-600" : "text-ink"}`}>
                  {p.amount < 0 ? `+${formatGBP(-p.amount)}` : formatGBP(p.amount)}
                </p>
                <span className={`inline-block rounded-full px-2 py-0.5 text-[11px] font-semibold ${statusStyles[p.status]}`}>
                  {p.status}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </Card>
  );
}

function Summary({ label, value, accent = "text-ink" }: { label: React.ReactNode; value: string; accent?: string }) {
  return (
    <div className="min-w-0 rounded-xl bg-neutral-50 px-2.5 py-2 sm:px-3">
      <p className="truncate text-[10px] font-medium uppercase tracking-wide text-neutral-500 sm:text-[11px] sm:tracking-wider">{label}</p>
      <p className={`text-base font-bold tabular-nums ${accent}`}>{value}</p>
    </div>
  );
}
