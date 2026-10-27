import Link from "next/link";
import ProductList from "./ProductList";
import { toBanglaNumber } from "../utils/number";


interface Dal {
  id: number;
  nameBn: string;
  unit: string;
  image: string;
  today: number;
  categoryNameBn: string;
  change: {
    dir: "up" | "down";
    pct: number;
  };
}
const page = async() => {
    const res = await fetch('https://api.abcz.workers.dev/api/bazardor/products?category=mosla',
        {
      cache: "force-cache",
    },
    );
    const data: Dal[] = await res.json();
    return (
        <div className="bg-green-100 pt-5 pb-1">
            <div className="container mx-auto bg-white rounded-2xl p-5">
                <p className="font-bold text-2xl">{data[0]?.categoryNameBn}</p>
                <p>{toBanglaNumber(data.length)}টি পণ্যের আজকের দাম ও পরিবর্তন</p>
            </div>
            <div className="pt-10">
            
            </div>
            
            <div className="pb-10"><ProductList data={data}></ProductList></div>
            
            
            
        </div>

    );
};

export default page;