'use'
import Link from "next/link";
import { notFound } from "next/navigation";
import { toBanglaNumber } from "../../utils/number";

interface Market {
  market: string;
  division: string;
  min: number;
  max: number;
}

interface Product {
  id: number;
  slug: string;
  nameBn: string;
  category: string;
  categoryNameBn: string;
  categoryIcon: string;
  unit: string;
  image: string;
  today: number;
  yesterday: number;
  lastWeek: number;
  lastMonth: number;

  change: {
    dir: "up" | "down" | "flat";
    pct: number;
  };

  markets: Market[];
}

interface Props {
  params: Promise<{ slug: string }>;
}

// Prerender all sobji products at build time — without this, `params` is
// runtime data and `next build` fails under cacheComponents ("blocking-prerender-dynamic").
export async function generateStaticParams() {
  const res = await fetch(
    "https://api.abcz.workers.dev/api/bazardor/products?category=sobji",
    {
      cache: "force-cache",
    },
  );
  const products: Product[] = await res.json();
  return products.map((p) => ({ slug: String(p.id) }));
}

const bnDigits = (value: number) =>
  value
    .toFixed(2)
    .replace(/\d/g, (d) => "০১২৩৪৫৬৭৮৯"[Number(d)]);

const unitLabel = (unit: string) => {
  const map: Record<string, string> = {
    kg: "কেজি",
    litre: "লিটার",
    dozen: "ডজন",
    piece: "টি",
  };
  return map[unit] ?? unit;
};

export default async function ProductDetails({ params }: Props) {
  const { slug } = await params;

  const res = await fetch(
    "https://api.abcz.workers.dev/api/bazardor/products?category=sobji",
    {
      cache: "force-cache",
    },
  );

  if (!res.ok) {
    throw new Error("Product data fetch failed");
  }

  const data: Product[] = await res.json();
  const product = data.find((item) => item.id === Number(slug));

  if (!product) {
    notFound();
  }

  const dailyDiff = product.today - product.yesterday;
  const unit = unitLabel(product.unit);

  const stats = [
    { label: "গতকালের দাম", value: product.yesterday },
    { label: "গত সপ্তাহের দাম", value: product.lastWeek },
    { label: "গত মাসের দাম", value: product.lastMonth },
  ];

  const markets = [...product.markets].sort((a, b) => a.min - b.min);

  const changeBadge =
    product.change.dir === "up"
      ? "bg-red-50 text-red-500"
      : product.change.dir === "down"
        ? "bg-green-50 text-green-600"
        : "bg-gray-100 text-gray-500";

  return (
    <div className="bg-gray-50 pb-16">
      {/* Breadcrumb */}
      <nav className="container mx-auto flex items-center gap-2 pt-5 text-sm text-gray-500">
        <Link href="/" className="hover:text-green-600">
          {product.categoryIcon} {product.categoryNameBn}
        </Link>
        <span>›</span>
        <Link href={`/${product.category}`} className="hover:text-green-600">
          {product.categoryNameBn}
        </Link>
        <span>›</span>
        <span className="font-medium text-gray-900">{product.nameBn}</span>
      </nav>

      <div className="container mx-auto mt-4 space-y-5">
        {/* Header card */}
        <section className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          <div className="flex flex-wrap items-start justify-between gap-5">
            <div className="flex items-center gap-4">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gray-100 text-4xl">
                {product.image}
              </div>
              <div>
                <h1 className="text-2xl font-bold">{product.nameBn}</h1>
                <p className="mt-1 text-sm text-gray-500">
                  প্রতি {unit} - {product.categoryNameBn}
                </p>
                <p className="mt-2 text-sm text-gray-600">
                  {dailyDiff > 0 &&
                    `বর্তমান পূর্বাবস্থার তুলনায় বাড়ছে দৈনিক ${toBanglaNumber(dailyDiff)} টাকা`}
                  {dailyDiff < 0 &&
                    `বর্তমান পূর্বাবস্থার তুলনায় কমছে দৈনিক ${toBanglaNumber(-dailyDiff)} টাকা`}
                  {dailyDiff === 0 &&
                    "বর্তমান পূর্বাবস্থার তুলনায় দাম স্থিতিশীল"}
                </p>
              </div>
            </div>

            <div className="rounded-2xl border border-gray-100 bg-gray-50 px-8 py-4 text-center">
              <p className="text-xs text-gray-500">আজকের বাজার দর</p>
              <p className="mt-1 text-4xl font-bold leading-none">
                {toBanglaNumber(product.today)}
              </p>
              <p className="mt-1 text-xs text-gray-500">টাকা / {unit}</p>
              <span
                className={`mt-3 inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold ${changeBadge}`}
              >
                {product.change.dir === "up"
                  ? "▲"
                  : product.change.dir === "down"
                    ? "▼"
                    : "■"}{" "}
                {toBanglaNumber(Math.abs(product.change.pct))}%
              </span>
            </div>
          </div>
        </section>

        {/* Stats + market table */}
        <section className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          <h2 className="text-base font-semibold">আজকের সাপেক্ষে</h2>

          <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3">
            {stats.map((s) => {
              const diff = product.today - s.value;
              return (
                <div
                  key={s.label}
                  className="rounded-xl border border-gray-100 bg-white p-4"
                >
                  <p className="text-xs text-gray-500">{s.label}</p>
                  <p
                    className={`mt-1 text-xl font-bold ${
                      diff > 0
                        ? "text-green-600"
                        : diff < 0
                          ? "text-red-500"
                          : "text-gray-500"
                    }`}
                  >
                    {toBanglaNumber(s.value)} টাকা
                  </p>
                  <p className="mt-1 text-[11px] text-gray-500">
                    {diff > 0 &&
                      `আজকের তুলনায় ${toBanglaNumber(diff)} টাকা কম`}
                    {diff < 0 &&
                      `আজকের তুলনায় ${toBanglaNumber(-diff)} টাকা বেশি`}
                    {diff === 0 && "আজকের দামের সমান"}
                  </p>
                </div>
              );
            })}
          </div>

          <h2 className="mt-10 text-base font-semibold">
            বাজারভিত্তিক আজকের দাম
          </h2>

          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-gray-100 text-xs text-gray-500">
                  <th className="py-3 pr-4 font-medium">বাজার</th>
                  <th className="py-3 pr-4 font-medium">বিভাগ</th>
                  <th className="py-3 pr-4 font-medium">ন্যূনতম</th>
                  <th className="py-3 pr-4 font-medium">সর্বোচ্চ</th>
                  <th className="py-3 font-medium">গড় দাম</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {markets.map((m) => (
                  <tr key={m.market} className="hover:bg-gray-50">
                    <td className="py-3 pr-4 font-medium text-gray-800">
                      {m.market}
                    </td>
                    <td className="py-3 pr-4 text-gray-500">{m.division}</td>
                    <td className="py-3 pr-4 text-gray-700">
                      {toBanglaNumber(m.min)} টাকা
                    </td>
                    <td className="py-3 pr-4 text-gray-700">
                      {toBanglaNumber(m.max)} টাকা
                    </td>
                    <td className="py-3 font-semibold text-gray-800">
                      {bnDigits((m.min + m.max) / 2)} টাকা
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
}
