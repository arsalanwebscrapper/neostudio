
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const HeroSection = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  return (
    <section id="home" className="min-h-screen relative overflow-hidden gradient-orange">
      {/* Abstract Background Elements */}
      <div className="absolute inset-0">
        {/* Floating circles */}
        <motion.div
          className="absolute top-20 right-20 w-20 h-20 bg-yellow-400 rounded-full"
          animate={{
            y: [0, -20, 0],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute top-1/2 right-40 w-32 h-32 bg-orange-300 rounded-full opacity-70"
          animate={{
            y: [0, 20, 0],
            x: [0, -10, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-20 left-20 w-16 h-16 bg-red-400 rounded-full"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, -180, -360],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        {/* Squiggly lines */}
        <motion.svg
          className="absolute top-40 left-10 w-24 h-24"
          viewBox="0 0 100 100"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, delay: 1 }}
        >
          <motion.path
            d="M10,50 Q30,10 50,50 T90,50"
            stroke="#ff6b47"
            strokeWidth="3"
            fill="transparent"
            animate={{
              d: [
                "M10,50 Q30,10 50,50 T90,50",
                "M10,50 Q30,90 50,50 T90,50",
                "M10,50 Q30,10 50,50 T90,50"
              ]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </motion.svg>

        <motion.div
          className="absolute bottom-40 right-60 w-6 h-32 bg-pink-400 rounded-full transform rotate-45"
          animate={{
            rotate: [45, 135, 45],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 pt-32 pb-20 relative z-10">
        <motion.div
          className="max-w-6xl mx-auto text-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1
            className="text-4xl md:text-6xl lg:text-7xl font-black text-gray-900 leading-tight mb-6"
            variants={itemVariants}
          >
            BUILD BUSINESS FASTER,
            <br />
            <span className="text-gray-800">WE ARE CREATIVE AGENCY</span>
          </motion.h1>

          <motion.p
            className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto mb-8 leading-relaxed"
            variants={itemVariants}
          >
            Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance.
          </motion.p>

          <motion.div
            variants={itemVariants}
          >
            <Button 
              className="bg-agency-orange hover:bg-agency-orange-dark text-white px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-xl group"
            >
              GET STARTED
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{
          y: [0, 10, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <div className="w-6 h-10 border-2 border-gray-800 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-gray-800 rounded-full mt-2"></div>
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
