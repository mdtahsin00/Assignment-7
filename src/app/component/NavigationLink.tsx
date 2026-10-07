
import Link from "next/link";
interface Navigation {
  id: string;
  slug: string;
  nameBn: string;
  icon: string;
}
const NavigationLink = async () => {
  const res = await fetch(
    "https://api.api-store.workers.dev/api/bazardor/categories",
  {
      cache: "force-cache",
    },
);
  const data: Navigation[] = await res.json();
  console.log(data);
  return (
    <div className="flex gap-5 p-5">
      {data.map(l => (
        <Link key={l.id} href={l.slug}>
          {l.icon}  {l.nameBn}
        </Link>
      ))}
    </div>
  );
};

export default NavigationLink;
