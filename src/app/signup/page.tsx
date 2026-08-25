"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SignupPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const res = await fetch("/api/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });
    const data = await res.json();

    if (!res.ok) {
      setError(data.error ?? "Something went wrong.");
      setLoading(false);
      return;
    }

    const result = await signIn("credentials", { email, password, redirect: false });
    setLoading(false);
    if (result?.error) {
      router.push("/login");
      return;
    }
    router.push("/account");
    router.refresh();
  }

  return (
    <div className="mx-auto max-w-sm">
      <h1 className="mb-8 text-center font-display text-2xl text-brand-900">Create an account</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="mb-1 block text-sm text-brand-600">Name (optional)</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-md border border-brand-200 px-3 py-2.5"
          />
        </div>
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
            minLength={8}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-md border border-brand-200 px-3 py-2.5"
          />
          <p className="mt-1 text-xs text-brand-500">At least 8 characters.</p>
        </div>
        {error && <p className="text-sm text-accent-600">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-md bg-accent-600 px-4 py-2.5 text-white transition hover:bg-accent-700 disabled:opacity-60"
        >
          {loading ? "Creating account..." : "Sign up"}
        </button>
      </form>
      <p className="mt-5 text-center text-sm text-brand-600">
        Already have an account?{" "}
        <Link href="/login" className="text-accent-600 underline underline-offset-2">
          Log in
        </Link>
      </p>
    </div>
  );
}
