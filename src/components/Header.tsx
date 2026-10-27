import Link from "next/link";
import { Smile } from "lucide-react";
import { member } from "@/lib/member-data";
import { SupportButton } from "@/components/dashboard/Support";

export default function Header() {
  const initials = `${member.firstName[0]}${member.lastName[0]}`;

  return (
    <header className="sticky top-0 z-30 h-16 border-b border-neutral-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex h-full w-full max-w-[1440px] items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2 text-ink">
          <span className="flex size-9 items-center justify-center rounded-xl bg-ink text-white">
            <Smile className="size-5" />
          </span>
          <span className="font-heading text-base font-bold leading-tight tracking-tight">Smile Access Club</span>
        </Link>
        <div className="flex items-center gap-3">
          <SupportButton />
          <div className="hidden border-l border-neutral-200 pl-3 text-right sm:block">
            <p className="text-sm font-semibold text-ink">
              {member.firstName} {member.lastName}
            </p>
            <p className="text-xs text-neutral-500">{member.id}</p>
          </div>
          <span className="flex size-9 items-center justify-center rounded-full bg-neutral-100 text-sm font-bold text-ink ring-1 ring-neutral-300">
            {initials}
          </span>
        </div>
      </div>
    </header>
  );
}
