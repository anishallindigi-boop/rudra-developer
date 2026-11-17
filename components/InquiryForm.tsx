"use client";

import { useState, type FormEvent } from "react";
import { WhatsApp, Check } from "./icons";
import { waLink } from "../lib/site";
import { submitEnquiry } from "../lib/api";

const PROJECT_OPTIONS = [
  "Shree Rudra Homes, Narwana",
  "Bhagat Singh Colony Extension, Kaithal",
  "General Enquiry",
];

export default function InquiryForm({
  defaultProject = PROJECT_OPTIONS[2],
  compact = false,
}: {
  defaultProject?: string;
  compact?: boolean;
}) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [project, setProject] = useState(defaultProject);
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    const text = [
      "Hello Shree Rudra Developers!",
      "",
      `Naam: ${name}`,
      `Phone: ${phone}`,
      `Interest: ${project}`,
      message ? `Message: ${message}` : null,
    ]
      .filter(Boolean)
      .join("\n");
    window.open(waLink(text), "_blank", "noopener,noreferrer");
    // Also save enquiry in the backend (dashboard) — fire and forget
    submitEnquiry({ name, phone, project, message }).catch(() => {});
    setSent(true);
    window.setTimeout(() => setSent(false), 5000);
  }

  const inputClasses =
    "w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-charcoal placeholder:text-slate-400 transition-colors outline-none focus:border-brand focus:ring-2 focus:ring-brand/15";

  return (
    <form
      onSubmit={onSubmit}
      className="rounded-2xl border border-slate-100 bg-white p-6 shadow-xl shadow-slate-200/60 sm:p-8"
    >
      <h3 className="text-xl font-extrabold tracking-tight text-charcoal">
        Inquiry Form
      </h3>
      <p className="mt-1 text-sm text-slate-500">
        Details bharein — seedha hamare WhatsApp par message aayega.
      </p>

      <div className={`mt-6 grid gap-4 ${compact ? "" : "sm:grid-cols-2"}`}>
        <div>
          <label htmlFor="inq-name" className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-slate-500">
            Aapka Naam *
          </label>
          <input
            id="inq-name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Rahul Sharma"
            className={inputClasses}
          />
        </div>
        <div>
          <label htmlFor="inq-phone" className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-slate-500">
            Phone Number *
          </label>
          <input
            id="inq-phone"
            required
            type="tel"
            pattern="[0-9+ ]{10,15}"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="e.g. 98765 43210"
            className={inputClasses}
          />
        </div>
      </div>

      <div className="mt-4">
        <label htmlFor="inq-project" className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-slate-500">
          Kisme Interest Hai?
        </label>
        <select
          id="inq-project"
          value={project}
          onChange={(e) => setProject(e.target.value)}
          className={inputClasses}
        >
          {PROJECT_OPTIONS.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </div>

      <div className="mt-4">
        <label htmlFor="inq-msg" className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-slate-500">
          Message (Optional)
        </label>
        <textarea
          id="inq-msg"
          rows={3}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Plot size, budget ya koi bhi sawaal..."
          className={`${inputClasses} resize-none`}
        />
      </div>

      <button
        type="submit"
        className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-brand px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-brand/30 transition-all hover:-translate-y-0.5 hover:bg-brand-dark"
      >
        <WhatsApp className="h-5 w-5" />
        WhatsApp Par Inquiry Bhejein
      </button>

      {sent && (
        <p className="mt-4 flex items-center justify-center gap-2 rounded-xl bg-rose-tint px-4 py-3 text-sm font-semibold text-brand">
          <Check className="h-4 w-4" />
          WhatsApp khul gaya — bas message send kar dein!
        </p>
      )}
      <p className="mt-3 text-center text-xs text-slate-400">
        Aapki jaankari 100% private rahegi • No spam
      </p>
    </form>
  );
}
