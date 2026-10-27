import { formatGBP, member } from "@/lib/member-data";

export default function WelcomeBar() {
  return (
    <section className="flex flex-col gap-4 rounded-2xl bg-ink p-5 text-white sm:flex-row sm:items-center sm:justify-between lg:px-6 lg:[@media(max-height:800px)]:py-4">
      <div>
        <h1 className="text-2xl font-bold">
          Hi, {member.firstName} {member.lastName}
        </h1>
        <span className="mt-1.5 inline-flex items-center gap-1.5 rounded-full bg-white/10 px-2 py-0.5 text-xs font-medium text-white/80">
          <span className="size-1.5 rounded-full bg-emerald-400" />
          {member.status} member since {member.memberSince}
        </span>
      </div>

      <div className="sm:text-right">
        <p className="font-heading text-2xl font-bold">{member.plan}</p>
        <p className="mt-0.5 text-sm text-white/60">{formatGBP(member.monthlyFee)} / month</p>
      </div>
    </section>
  );
}
