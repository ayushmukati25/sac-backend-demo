"use client";

import { createContext, useContext, useEffect, useRef, useState } from "react";
import { CheckCircle2, Loader2, Mail, MessageCircle, Paperclip, Send, X } from "lucide-react";
import { member, practice } from "@/lib/member-data";

const SUPPORT_EMAIL = "info@smileaccessclub.co.uk";
const MAX_FILE_MB = 10;
const topics = ["Appointments", "Billing & payments", "My practice", "Referrals & cashback", "Something else"];

const SupportContext = createContext<() => void>(() => {});

export function SupportProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <SupportContext.Provider value={() => setOpen(true)}>
      {children}
      {open && <SupportModal onClose={() => setOpen(false)} />}
    </SupportContext.Provider>
  );
}

export function SupportButton() {
  const openSupport = useContext(SupportContext);
  return (
    <button
      type="button"
      onClick={openSupport}
      aria-label="Contact support"
      className="inline-flex items-center gap-2 rounded-xl bg-ink px-3 py-2 text-sm font-semibold text-white transition-colors hover:bg-ink-hover"
    >
      <MessageCircle className="size-4" />
      <span className="hidden sm:inline">Contact support</span>
    </button>
  );
}

function SupportModal({ onClose }: { onClose: () => void }) {
  const [topic, setTopic] = useState(topics[0]);
  const [message, setMessage] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [fileError, setFileError] = useState("");
  const [state, setState] = useState<"idle" | "sending" | "sent">("idle");
  const [ticket, setTicket] = useState("");
  const fileInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const addFiles = (list: FileList | null) => {
    if (!list) return;
    const incoming = Array.from(list);
    const tooBig = incoming.filter((f) => f.size > MAX_FILE_MB * 1024 * 1024);
    setFileError(tooBig.length ? `${tooBig.map((f) => f.name).join(", ")} is over ${MAX_FILE_MB} MB.` : "");
    setFiles((prev) => [...prev, ...incoming.filter((f) => !tooBig.includes(f))]);
  };

  // Prototype only: nothing is sent anywhere. Simulates a request and shows a ticket number.
  const send = (e: React.FormEvent) => {
    e.preventDefault();
    setState("sending");
    setTimeout(() => {
      setTicket(`SAC-T${Math.floor(100000 + Math.random() * 900000)}`);
      setState("sent");
    }, 1200);
  };

  const subject = `Support request – ${member.firstName} ${member.lastName} (${member.id})`;
  const body = `Member: ${member.firstName} ${member.lastName}\nMember ID: ${member.id}\nPractice: ${practice.name}\nTopic: ${topic}\n\n${message}`;
  const mailto = `mailto:${SUPPORT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 sm:items-center sm:p-4" onClick={onClose}>
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="support-title"
        className="flex max-h-[92dvh] w-full max-w-lg flex-col overflow-hidden rounded-t-2xl bg-white shadow-2xl sm:rounded-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4 bg-ink px-5 py-4 text-white">
          <div>
            <h2 id="support-title" className="text-base font-bold">
              Contact support
            </h2>
            <p className="text-xs text-white/70">We usually reply within one working day.</p>
          </div>
          <button type="button" onClick={onClose} aria-label="Close" className="rounded-lg p-1 text-white/70 hover:bg-white/10 hover:text-white">
            <X className="size-5" />
          </button>
        </div>

        {state === "sent" ? (
          <div className="flex flex-col items-center px-6 py-10 text-center">
            <CheckCircle2 className="size-12 text-emerald-500" />
            <p className="mt-3 font-heading text-lg font-bold text-ink">Message sent</p>
            <p className="mt-1 text-sm text-neutral-600">
              Thanks {member.firstName}, our team will get back to you at {member.email}.
            </p>
            <p className="mt-4 rounded-lg bg-neutral-50 px-3 py-2 text-sm text-neutral-600">
              Reference: <span className="font-mono font-semibold text-ink">{ticket}</span>
            </p>
            <button type="button" onClick={onClose} className="mt-6 rounded-xl bg-ink px-5 py-2.5 text-sm font-semibold text-white hover:bg-ink-hover">
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={send} className="scrollbar-ink flex min-h-0 flex-col overflow-y-auto px-5 py-4">
            <div className="rounded-xl bg-neutral-100 px-3 py-2 text-xs text-ink">
              Sending as <span className="font-semibold">{member.firstName} {member.lastName}</span> · {member.id} · {practice.name}
            </div>

            <label className="mt-4 text-xs font-semibold text-ink" htmlFor="support-topic">
              Topic
            </label>
            <select
              id="support-topic"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="mt-1 rounded-xl border border-neutral-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-ink focus:ring-2 focus:ring-black/10"
            >
              {topics.map((t) => (
                <option key={t}>{t}</option>
              ))}
            </select>

            <label className="mt-3 text-xs font-semibold text-ink" htmlFor="support-message">
              Message
            </label>
            <textarea
              id="support-message"
              required
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="How can we help?"
              className="mt-1 resize-none rounded-xl border border-neutral-200 px-3 py-2.5 text-sm outline-none focus:border-ink focus:ring-2 focus:ring-black/10"
            />

            <p className="mt-3 text-xs font-semibold text-ink">Attachments</p>
            <div
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                e.preventDefault();
                addFiles(e.dataTransfer.files);
              }}
              onClick={() => fileInput.current?.click()}
              className="mt-1 flex cursor-pointer flex-col items-center rounded-xl border border-dashed border-neutral-300 px-3 py-4 text-center transition-colors hover:border-neutral-500 hover:bg-ink-hover-soft/50"
            >
              <Paperclip className="size-5 text-ink" />
              <p className="mt-1 text-sm text-neutral-700">
                <span className="font-semibold text-ink">Choose files</span> or drag them here
              </p>
              <p className="text-xs text-neutral-500">Images, PDFs or documents up to {MAX_FILE_MB} MB</p>
              <input
                ref={fileInput}
                type="file"
                multiple
                accept="image/*,.pdf,.doc,.docx"
                className="hidden"
                onChange={(e) => {
                  addFiles(e.target.files);
                  e.target.value = "";
                }}
              />
            </div>
            {fileError && <p className="mt-1 text-xs text-red-600">{fileError}</p>}
            {files.length > 0 && (
              <ul className="mt-2 space-y-1">
                {files.map((file, i) => (
                  <li key={`${file.name}-${i}`} className="flex items-center justify-between gap-2 rounded-lg bg-neutral-50 px-3 py-1.5 text-xs">
                    <span className="truncate text-ink">{file.name}</span>
                    <span className="flex shrink-0 items-center gap-2 text-neutral-500">
                      {(file.size / 1024).toFixed(0)} KB
                      <button
                        type="button"
                        aria-label={`Remove ${file.name}`}
                        onClick={() => setFiles((prev) => prev.filter((_, j) => j !== i))}
                        className="rounded p-0.5 hover:bg-neutral-200"
                      >
                        <X className="size-3.5" />
                      </button>
                    </span>
                  </li>
                ))}
              </ul>
            )}

            <div className="mt-5 flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
              <a href={mailto} className="inline-flex items-center justify-center gap-1.5 text-xs font-medium text-neutral-500 hover:text-ink">
                <Mail className="size-3.5" />
                Prefer email? {SUPPORT_EMAIL}
              </a>
              <button
                type="submit"
                disabled={state === "sending"}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-ink px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-ink-hover disabled:opacity-70"
              >
                {state === "sending" ? <Loader2 className="size-4 animate-spin" /> : <Send className="size-4" />}
                {state === "sending" ? "Sending…" : "Send message"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
