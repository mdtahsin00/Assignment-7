import Marquee from "react-fast-marquee";
interface MarqueeLink {
  id: number;
  nameBn: string;
  unit: string;
  image: string;
  today: number;

  change: {
    dir: "up" | "down";
    pct: number;
  };
}
const Marqueeitems = async () => {
  const res = await fetch(
    "https://api.api-store.workers.dev/api/bazardor/products",
    {
      cache: "force-cache",
    },
  );
  const data: MarqueeLink[] = await res.json();
  return (
    <Marquee>
      <div className="flex gap-10 p-5 text-[20px]">
        {data.map((l) => (
          <span key={l.id} className="flex items-center gap-2 border-y border-gray-200 px-4 py-2">
    {/* Emoji */}
    <span>{l.image}</span>

    {/* Product name */}
    <span className="">
      {l.nameBn}
    </span>

    {/* Price */}
    <span className="">
      {l.today}/{l.unit}
    </span>

    {/* Only ▲/▼ and % color changes */}
    <span
      className={
        l.change.dir === "up"
          ? "text-red-400"
          : "text-green-400"
      }
    >
      {l.change.dir === "up" ? "▲" : "▼"}{" "}
      {Math.abs(l.change.pct)}%
    </span>
  </span>
        ))}
      </div>
    </Marquee>
  );
};

export default Marqueeitems;
