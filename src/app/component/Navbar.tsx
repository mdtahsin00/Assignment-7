import Image from "next/image";
import NavigationLink from "./NavigationLink";
// import Marquee from "./Marquee";
import MarqueeItems from "./Marquee";

const Navbar = () => {
  return (
    <div>
    <div className="container mx-auto pt-5 ">
    <section className="flex justify-between pb-5 ">
      <div className="flex gap-3 items-center">
        <div className="bg-green-400 p-4 items-center rounded-2xl">
          <Image
            src="/logo-icon.png"
            width={15}
            height={15}
            alt="Picture of the author"
          />
        </div>
        <div>
            <p className="font-bold">বাজার দর</p>
            <p>মঙ্গলবার, ৬ অক্টোবর, ২০২৬</p>
        </div>
      </div>
      <div className="flex gap-5">
        <div><button className="btn btn-primary">Sign-Up</button></div>
        <div><button className="btn btn-success">Sign-In</button></div>
       
      </div>
    </section>
    <div className="">
        
        </div>
    
    </div>
    <div className="container mx-auto">
   <NavigationLink></NavigationLink>
    </div>
    <div>
        <MarqueeItems></MarqueeItems>
    </div>
    
    </div>
  );
};

export default Navbar;
