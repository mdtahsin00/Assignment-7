"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

const GoogleIcon = () => (
  <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
    <path
      fill="#4285F4"
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
    />
    <path
      fill="#34A853"
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
    />
    <path
      fill="#FBBC05"
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
    />
    <path
      fill="#EA4335"
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
    />
  </svg>
);

const GitHubIcon = () => (
  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
    <path d="M12 .5C5.37.5 0 5.87 0 12.5c0 5.3 3.44 9.8 8.21 11.39.6.11.82-.26.82-.58 0-.29-.01-1.05-.02-2.06-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.75.08-.73.08-.73 1.21.09 1.84 1.24 1.84 1.24 1.07 1.84 2.81 1.31 3.5 1 .11-.78.42-1.31.76-1.61-2.67-.3-5.47-1.34-5.47-5.96 0-1.32.47-2.39 1.24-3.23-.12-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.29-1.55 3.3-1.23 3.3-1.23.66 1.66.24 2.88.12 3.18.77.84 1.24 1.91 1.24 3.23 0 4.63-2.81 5.65-5.49 5.95.43.37.81 1.1.81 2.22 0 1.61-.01 2.9-.01 3.29 0 .32.21.7.82.58A12.01 12.01 0 0 0 24 12.5C24 5.87 18.63.5 12 .5z" />
  </svg>
);

const SignInPage = () => {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  const onSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    const formData = new FormData(e.currentTarget);
    const user = Object.fromEntries(formData.entries())
    const email = String(formData.get("email") ?? "");
    const password = String(formData.get("password") ?? "");
console.log(user);
    setPending(true);

    const { data, error } = await authClient.signIn.email({
      email,
      password,
      callbackURL: "/",
    });
    setPending(false);

    if (data) {
      router.push("/");
      router.refresh();
    }
    if (error) setError(error.message ?? "সাইন ইন ব্যর্থ হয়েছে।");
  };

  const onSocial = async (provider: "google" | "github") => {
    setError(null);
    setPending(true);
    const { error } = await authClient.signIn.social({
      provider,
      callbackURL: "/",
    });
    setPending(false);
    if (error)
      setError(
        error.message ??
          `${provider === "google" ? "Google" : "GitHub"} দিয়ে সাইন ইন ব্যর্থ হয়েছে।`
      );
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 py-10">
      <div className="w-full max-w-sm rounded-2xl border border-base-300 bg-base-100 p-6 shadow-sm">
        <h1 className="text-center text-2xl font-bold">সাইন ইন</h1>
        <p className="mt-1 mb-5 text-center text-sm text-base-content/60">
          আপনার ইমেইল ও পাসওয়ার্ড দিয়ে আপনার অ্যাকাউন্টে ঢুকুন
        </p>

        {error && (
          <div role="alert" className="alert alert-error mb-4 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={onSubmit} className="space-y-3">
          <div>
            <label htmlFor="email" className="mb-1 block text-sm font-semibold">
              ইমেইল
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              placeholder="you@example.com"
              className="input w-full"
            />
          </div>

          <div>
            <label htmlFor="password" className="mb-1 block text-sm font-semibold">
              পাসওয়ার্ড
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              minLength={8}
              placeholder="কমপক্ষে ৮ অক্ষর"
              className="input w-full"
            />
          </div>

          <button
            type="submit"
            disabled={pending}
            className="btn btn-success w-full mt-2"
          >
            {pending ? "প্রবেশ হচ্ছে..." : "সাইন ইন"}
          </button>
        </form>

        <div className="divider my-4 text-sm">অথবা</div>

        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            disabled={pending}
            onClick={() => onSocial("google")}
            className="btn btn-outline gap-2 px-2 text-xs"
          >
            <GoogleIcon />
            Google দিয়ে শুরু করুন
          </button>
          <button
            type="button"
            disabled={pending}
            onClick={() => onSocial("github")}
            className="btn btn-outline gap-2 px-2 text-xs"
          >
            <GitHubIcon />
            GitHub দিয়ে শুরু করুন
          </button>
        </div>

        <p className="mt-5 text-center text-sm">
          অ্যাকাউন্ট নেই?{" "}
          <Link href="/sign-up" className="font-semibold text-success hover:underline">
            সাইন আপ করুন
          </Link>
        </p>
      </div>

      <Link href="/" className="mt-6 text-xs text-base-content/50 hover:underline">
        ← হোম পেজে ফিরে যান
      </Link>
    </div>
  );
};

export default SignInPage;
