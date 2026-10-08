interface Chal {
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
const page = async() => {
    const res = await fetch('https://api.abcz.workers.dev/api/bazardor/products?category=chal',
        {
      cache: "force-cache",
    },
    );
    const data: Chal[] = await res.json();
    return (
        <div className="bg-green-100 pt-5 pb-50">
            <div className="container mx-auto bg-white rounded-2xl p-5">
                <p className="font-bold text-2xl">চাল</p>
                <p>৪টি পণ্যের আজকের দাম ও পরিবর্তন</p>
            </div>
            <div className="pt-10">
            <div className="container mx-auto bg-white rounded-2xl p-5 flex justify-end gap-5 items-center">
                <p>সাজান</p>
                <button className="btn btn-dash btn-primary">Primary</button>
            </div>
            </div>
            <div className="container mx-auto pt-5 ">
                <p>মোট ৪টি পণ্য দেখানো হচ্ছে</p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-5">
                    {data.map((i) => (
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
                <div className="bg-green-50 text-red-500 px-3 py-1.5 rounded-full text-sm font-semibold">
                  <span
                  className={
                    i.change.dir === "up" ? "text-red-400" : "text-green-400"
                  }
                >
                  {i.change.dir === "up" ? "▲" : "▼"} {Math.abs(i.change.pct)}%
                </span>
                </div>
                
              </div>
            </div>
          ))}
                </div>
            </div>
        </div>

    );
};

export default page;