import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <div
      id="hero-section"
      className="h-screen w-full overflow-hidden bg-black"
    >
      {/* Optional Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black via-gray-900 to-black z-0" />

      {/* Content */}
      <div className="container mx-auto px-6 md:px-12 h-full flex items-center justify-start relative z-20">
        {/* 👈 justify-start = content left side */}
        <div className="w-full md:w-1/2 text-left pl-4 md:pl-8">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-tight mb-6">
              Local Auto <span className="text-gray-300">SPA</span>
            </h1>

            <p className="text-gray-300 text-lg md:text-xl mb-10 max-w-lg">
              Premium auto spa services designed to bring out your car’s{" "}
              <span className="text-white font-semibold">true shine & comfort</span>.  
              Experience the elegance of{" "}
              <span className="text-white font-semibold">Local Auto SPA</span>.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-start">
              <Link href="/booking">
                <Button className="bg-white text-black hover:bg-gray-200 px-8 py-6 text-lg rounded-full shadow-lg">
                  Book Now
                </Button>
              </Link>
              <Link href="/services">
                <Button
                  variant="outline"
                  className="border-2 border-white text-white hover:bg-white/10 px-8 py-6 text-lg rounded-full"
                >
                  Explore Services
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Hero;



