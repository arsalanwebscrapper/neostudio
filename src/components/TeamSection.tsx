
import { motion } from 'framer-motion';
import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const TeamSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const teamMembers = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Creative Director", 
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&h=300&fit=crop&crop=face",
      bio: "Leading creative vision with 10+ years in digital marketing"
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Strategy Lead",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face",
      bio: "Expert in data-driven marketing strategies and growth"
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      role: "Design Director",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face",
      bio: "Award-winning designer with a passion for user experience"
    },
    {
      id: 4,
      name: "David Thompson",
      role: "Tech Lead",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face",
      bio: "Full-stack developer and technical architecture specialist"
    }
  ];

  const nextSlide = () => {
    setCurrentIndex((prev) => 
      prev === teamMembers.length - 1 ? 0 : prev + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => 
      prev === 0 ? teamMembers.length - 1 : prev - 1
    );
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6
      }
    }
  };

  return (
    <section className="py-20 gradient-modern relative overflow-hidden">
      {/* Animated background particles */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-20 left-10 w-32 h-32 rounded-full bg-gradient-to-br from-modern-orange to-modern-pink opacity-30 animate-float"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div
          className="absolute bottom-20 right-20 w-24 h-24 rounded-lg bg-gradient-to-br from-modern-cyan to-modern-blue opacity-40 animate-float-reverse"
          animate={{
            y: [0, -30, 0],
            x: [0, 20, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity
          }}
        />
        
        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-5" 
             style={{
               backgroundImage: `radial-gradient(circle at 1px 1px, hsl(var(--modern-purple)) 1px, transparent 0)`,
               backgroundSize: '50px 50px'
             }} 
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-space font-black text-white mb-6 animate-text-glow">
            Our <span className="bg-gradient-to-r from-modern-cyan via-modern-purple to-modern-pink bg-clip-text text-transparent">Team</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Meet the creative minds behind our success. Our team of experts brings years of experience and innovation to every project.
          </p>
        </motion.div>

        {/* Desktop Grid View */}
        <motion.div
          className="hidden md:grid grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.id}
              className="group cursor-pointer"
              variants={itemVariants}
              whileHover={{ y: -10, scale: 1.05 }}
              data-cursor-hover
            >
              <div className="relative">
                <motion.div
                  className="w-full aspect-square rounded-full overflow-hidden bg-gradient-to-br from-modern-purple to-modern-cyan p-1 glass"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover rounded-full"
                  />
                </motion.div>
                <motion.div
                  className="absolute inset-0 bg-black bg-opacity-80 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 glass"
                >
                  <div className="text-center text-white p-4">
                    <h3 className="font-bold text-lg mb-1 bg-gradient-to-r from-modern-cyan to-modern-purple bg-clip-text text-transparent">{member.name}</h3>
                    <p className="text-sm mb-2 text-modern-cyan">{member.role}</p>
                    <p className="text-xs text-gray-300">{member.bio}</p>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Mobile Carousel View */}
        <div className="md:hidden">
          <div className="relative max-w-sm mx-auto">
            <motion.div
              className="relative"
              key={currentIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
            >
              <div className="w-64 h-64 mx-auto relative">
                <div className="w-full h-full rounded-full overflow-hidden bg-gradient-to-br from-modern-purple to-modern-cyan p-1 glass">
                  <img
                    src={teamMembers[currentIndex].image}
                    alt={teamMembers[currentIndex].name}
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
              </div>
              <div className="text-center mt-6">
                <h3 className="font-bold text-xl text-white mb-2 bg-gradient-to-r from-modern-cyan to-modern-purple bg-clip-text text-transparent">
                  {teamMembers[currentIndex].name}
                </h3>
                <p className="text-modern-cyan font-semibold mb-3">
                  {teamMembers[currentIndex].role}
                </p>
                <p className="text-gray-300">
                  {teamMembers[currentIndex].bio}
                </p>
              </div>
            </motion.div>

            {/* Navigation Arrows */}
            <motion.button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 glass rounded-full p-3 hover:bg-modern-purple/20 transition-all"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              data-cursor-hover
            >
              <ChevronLeft className="w-6 h-6 text-modern-cyan" />
            </motion.button>

            <motion.button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 glass rounded-full p-3 hover:bg-modern-purple/20 transition-all"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              data-cursor-hover
            >
              <ChevronRight className="w-6 h-6 text-modern-cyan" />
            </motion.button>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-8 space-x-2">
            {teamMembers.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === currentIndex
                    ? 'bg-modern-cyan'
                    : 'bg-gray-500 hover:bg-gray-400'
                }`}
                data-cursor-hover
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
