"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState, type FormEvent } from "react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export default function ProfilePage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const [name, setName] = useState("");
  const [updating, setUpdating] = useState(false);
  const [signingOut, setSigningOut] = useState(false);

  // Not logged in → send to sign-in.
  useEffect(() => {
    if (!isPending && !user) {
      router.push("/sign-in");
    }
  }, [isPending, user, router]);

  const handleSignOut = async () => {
    setSigningOut(true);
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          toast.success("সাইন আউট হয়েছে");
          router.push("/sign-in");
          router.refresh();
        },
      },
    });
    setSigningOut(false);
  };

  const handleUpdate = async (e: FormEvent) => {
    e.preventDefault();
    const newName = name.trim();
    if (!newName) {
      toast.error("নাম লিখুন");
      return;
    }
    setUpdating(true);
    const { error } = await authClient.updateUser({ name: newName });
    setUpdating(false);
    if (error) {
      toast.error(error.message || "নাম আপডেট করা যায়নি");
      return;
    }
    setName("");
    toast.success("নাম আপডেট হয়েছে");
    // Refresh server components (navbar name etc.) — session cache
    // already holds the new name, so the profile card updates instantly.
    router.refresh();
  };

  if (isPending || !user) {
    return (
      <div className="bg-gray-50 min-h-screen py-20 text-center text-gray-500">
        লোড হচ্ছে...
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen pb-16">
      <div className="container mx-auto pt-8">
        <h1 className="text-2xl font-bold">আমার প্রোফাইল</h1>
        <p className="mt-1 text-sm text-gray-500">
          আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।
        </p>

        {/* Account card */}
        <div className="mt-6 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              {user.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={user.image}
                  alt={user.name}
                  className="h-16 w-16 rounded-full object-cover"
                />
              ) : (
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 text-3xl">
                  👤
                </div>
              )}
              <div>
                <p className="text-xl font-semibold">{user.name}</p>
                <p className="text-sm text-gray-500">{user.email}</p>
              </div>
            </div>

            <button
              type="button"
              onClick={handleSignOut}
              disabled={signingOut}
              className="rounded-lg border border-red-500 px-4 py-2 text-sm font-medium text-red-500 transition hover:bg-red-50 disabled:opacity-60"
            >
              ↩ সাইন আউট
            </button>
          </div>
        </div>

        {/* Info card */}
        <div className="mt-6 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold">তথ্য</h2>

          <form onSubmit={handleUpdate} className="mt-5">
            <label htmlFor="name" className="mb-2 block text-sm font-medium">
              নাম
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={user.name}
              className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-green-500"
            />

            <button
              type="submit"
              disabled={updating}
              className="mt-4 w-full rounded-lg bg-green-600 py-3 font-semibold text-white transition hover:bg-green-700 disabled:opacity-60"
            >
              {updating ? "আপডেট হচ্ছে..." : "আপডেট"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
