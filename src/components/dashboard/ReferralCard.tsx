"use client";

import { useState } from "react";
import { Check, Copy, Gift, Share2 } from "lucide-react";
import { formatGBP, referral } from "@/lib/member-data";
import Card from "./Card";

export default function ReferralCard({ className }: { className?: string }) {
  const [copied, setCopied] = useState<"code" | "link" | null>(null);

  const copy = async (value: string, kind: "code" | "link") => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(kind);
      setTimeout(() => setCopied(null), 1800);
    } catch {
      // Clipboard can be blocked (e.g. insecure context); nothing else to do in the prototype.
    }
  };

  const share = async () => {
    const text = `Join me at Smile Access Club for private dental care at NHS-level prices. Use my code ${referral.code}.`;
    if (navigator.share) {
      try {
        await navigator.share({ title: "Smile Access Club", text, url: referral.link });
        return;
      } catch {
        // Share sheet dismissed: fall back to copying the link.
      }
    }
    copy(referral.link, "link");
  };

  return (
    <Card
      title="Refer a friend"
      icon={Gift}
      className={className}
      bodyClassName="@container"
    >
      {/* Stacks in a narrow column; side by side once the card is wide enough. */}
      <div className="grid gap-3 @md:grid-cols-2 @md:items-center @md:gap-6">
        <div>
          <p className="font-heading text-2xl font-bold text-ink">Cashback</p>
          <p className="text-xs text-neutral-500">
            {formatGBP(referral.rewardPerReferral).replace(".00", "")} for every friend who joins with your code
          </p>
          <p className="mt-2 text-sm text-neutral-600">
            <span className="font-bold text-ink">{referral.joined}</span> joined ·{" "}
            <span className="font-bold text-emerald-600">
              {formatGBP(referral.joined * referral.rewardPerReferral).replace(".00", "")}
            </span>{" "}
            earned
          </p>
        </div>

        <div className="flex gap-2">
          <div className="flex min-w-0 flex-1 items-center gap-2 rounded-xl border border-dashed border-neutral-300 bg-white p-1.5 pl-3">
            <span className="flex-1 truncate font-mono text-sm font-bold tracking-widest text-ink">{referral.code}</span>
            <button
              type="button"
              onClick={() => copy(referral.code, "code")}
              className="inline-flex items-center gap-1 rounded-lg bg-ink px-2.5 py-1.5 text-xs font-semibold text-white hover:bg-ink-hover"
            >
              {copied === "code" ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
              {copied === "code" ? "Copied" : "Copy"}
            </button>
          </div>
          <button
            type="button"
            onClick={share}
            aria-label="Share invite link"
            title={copied === "link" ? "Link copied" : "Share invite link"}
            className="inline-flex shrink-0 items-center justify-center rounded-xl bg-ink px-3 text-white transition-colors hover:bg-ink-hover"
          >
            {copied === "link" ? <Check className="size-4" /> : <Share2 className="size-4" />}
          </button>
        </div>
      </div>
    </Card>
  );
}
