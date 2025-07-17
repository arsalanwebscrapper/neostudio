
import { motion } from 'framer-motion';
import { Check, Award, Users, Rocket, Target, Heart } from 'lucide-react';

const AboutSection = () => {
  const stats = [
    { icon: Users, number: '500+', label: 'Happy Clients' },
    { icon: Award, number: '50+', label: 'Awards Won' },
    { icon: Rocket, number: '1000+', label: 'Projects Completed' },
    { icon: Target, number: '99%', label: 'Success Rate' }
  ];

  const values = [
    {
      icon: Heart,
      title: 'Passion-Driven',
      description: 'We pour our heart into every project, ensuring exceptional results that exceed expectations.'
    },
    {
      icon: Target,
      title: 'Results-Focused',
      description: 'Every strategy is designed with clear objectives and measurable outcomes in mind.'
    },
    {
      icon: Users,
      title: 'Client-Centered',
      description: 'Your success is our priority. We work closely with you throughout the entire journey.'
    }
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
    <section id="about" className="py-20 gradient-modern relative overflow-hidden">
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
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-space font-black text-white mb-6 animate-text-glow">
            About <span className="bg-gradient-to-r from-modern-cyan via-modern-purple to-modern-pink bg-clip-text text-transparent">NeoStudio</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            We are a forward-thinking digital agency that transforms ideas into extraordinary digital experiences. 
            Our passion for innovation drives us to create solutions that not only meet today's needs but anticipate tomorrow's possibilities.
          </p>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="text-center glass p-6 rounded-2xl card-3d"
              variants={itemVariants}
              whileHover={{ y: -10, scale: 1.05 }}
              data-cursor-hover
            >
              <motion.div
                className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-modern-purple to-modern-cyan rounded-full flex items-center justify-center"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                <stat.icon className="w-8 h-8 text-white" />
              </motion.div>
              <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-modern-cyan to-modern-purple bg-clip-text text-transparent mb-2">
                {stat.number}
              </div>
              <div className="text-gray-300 font-medium">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Crafting Digital Excellence Since 2020
            </h3>
            <p className="text-gray-300 text-lg leading-relaxed mb-8">
              Founded with a vision to revolutionize the digital landscape, NeoStudio has grown from a small team of passionate creators to a leading digital agency. We believe in the power of technology to transform businesses and create meaningful connections.
            </p>
            
            <div className="space-y-4 mb-8">
              {[
                'Cutting-edge technology and innovative solutions',
                'Dedicated team of industry experts',
                'Proven track record of successful projects',
                '24/7 support and ongoing partnership'
              ].map((item, index) => (
                <motion.div
                  key={index}
                  className="flex items-center space-x-3"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="w-6 h-6 bg-gradient-to-r from-modern-cyan to-modern-purple rounded-full flex items-center justify-center flex-shrink-0">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-gray-300">{item}</span>
                </motion.div>
              ))}
            </div>

            <motion.button
              className="bg-gradient-to-r from-modern-purple to-modern-cyan text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-modern-purple/30 card-3d"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              data-cursor-hover
            >
              Learn More About Us
            </motion.button>
          </motion.div>

          {/* Right Content - Values */}
          <motion.div
            className="space-y-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {values.map((value, index) => (
              <motion.div
                key={index}
                className="glass p-6 rounded-2xl card-3d"
                variants={itemVariants}
                whileHover={{ x: 10, scale: 1.02 }}
                data-cursor-hover
              >
                <div className="flex items-start space-x-4">
                  <motion.div
                    className="w-12 h-12 bg-gradient-to-br from-modern-cyan to-modern-purple rounded-lg flex items-center justify-center flex-shrink-0"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    <value.icon className="w-6 h-6 text-white" />
                  </motion.div>
                  <div>
                    <h4 className="text-xl font-bold text-white mb-2">{value.title}</h4>
                    <p className="text-gray-300 leading-relaxed">{value.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
