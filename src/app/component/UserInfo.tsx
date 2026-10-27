"use client";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { useRouter } from "next/navigation";

const UserInfo = () => {
  const router = useRouter();
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const onSignOut = async () => {
    await authClient.signOut();
    router.push("/");
    router.refresh();
  };

  return (
    <div>
      {user ? (
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="rounded-box p-1">
            <div className="flex gap-4">
              <div className="avatar">
                <div className="ring-primary ring-offset-base-100 w-24 rounded-full ring-2 ring-offset-2">
                  <img
                    alt="Tailwind-CSS-Avatar-component"
                    src="https://img.daisyui.com/images/profile/demo/spiderperson@192.webp"
                  />
                </div>
              </div>
              <div>
                <p className="font-bold text-2xl">{user.name}</p>
                <p>{user.email}</p>
              </div>
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu dropdown-content z-50 mt-3 w-64 rounded-box border border-base-300 bg-base-100 p-3 shadow-lg"
          >
            <li className="mb-2 border-b border-base-200 pb-2">
              <div className="flex flex-col items-start">
                <span className="font-bold text-lg">{user.name}</span>
                <span className="text-sm opacity-70">{user.email}</span>
              </div>
            </li>
            <li>
              <Link href="/profile">প্রোফাইল</Link>
            </li>
            <li>
              <button type="button" onClick={onSignOut}>
                সাইন আউট
              </button>
            </li>
          </ul>
        </div>
      ) : (
        <div className="flex gap-5">
          <div>
            <Link href="/sign-up">
              <button className="btn btn-primary">সাইন আপ</button>
            </Link>
          </div>
          <div>
            <Link href="/sign-in">
              <button className="btn btn-success">সাইন ইন</button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserInfo;
