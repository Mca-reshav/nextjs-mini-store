"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import { routePath } from "@/types/route";

export default function RegisterPage() {
  const { register } = useAuth();
  const router = useRouter();

  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError("");
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.password) {
      setError("All fields are required");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      register(form);
      router.push("/");
    }, 500);
  };

  return (
    <main className="min-h-[80vh] flex items-center justify-center px-4">
      
      <section className="w-full max-w-md border rounded shadow p-6">
        
        <header>
          <h1 className="text-2xl font-bold mb-4 text-center">
            Create an Account
          </h1>
        </header>

        {error && (
          <p className="text-red-500 text-sm mb-3 text-center">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-3">
          
          <div>
            <label className="text-sm font-medium">Name</label>
            <input
              name="name"
              placeholder="Enter your name"
              value={form.name}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded mt-1"
            />
          </div>

          <div>
            <label className="text-sm font-medium">Email</label>
            <input
              name="email"
              type="email"
              placeholder="Enter your email"
              value={form.email}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded mt-1"
            />
          </div>

          <div>
            <label className="text-sm font-medium">Password</label>
            <input
              name="password"
              type="password"
              placeholder="Enter your password"
              value={form.password}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded mt-1"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 disabled:opacity-50 mt-2"
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        <footer className="mt-4 text-center text-sm">
          <p>
            Already have an account?{" "}
            <Link href={routePath.login} className="text-blue-500">
              Login
            </Link>
          </p>
        </footer>
      </section>
    </main>
  );
}