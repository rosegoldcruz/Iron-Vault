"use client";

import { useState, useTransition } from "react";

import { motion } from "framer-motion";

import { MagneticButton } from "./magnetic-button";

type IntakeResponse = {
  message?: string;
  nextStep?: string;
  error?: string;
};

const callTimeOptions = [
  "Morning (9am–12pm)",
  "Afternoon (12pm–5pm)",
  "Evening (5pm–8pm)",
];

export function IntakeForm() {
  const [isPending, startTransition] = useTransition();
  const [response, setResponse] = useState<IntakeResponse | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [callTime, setCallTime] = useState(callTimeOptions[0]);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setResponse(null);

    startTransition(async () => {
      const request = await fetch("/api/intake", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, phone, callTime }),
      });

      const payload = (await request.json()) as IntakeResponse;
      setResponse(payload);

      if (request.ok) {
        setPhone("");
      }
    });
  }

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div className="grid gap-4 lg:grid-cols-2">
        <label className="input-shell cut-corners block px-4 py-3.5">
          <span className="font-data mb-2 block text-[0.66rem] uppercase tracking-[0.28em] text-white/42">
            Full name
          </span>
          <input
            className="form-field"
            type="text"
            placeholder="Your full name"
            autoComplete="name"
            required
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </label>
        <label className="input-shell cut-corners block px-4 py-3.5">
          <span className="font-data mb-2 block text-[0.66rem] uppercase tracking-[0.28em] text-white/42">
            Email address
          </span>
          <input
            className="form-field"
            type="email"
            placeholder="you@email.com"
            autoComplete="email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </label>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <label className="input-shell cut-corners block px-4 py-3.5">
          <span className="font-data mb-2 block text-[0.66rem] uppercase tracking-[0.28em] text-white/42">
            Phone number
          </span>
          <input
            className="form-field"
            type="tel"
            placeholder="(555) 555-5555"
            autoComplete="tel"
            required
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
          />
        </label>
        <label className="input-shell cut-corners block px-4 py-3.5">
          <span className="font-data mb-2 block text-[0.66rem] uppercase tracking-[0.28em] text-white/42">
            Best time to call
          </span>
          <select
            className="form-field"
            value={callTime}
            onChange={(event) => setCallTime(event.target.value)}
          >
            {callTimeOptions.map((option) => (
              <option key={option} value={option} className="bg-[#111112]">
                {option}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="font-data text-[0.66rem] uppercase tracking-[0.28em] text-white/42">
            No commitment required to opt in.
          </p>
          <p className="mt-2 text-sm text-[rgba(245,239,229,0.62)]">
            A representative will contact you within one business day to review presale details.
          </p>
        </div>
        <MagneticButton type="submit" disabled={isPending} className="justify-center">
          {isPending ? "Submitting..." : "Opt in for presale"}
        </MagneticButton>
      </div>

      <motion.div
        className="min-h-6 text-sm text-[rgba(245,239,229,0.68)]"
        animate={{ opacity: response ? 1 : 0.55, y: response ? 0 : 4 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        aria-live="polite"
      >
        {response?.error
          ? response.error
          : response?.message
            ? `${response.message} ${response.nextStep ?? ""}`
            : "Presale consultation is open — submit your info above."}
      </motion.div>
    </form>
  );
}