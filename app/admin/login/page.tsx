"use client";

import Image from "next/image";
import Link from "next/link";
import { Inter, Poltawski_Nowy } from "next/font/google";
import { useState } from "react";
import { useRouter } from "next/navigation";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const poltawskiNowy = Poltawski_Nowy({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

/** Intrinsic size for `next/image`; layout scales with card width */
const IMAGE_WIDTH = 520;
const IMAGE_HEIGHT = 680;

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setLoading(true);

    if (!email.trim() || !password.trim()) {
      setError("Email and password are required");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: email.trim(), password }),
      });

      const data = (await res.json().catch(() => ({}))) as { error?: string };

      if (!res.ok) {
        setError(data.error ?? "Invalid credentials");
        setLoading(false);
        return;
      }

      router.replace("/admin");
      router.refresh();
    } catch {
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  }

  return (
    <main
      className={`${inter.className} min-h-screen bg-white text-neutral-900 flex items-center justify-center py-10 sm:px-8 md:px-12`}
    >
      <div className="w-full grid md:grid-cols-2 lg:flex-row items-center justify-center gap-14 lg:gap-18 xl:gap-24">
        {/* Left: informational card */}
        <div className="w-full shrink-0 flex justify-center lg:justify-end lg:flex-1 min-w-0 px-4 md:p-10">
          <div className="w-full rounded-xl border border-black bg-white p-6 sm:p-7">
            <div
              className="overflow-hidden rounded-[10px] w-full"
              // style={{
              //   aspectRatio: `${IMAGE_WIDTH} / ${IMAGE_HEIGHT}`,
              // }}
            >
              <Image
                src="/images/ham2.JPEG"
                alt="Hanberry Beauty"
                width={IMAGE_WIDTH}
                height={IMAGE_HEIGHT}
                className="h-full w-full object-cover"
                priority
                sizes="(max-width: 640px) 100vw, 520px"
              />
            </div>
            <div className="pt-7 px-1 pb-1 text-center">
              <h2 className="text-4xl text-black tracking-tight">
                Hanberry Beauty
              </h2>
              <p className="mt-3 text-sm leading-[1.65] text-black md:w-2/3 mx-auto">
                Refined control over your beauty business — manage bookings,
                update services, and curate your latest artistry with elegance.
              </p>
              <Link
                href="/"
                className="mt-7 inline-block text-sm font-medium text-[#E5A9B8] hover:text-[#D895A8] transition-colors"
              >
                Visit site
              </Link>
            </div>
          </div>
        </div>

        {/* Right: login form */}
        <div className="w-full lg:flex-1 flex flex-col justify-center min-w-0 px-5">
          <div className={`${poltawskiNowy.className} text-black`}>
            <h1 className="text-[1.75rem] sm:text-[1.95rem] lg:text-[2.125rem] xl:text-5xl leading-[1.2] font-medium tracking-[0.04em] text-balance">
              Enter your credentials to continue
            </h1>
            <p className="mt-5 text-lg leading-relaxed">
              A private space to curate your services, bookings, and signature beauty work.
            </p>
          </div>
          

          <form onSubmit={onSubmit} className="mt-11 w-full space-y-8 max-w-[560px] lg:max-w-[620px] xl:max-w-[680px]">
            <div className="space-y-2.5">
              <label
                htmlFor="admin-email"
                className="block text-sm font-bold text-black"
              >
                Email
              </label>
              <input
                id="admin-email"
                type="email"
                autoComplete="username"
                placeholder="Enter your email here"
                className="w-full border border-black px-4 py-3 text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-1 focus:ring-neutral-300 focus:border-[#D8A48F]"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2.5">
              <label
                htmlFor="admin-password"
                className="block text-sm font-bold text-black"
              >
                Password
              </label>
              <input
                id="admin-password"
                type="password"
                autoComplete="current-password"
                placeholder="Enter your password here"
                className="w-full border border-black px-4 py-3 text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-1 focus:ring-neutral-300 focus:border-[#D8A48F]"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {error ? (
              <p className="text-sm text-red-600" role="alert">
                {error}
              </p>
            ) : null}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-black text-white py-3.5 text-sm font-medium hover:bg-neutral-900 disabled:opacity-60 transition-colors cursor-pointer"
            >
              {loading ? "Logging in…" : "Login"}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
