"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FloralMotif } from "@/components/floral-motif";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    setLoading(false);
    if (result?.error) {
      setError("Invalid email or password.");
      return;
    }
    router.push("/account");
    router.refresh();
  }

  return (
    <div className="mx-auto max-w-sm">
      <div className="mb-8 flex items-center justify-center gap-3">
        <FloralMotif className="h-8 w-8 text-accent-400" />
        <h1 className="font-display text-2xl text-brand-900">Log in</h1>
        <FloralMotif className="h-8 w-8 text-accent-400" />
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="mb-1 block text-sm text-brand-600">Email</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-md border border-brand-200 px-3 py-2.5"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm text-brand-600">Password</label>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-md border border-brand-200 px-3 py-2.5"
          />
        </div>
        {error && <p className="text-sm text-accent-600">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-md bg-accent-600 px-4 py-2.5 text-white transition hover:bg-accent-700 disabled:opacity-60"
        >
          {loading ? "Logging in..." : "Log in"}
        </button>
      </form>
      <p className="mt-5 text-center text-sm text-brand-600">
        No account yet?{" "}
        <Link href="/signup" className="text-accent-600 underline underline-offset-2">
          Sign up
        </Link>
      </p>
    </div>
  );
}
