
"use client";

import { useState } from "react";

interface Mosla {
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

interface ProductListProps {
  data: Mosla[];
}

export default function ProductList({ data }: ProductListProps) {
  const [sortOrder, setSortOrder] = useState("");

  const sortedProducts = [...data].sort((a, b) => {
    if (sortOrder === "low-to-high") {
      return a.today - b.today;
    }

    if (sortOrder === "high-to-low") {
      return b.today - a.today;
    }

    return 0;
  });

  return (
    <>
      {/* Sorting Dropdown */}
      <div className="pt-5 ">
        <div className="container mx-auto bg-white rounded-2xl p-5 flex justify-end gap-5 items-center">
          <p>সাজান</p>

          <select
            className="select select-bordered w-52"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="">ডিফল্ট</option>
            <option value="low-to-high">
              মূল্য: কম থেকে বেশি
            </option>
            <option value="high-to-low">
              মূল্য: বেশি থেকে কম
            </option>
          </select>
        </div>
      </div>

      {/* Product List */}
      <div className="container mx-auto pt-5">
        <p>মোট {data.length.toLocaleString("bn-BD")}টি পণ্য দেখানো হচ্ছে</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-5">
          {sortedProducts.map((i) => (
            <div
              key={i.id}
              className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm"
            >
              {/* Top Section */}
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-gray-100 rounded-xl flex items-center justify-center text-3xl shrink-0">
                  {i.image}
                </div>

                <div>
                  <h2 className="text-lg font-semibold text-gray-800">
                    {i.nameBn}
                  </h2>

                  <p className="text-sm text-gray-500">
                    প্রতি {i.unit}
                  </p>
                </div>
              </div>

              {/* Bottom Section */}
              <div className="flex items-end justify-between mt-5">
                <div>
                  <p className="text-sm text-gray-600">
                    আজকের দাম
                  </p>

                  <p className="text-xl font-bold text-gray-800">
                    {i.today} টাকা
                  </p>
                </div>

                <div className="bg-green-50 px-3 py-1.5 rounded-full text-sm font-semibold">
                  <span
                    className={
                      i.change.dir === "up"
                        ? "text-red-400"
                        : "text-green-400"
                    }
                  >
                    {i.change.dir === "up" ? "▲" : "▼"}{" "}
                    {Math.abs(i.change.pct)}%
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}