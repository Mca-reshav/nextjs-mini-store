"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import { routePath } from "@/types/route";

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();

  const [form, setForm] = useState({ name: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError("");
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.name || !form.password) {
      setError("All fields are required");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      login(form);
      router.push("/");
    }, 500);
  };

  return (
    <main className="min-h-[80vh] flex items-center justify-center px-4">

      <section
        className="w-full max-w-md p-6 border rounded shadow bg-white"
        aria-labelledby="login-heading"
      >
        <header className="mb-4 text-center">
          <h1 id="login-heading" className="text-2xl font-bold">
            Login
          </h1>
        </header>

        <form onSubmit={handleSubmit} noValidate>

          {error && (
            <p
              className="text-red-500 text-sm mb-3 text-center"
              role="alert"
            >
              {error}
            </p>
          )}

          <div className="mb-3">
            <label htmlFor="name" className="block text-sm mb-1">
              Name
            </label>
            <input
              id="name"
              name="name"
              value={form.name}
              placeholder="Enter your name"
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-sm mb-1">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Enter your password"
              value={form.password}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <footer className="mt-4 text-sm text-center">
          <p>
            Don’t have an account?{" "}
            <Link href={routePath.register} className="text-blue-500">
              Register
            </Link>
          </p>
        </footer>
      </section>
    </main>
  );
}