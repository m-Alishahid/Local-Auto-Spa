import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";


const Hero = () => {
  return (
    <div
      id="hero-section"
      className="relative h-screen w-full overflow-hidden bg-black" // 👈 full height
    >
      
      {/* Dark overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-gray-900/80 to-black/70 z-10" />

      {/* Background Image */}
      <Image
        src="/spa-hero.jpg" // 👈 apni SPA background image
        alt="Local Auto SPA premium car care"
        fill
        priority
        className="w-full h-full object-cover"
        sizes="100vw"
        style={{ objectFit: "cover" }}
      />

      {/* Content */}
      <div className="container mx-auto px-4 h-full flex items-center relative z-20">
        <div className="w-full md:w-2/3 lg:w-1/2 py-20 md:py-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-4">
              Local Auto <span className="text-gray-300">SPA</span>
            </h1>

            <p className="text-gray-300 text-lg md:text-xl mb-8 max-w-md">
              Premium auto spa services designed to bring out your car’s true
              shine & comfort — experience the elegance of{" "}
              <span className="text-white font-semibold">Local Auto SPA</span>.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/booking">
                <Button className="bg-white text-black hover:bg-gray-200 px-8 py-6 text-lg rounded-md shadow-lg">
                  Book Now
                </Button>
              </Link>
              <Link href="/services">
                <Button
                  variant="outline"
                  className="bg-transparent border border-white text-white hover:bg-white/10 px-8 py-6 text-lg rounded-md"
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
