"use client";

import { useState, useTransition } from "react";

import { motion } from "framer-motion";

import { MagneticButton } from "./magnetic-button";

type IntakeResponse = {
  message?: string;
  nextStep?: string;
  error?: string;
};

const accessLanes = [
  "Foundation lane",
  "Strategic lane",
  "Institutional lane",
];

export function IntakeForm() {
  const [isPending, startTransition] = useTransition();
  const [response, setResponse] = useState<IntakeResponse | null>(null);
  const [email, setEmail] = useState("");
  const [wallet, setWallet] = useState("");
  const [lane, setLane] = useState(accessLanes[0]);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setResponse(null);

    startTransition(async () => {
      const request = await fetch("/api/intake", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, wallet, lane }),
      });

      const payload = (await request.json()) as IntakeResponse;
      setResponse(payload);

      if (request.ok) {
        setWallet("");
      }
    });
  }

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div className="grid gap-4 lg:grid-cols-2">
        <label className="input-shell cut-corners block px-4 py-3.5">
          <span className="font-data mb-2 block text-[0.66rem] uppercase tracking-[0.28em] text-white/42">
            Contact channel
          </span>
          <input
            className="form-field"
            type="email"
            placeholder="name@desk-domain.com"
            autoComplete="email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </label>
        <label className="input-shell cut-corners block px-4 py-3.5">
          <span className="font-data mb-2 block text-[0.66rem] uppercase tracking-[0.28em] text-white/42">
            Access lane
          </span>
          <select
            className="form-field"
            value={lane}
            onChange={(event) => setLane(event.target.value)}
          >
            {accessLanes.map((accessLane) => (
              <option key={accessLane} value={accessLane} className="bg-[#111112]">
                {accessLane}
              </option>
            ))}
          </select>
        </label>
      </div>

      <label className="input-shell cut-corners block px-4 py-3.5">
        <span className="font-data mb-2 block text-[0.66rem] uppercase tracking-[0.28em] text-white/42">
          Wallet routing
        </span>
        <input
          className="form-field"
          type="text"
          placeholder="Optional wallet or secure contact handle"
          value={wallet}
          onChange={(event) => setWallet(event.target.value)}
        />
      </label>

      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="font-data text-[0.66rem] uppercase tracking-[0.28em] text-white/42">
            Desk commits to deliberate review, not auto-approval.
          </p>
          <p className="mt-2 text-sm text-[rgba(245,239,229,0.62)]">
            Requests are routed through the same allocation logic used to shape the launch.
          </p>
        </div>
        <MagneticButton type="submit" disabled={isPending} className="justify-center">
          {isPending ? "Securing request" : "Request presale access"}
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
            : "Operator queue is open for qualified requests."}
      </motion.div>
    </form>
  );
}