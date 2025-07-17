
import { motion } from 'framer-motion';
import { 
  Palette, 
  TrendingUp, 
  Code, 
  Megaphone, 
  Search, 
  BarChart3 
} from 'lucide-react';

const ServicesSection = () => {
  const services = [
    {
      icon: Palette,
      title: "Brand Design",
      description: "Creating stunning visual identities that capture your brand's essence and resonate with your audience.",
      color: "from-modern-purple to-modern-pink"
    },
    {
      icon: TrendingUp,
      title: "Digital Strategy",
      description: "Data-driven strategies that propel your business forward in the digital landscape.",
      color: "from-modern-blue to-modern-cyan"
    },
    {
      icon: Code,
      title: "Web Development",
      description: "Building fast, responsive, and user-friendly websites that convert visitors into customers.",
      color: "from-modern-cyan to-modern-blue"
    },
    {
      icon: Megaphone,
      title: "Social Media Marketing",
      description: "Engaging social media campaigns that build communities and drive brand awareness.",
      color: "from-modern-orange to-modern-pink"
    },
    {
      icon: Search,
      title: "SEO Optimization",
      description: "Improving your search engine rankings to increase visibility and organic traffic.",
      color: "from-modern-purple to-modern-cyan"
    },
    {
      icon: BarChart3,
      title: "Analytics & Insights",
      description: "Comprehensive analytics and reporting to measure success and optimize performance.",
      color: "from-modern-cyan to-modern-purple"
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
    hidden: { y: 60, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6
      }
    }
  };

  return (
    <section id="services" className="py-20 gradient-modern relative overflow-hidden">
      {/* Animated background particles */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-20 right-20 w-40 h-40 rounded-full bg-gradient-to-br from-modern-purple to-modern-cyan opacity-20 animate-float"
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div
          className="absolute bottom-40 left-10 w-24 h-24 rounded-full bg-gradient-to-br from-modern-pink to-modern-orange opacity-30 animate-float-reverse"
          animate={{
            y: [0, -40, 0],
            x: [0, 30, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity
          }}
        />
        
        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-5" 
             style={{
               backgroundImage: `radial-gradient(circle at 1px 1px, hsl(var(--modern-cyan)) 1px, transparent 0)`,
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
            Our <span className="bg-gradient-to-r from-modern-cyan via-modern-purple to-modern-pink bg-clip-text text-transparent">Services</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            We offer comprehensive digital solutions to help your business thrive in the modern digital landscape.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              className="group"
              variants={itemVariants}
              whileHover={{ y: -10, scale: 1.02 }}
              data-cursor-hover
            >
              <div className="glass rounded-3xl p-8 h-full card-3d transition-all duration-300 hover:shadow-2xl hover:shadow-modern-purple/20">
                <motion.div
                  className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                >
                  <service.icon className="w-8 h-8 text-white" />
                </motion.div>
                
                <h3 className="text-2xl font-bold text-white mb-4 group-hover:bg-gradient-to-r group-hover:from-modern-cyan group-hover:to-modern-purple group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
                  {service.title}
                </h3>
                
                <p className="text-gray-300 leading-relaxed">
                  {service.description}
                </p>

                <motion.div
                  className="mt-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                >
                  <div className="h-1 w-0 bg-gradient-to-r from-modern-cyan to-modern-purple group-hover:w-full transition-all duration-500 rounded-full"></div>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Call to Action */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <motion.button
            className="bg-gradient-to-r from-modern-purple to-modern-cyan text-white px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-modern-purple/30 card-3d"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            data-cursor-hover
          >
            Start Your Project Today
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesSection;
