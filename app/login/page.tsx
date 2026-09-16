"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
export default function LoginPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);
  const router = useRouter();
  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setPending(true);
    setError("");
    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (response.ok) router.push("/admin");
      else setError("The password was not recognised. Please try again.");
    } catch {
      setError("Unable to connect. Please try again.");
    } finally {
      setPending(false);
    }
  };
  return (
    <main id="main-content" className="site-wrap py-20">
      <div className="mx-auto max-w-md">
        <Link href="/" className="eyebrow">
          Epitome Creatives
        </Link>
        <h1 className="section-title mt-8">Studio login</h1>
        <form onSubmit={handleLogin} className="mt-8 space-y-5">
          <div>
            <label className="form-label" htmlFor="admin-password">
              Password
            </label>
            <input
              id="admin-password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="form-field"
            />
          </div>
          <button
            type="submit"
            disabled={pending}
            className="studio-button w-full disabled:opacity-60"
          >
            {pending ? "Signing in…" : "Sign in"}
          </button>
          {error && (
            <p role="alert" className="text-sm text-red-800">
              {error}
            </p>
          )}
        </form>
      </div>
    </main>
  );
}
