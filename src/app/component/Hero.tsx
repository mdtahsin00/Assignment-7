import Image from "next/image";

const Hero = () => {
  return (
    <div className="bg-green-100 p-5">
      <section className="container mx-auto bg-white rounded-3xl">
        <div className="flex justify-between items-center">
          <div className="flex-col gap-20 pl-10">
            <div className="pb-50">
              <p className="bg-green-200 pb- text-green-600 inline-block px-3 py-1 rounded-full">
                মঙ্গলবার, ৬ অক্টোবর, ২০২৬
              </p>
            </div>
            <div className="">
              <p className="font-medium pb-5">
                চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক
                বিস্তারিত, গড়,
                <br /> সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
              </p>
              <button className="btn btn-success">Success</button>
            </div>
          </div>
    {/* Image */}
          <div>
            <Image
              src="/bazar-hero.png"
              width={500}
              height={500}
              alt="Picture of the author"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Hero;
