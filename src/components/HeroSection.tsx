
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, Zap, Sparkles, Rocket } from 'lucide-react';
import { useEffect, useState } from 'react';

const HeroSection = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

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
        duration: 0.8
      }
    }
  };

  return (
    <section id="home" className="min-h-screen relative overflow-hidden gradient-modern">
      {/* Animated background particles */}
      <div className="absolute inset-0">
        {/* Floating geometric shapes */}
        <motion.div
          className="absolute top-20 right-20 w-32 h-32 rounded-full bg-gradient-to-br from-modern-purple to-modern-cyan opacity-20 animate-float"
          style={{
            transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`
          }}
        />
        <motion.div
          className="absolute top-1/2 right-1/3 w-20 h-20 rounded-lg bg-gradient-to-br from-modern-pink to-modern-orange opacity-30 animate-float-reverse"
          style={{
            transform: `translate(${mousePosition.x * 0.03}px, ${mousePosition.y * 0.03}px)`
          }}
        />
        <motion.div
          className="absolute bottom-32 left-20 w-24 h-24 rounded-full bg-gradient-to-br from-modern-cyan to-modern-blue opacity-25 animate-float"
          style={{
            transform: `translate(${mousePosition.x * 0.025}px, ${mousePosition.y * 0.025}px)`
          }}
        />

        {/* Abstract 3D elements */}
        <div className="absolute top-40 left-10 w-16 h-32 bg-gradient-to-b from-modern-purple to-transparent rounded-full transform rotate-45 animate-float opacity-30" />
        <div className="absolute bottom-40 right-32 w-20 h-20 border-4 border-modern-cyan rounded-lg transform rotate-12 animate-float-reverse opacity-40" />
        
        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-5" 
             style={{
               backgroundImage: `radial-gradient(circle at 1px 1px, hsl(var(--modern-cyan)) 1px, transparent 0)`,
               backgroundSize: '50px 50px'
             }} 
        />
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 pt-32 pb-20 relative z-10">
        <motion.div
          className="max-w-6xl mx-auto text-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Floating icons */}
          <motion.div className="flex justify-center mb-8" variants={itemVariants}>
            <div className="flex space-x-8">
              <motion.div 
                className="p-3 glass rounded-full animate-float"
                whileHover={{ scale: 1.2, rotate: 360 }}
                transition={{ duration: 0.5 }}
                data-cursor-hover
              >
                <Zap className="w-6 h-6 text-modern-cyan" />
              </motion.div>
              <motion.div 
                className="p-3 glass rounded-full animate-float-reverse"
                whileHover={{ scale: 1.2, rotate: -360 }}
                transition={{ duration: 0.5 }}
                data-cursor-hover
              >
                <Sparkles className="w-6 h-6 text-modern-purple" />
              </motion.div>
              <motion.div 
                className="p-3 glass rounded-full animate-float"
                whileHover={{ scale: 1.2, rotate: 360 }}
                transition={{ duration: 0.5 }}
                data-cursor-hover
              >
                <Rocket className="w-6 h-6 text-modern-pink" />
              </motion.div>
            </div>
          </motion.div>

          <motion.h1
            className="text-5xl md:text-7xl lg:text-8xl font-space font-black text-white leading-tight mb-8 animate-text-glow"
            variants={itemVariants}
          >
            <span className="block">FUTURE OF</span>
            <span className="bg-gradient-to-r from-modern-cyan via-modern-purple to-modern-pink bg-clip-text text-transparent block">
              DIGITAL CREATIVITY
            </span>
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto mb-12 leading-relaxed"
            variants={itemVariants}
          >
            We craft immersive digital experiences that push boundaries, combining cutting-edge technology with stunning design to bring your vision to life.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
            variants={itemVariants}
          >
            <Button 
              className="bg-gradient-to-r from-modern-purple to-modern-cyan text-white px-8 py-4 rounded-full text-lg font-semibold transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-modern-purple/30 group card-3d"
              data-cursor-hover
            >
              <span className="flex items-center">
                START YOUR PROJECT
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-2" />
              </span>
            </Button>
            
            <Button 
              variant="outline"
              className="border-2 border-modern-cyan text-modern-cyan hover:bg-modern-cyan hover:text-modern-dark px-8 py-4 rounded-full text-lg font-semibold transition-all duration-500 hover:scale-105 glass"
              data-cursor-hover
            >
              VIEW OUR WORK
            </Button>
          </motion.div>

          {/* Stats */}
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20"
            variants={itemVariants}
          >
            {[
              { number: '500+', label: 'Projects Completed' },
              { number: '99%', label: 'Client Satisfaction' },
              { number: '50+', label: 'Team Members' },
              { number: '24/7', label: 'Support Available' }
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="text-center glass p-6 rounded-2xl card-3d"
                whileHover={{ y: -10, scale: 1.05 }}
                data-cursor-hover
              >
                <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-modern-cyan to-modern-purple bg-clip-text text-transparent">
                  {stat.number}
                </div>
                <div className="text-gray-400 mt-2">{stat.label}</div>
              </motion.div>
            ))}
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
        data-cursor-hover
      >
        <div className="w-6 h-10 border-2 border-modern-cyan rounded-full flex justify-center glass">
          <motion.div 
            className="w-1 h-3 bg-modern-cyan rounded-full mt-2"
            animate={{
              y: [0, 10, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
