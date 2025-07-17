
import { motion } from 'framer-motion';
import { useState } from 'react';
import { ExternalLink, Eye } from 'lucide-react';

const PortfolioSection = () => {
  const [activeFilter, setActiveFilter] = useState('all');

  const filters = [
    { id: 'all', label: 'All Projects' },
    { id: 'web', label: 'Web Design' },
    { id: 'mobile', label: 'Mobile Apps' },
    { id: 'branding', label: 'Branding' },
    { id: 'ecommerce', label: 'E-commerce' }
  ];

  const projects = [
    {
      id: 1,
      title: 'TechCorp Website',
      category: 'web',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop',
      description: 'Modern corporate website with sleek design',
      tags: ['React', 'UI/UX', 'Responsive']
    },
    {
      id: 2,
      title: 'FoodieApp Mobile',
      category: 'mobile',
      image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&h=400&fit=crop',
      description: 'Food delivery app with intuitive interface',
      tags: ['React Native', 'Mobile UI', 'API']
    },
    {
      id: 3,
      title: 'Brand Identity Suite',
      category: 'branding',
      image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&h=400&fit=crop',
      description: 'Complete brand identity for startup',
      tags: ['Logo Design', 'Brand Guidelines', 'Print']
    },
    {
      id: 4,
      title: 'E-Shop Platform',
      category: 'ecommerce',
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop',
      description: 'Full-featured e-commerce platform',
      tags: ['E-commerce', 'Payment Gateway', 'Admin Panel']
    },
    {
      id: 5,
      title: 'Portfolio Website',
      category: 'web',
      image: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=600&h=400&fit=crop',
      description: 'Creative portfolio for digital artist',
      tags: ['Portfolio', 'Gallery', 'Animation']
    },
    {
      id: 6,
      title: 'FinTech Dashboard',
      category: 'web',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop',
      description: 'Advanced analytics dashboard',
      tags: ['Dashboard', 'Data Viz', 'FinTech']
    }
  ];

  const filteredProjects = activeFilter === 'all' 
    ? projects 
    : projects.filter(project => project.category === activeFilter);

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
    <section id="portfolio" className="py-20 gradient-modern relative overflow-hidden">
      {/* Animated background particles */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-32 right-24 w-44 h-44 rounded-full bg-gradient-to-br from-modern-orange to-modern-pink opacity-20 animate-float"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, -360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div
          className="absolute bottom-24 left-20 w-32 h-32 rounded-lg bg-gradient-to-br from-modern-cyan to-modern-purple opacity-30 animate-float-reverse"
          animate={{
            y: [0, -40, 0],
            x: [0, 30, 0],
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
               backgroundImage: `radial-gradient(circle at 1px 1px, hsl(var(--modern-pink)) 1px, transparent 0)`,
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
            Our <span className="bg-gradient-to-r from-modern-cyan via-modern-purple to-modern-pink bg-clip-text text-transparent">Portfolio</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Explore our latest projects and see how we've helped businesses transform their digital presence.
          </p>
        </motion.div>

        {/* Filter Buttons */}
        <motion.div
          className="flex flex-wrap justify-center gap-4 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          {filters.map((filter) => (
            <motion.button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                activeFilter === filter.id
                  ? 'bg-gradient-to-r from-modern-purple to-modern-cyan text-white'
                  : 'glass text-gray-300 hover:text-white hover:bg-modern-purple/20'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              data-cursor-hover
            >
              {filter.label}
            </motion.button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          key={activeFilter}
        >
          {filteredProjects.map((project) => (
            <motion.div
              key={project.id}
              className="group glass rounded-2xl overflow-hidden card-3d"
              variants={itemVariants}
              whileHover={{ y: -10, scale: 1.02 }}
              data-cursor-hover
            >
              <div className="relative overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-4 left-4 right-4 flex space-x-3">
                    <motion.button
                      className="p-2 bg-modern-cyan rounded-full text-white hover:bg-modern-cyan/80 transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Eye className="w-4 h-4" />
                    </motion.button>
                    <motion.button
                      className="p-2 bg-modern-purple rounded-full text-white hover:bg-modern-purple/80 transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <ExternalLink className="w-4 h-4" />
                    </motion.button>
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-2 group-hover:bg-gradient-to-r group-hover:from-modern-cyan group-hover:to-modern-purple group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
                  {project.title}
                </h3>
                <p className="text-gray-300 mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="px-3 py-1 bg-modern-purple/20 text-modern-cyan text-sm rounded-full border border-modern-purple/30"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
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
            View All Projects
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default PortfolioSection;
