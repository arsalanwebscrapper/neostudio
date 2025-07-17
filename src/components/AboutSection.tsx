import { motion } from 'framer-motion';
import { Check, Award, Users, Rocket, Target, Heart } from 'lucide-react';

const AboutSection = () => {
  const stats = [
    { icon: Users, number: '500+', label: 'Happy Clients' },
    { icon: Award, number: '50+', label: 'Awards Won' },
    { icon: Rocket, number: '1000+', label: 'Projects Completed' },
    { icon: Target, number: '99%', label: 'Success Rate' }
  ];

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
    <section id="about" className="py-16 gradient-modern relative overflow-hidden">
      {/* Animated background particles */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-40 right-20 w-40 h-40 rounded-full bg-gradient-to-br from-modern-cyan to-modern-blue opacity-20 animate-float"
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, -360],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div
          className="absolute bottom-20 left-16 w-28 h-28 rounded-lg bg-gradient-to-br from-modern-pink to-modern-orange opacity-30 animate-float-reverse"
          animate={{
            y: [0, -50, 0],
            rotate: [0, 180, 0],
          }}
          transition={{
            duration: 18,
            repeat: Infinity
          }}
        />
        
        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-5" 
             style={{
               backgroundImage: `radial-gradient(circle at 1px 1px, hsl(var(--modern-purple)) 1px, transparent 0)`,
               backgroundSize: '60px 60px'
             }} 
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Compact About Section */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="max-w-4xl mx-auto glass rounded-3xl p-8 card-3d">
            <h2 className="text-3xl md:text-4xl font-space font-black text-white mb-4">
              About <span className="bg-gradient-to-r from-modern-cyan via-modern-purple to-modern-pink bg-clip-text text-transparent">NeoStudio</span>
            </h2>
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="text-left">
                <h3 className="text-xl font-bold text-white mb-3">
                  Crafting Digital Excellence Since 2020
                </h3>
                <p className="text-gray-300 leading-relaxed mb-4">
                  We are a forward-thinking digital agency that transforms ideas into extraordinary digital experiences. 
                  Our passion for innovation drives us to create solutions that not only meet today's needs but anticipate tomorrow's possibilities.
                </p>
                <div className="flex flex-wrap gap-2">
                  {[
                    'Cutting-edge technology',
                    'Expert team',
                    'Proven results',
                    '24/7 support'
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      className="flex items-center bg-white/10 rounded-full px-3 py-1"
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <Check className="w-3 h-3 text-modern-cyan mr-2" />
                      <span className="text-gray-300 text-sm">{item}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
              
              {/* Compact Stats */}
              <div className="grid grid-cols-2 gap-4">
                {stats.map((stat, index) => (
                  <motion.div
                    key={index}
                    className="text-center glass p-4 rounded-xl card-3d"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ y: -5, scale: 1.05 }}
                  >
                    <motion.div
                      className="w-8 h-8 mx-auto mb-2 bg-gradient-to-br from-modern-purple to-modern-cyan rounded-full flex items-center justify-center"
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.5 }}
                    >
                      <stat.icon className="w-4 h-4 text-white" />
                    </motion.div>
                    <div className="text-lg font-bold bg-gradient-to-r from-modern-cyan to-modern-purple bg-clip-text text-transparent">
                      {stat.number}
                    </div>
                    <div className="text-gray-300 text-xs">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Values Section - More Compact */}
        <motion.div
          className="grid md:grid-cols-3 gap-6"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          {[
            {
              icon: Heart,
              title: 'Passion-Driven',
              description: 'We pour our heart into every project, ensuring exceptional results.'
            },
            {
              icon: Target,
              title: 'Results-Focused',
              description: 'Every strategy is designed with clear objectives and measurable outcomes.'
            },
            {
              icon: Users,
              title: 'Client-Centered',
              description: 'Your success is our priority throughout the entire journey.'
            }
          ].map((value, index) => (
            <motion.div
              key={index}
              className="glass p-6 rounded-2xl card-3d text-center"
              whileHover={{ y: -10, scale: 1.02 }}
              data-cursor-hover
            >
              <motion.div
                className="w-12 h-12 mx-auto mb-4 bg-gradient-to-br from-modern-cyan to-modern-purple rounded-lg flex items-center justify-center"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                <value.icon className="w-6 h-6 text-white" />
              </motion.div>
              <h4 className="text-lg font-bold text-white mb-2">{value.title}</h4>
              <p className="text-gray-300 text-sm">{value.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
