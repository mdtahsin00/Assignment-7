interface itemApi {
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

const DownPrice = async () => {
  const res = await fetch(
    "https://api.api-store.workers.dev/api/bazardor/products",
    {
      cache: "force-cache",
    },
  );
  const data: itemApi[] = await res.json();

  return (
    <section className="bg-green-100 pt-15">
      <div className="container mx-auto">
        <div className="font-bold text-2xl pb-5"><span className="text-green-600">▼</span> আজ দাম কমেছে</div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data
            .filter((u) => u.change.dir === "down")
            .map((i) => (
              <div
                key={i.id}
                className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm"
              >
                {/* Top Section */}
                <div className="flex items-center gap-4">
                  {/* Image */}
                  <div className="w-14 h-14 bg-gray-100 rounded-xl flex items-center justify-center text-3xl shrink-0">
                    {i.image}
                  </div>

                  {/* Name + Unit */}
                  <div>
                    <h2 className="text-lg font-semibold text-gray-800">
                      {i.nameBn}
                    </h2>

                    <p className="text-sm text-gray-500">প্রতি {i.unit}</p>
                  </div>
                </div>

                {/* Bottom Section */}
                <div className="flex items-end justify-between mt-5">
                  {/* Price */}
                  <div>
                    <p className="text-sm text-gray-600">আজকের দাম</p>

                    <p className="text-xl font-bold text-gray-800">
                      {i.today} টাকা
                    </p>
                  </div>

                  {/* Percentage */}
                  <div className="bg-green-50 text-green-500 px-3 py-1.5 rounded-full text-sm font-semibold">
                    ▼ {Math.abs(i.change.pct)}%
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
      <div></div>
      <div></div>
    </section>
  );
};

export default DownPrice;
