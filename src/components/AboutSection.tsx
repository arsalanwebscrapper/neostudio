
import { motion } from 'framer-motion';
import { Award, Users, Target, Zap } from 'lucide-react';

const AboutSection = () => {
  const stats = [
    { number: '150+', label: 'Projects Completed', icon: Target },
    { number: '50+', label: 'Happy Clients', icon: Users },
    { number: '10+', label: 'Years Experience', icon: Award },
    { number: '24/7', label: 'Support Available', icon: Zap },
  ];

  const values = [
    {
      title: 'Innovation First',
      description: 'We stay ahead of trends and technology to deliver cutting-edge solutions.',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      title: 'Client-Centric',
      description: 'Your success is our success. We work closely with you every step of the way.',
      color: 'from-green-500 to-emerald-500'
    },
    {
      title: 'Quality Driven',
      description: 'We never compromise on quality and always strive for excellence.',
      color: 'from-purple-500 to-pink-500'
    },
    {
      title: 'Results Focused',
      description: 'Every strategy and design decision is made with your business goals in mind.',
      color: 'from-orange-500 to-red-500'
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
    <section id="about" className="py-20 bg-gradient-to-br from-white to-gray-50 relative overflow-hidden">
      {/* Background Abstract Elements */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-40 left-20 w-40 h-40 bg-gradient-to-br from-orange-100 to-peach-100 rounded-full opacity-40"
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div
          className="absolute bottom-20 right-20 w-32 h-32 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full opacity-30"
          animate={{
            y: [0, -40, 0],
            x: [0, -20, 0],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
            About Our Agency
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We're a passionate team of creatives, strategists, and developers dedicated to helping businesses thrive in the digital world.
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
              key={stat.label}
              className="text-center group"
              variants={itemVariants}
              whileHover={{ y: -10 }}
            >
              <div className="relative">
                <motion.div
                  className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-agency-orange to-agency-peach rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
                >
                  <stat.icon className="w-8 h-8 text-white" />
                </motion.div>
                <motion.div
                  className="text-3xl md:text-4xl font-black text-gray-900 mb-2"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  {stat.number}
                </motion.div>
                <p className="text-gray-600 font-medium">{stat.label}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-20">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h3 className="text-3xl font-bold text-gray-900 mb-6">
              Building Digital Experiences That Matter
            </h3>
            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p>
                Founded in 2014, CreativeStudio has been at the forefront of digital innovation, helping businesses of all sizes establish and grow their online presence. Our team combines creative excellence with strategic thinking to deliver solutions that not only look great but drive real business results.
              </p>
              <p>
                We believe that great design is more than just aesthetics—it's about creating meaningful connections between brands and their audiences. Every project we undertake is an opportunity to tell a unique story and solve complex challenges with elegant, user-focused solutions.
              </p>
              <p>
                Our collaborative approach ensures that your vision is at the heart of everything we create. We don't just build websites and campaigns; we build partnerships that last.
              </p>
            </div>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="rounded-3xl overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=600&h=400&fit=crop"
                alt="Our team at work"
                className="w-full h-full object-cover"
              />
            </div>
            <motion.div
              className="absolute -bottom-6 -right-6 w-24 h-24 bg-gradient-to-br from-agency-orange to-agency-peach rounded-full flex items-center justify-center shadow-lg"
              animate={{
                rotate: [0, 360],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear"
              }}
            >
              <Award className="w-12 h-12 text-white" />
            </motion.div>
          </motion.div>
        </div>

        {/* Values Section */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h3 className="text-3xl font-bold text-gray-900 mb-4">
            Our Core Values
          </h3>
          <p className="text-gray-600 max-w-2xl mx-auto">
            These principles guide everything we do and ensure we deliver exceptional results for our clients.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {values.map((value, index) => (
            <motion.div
              key={value.title}
              className="text-center group"
              variants={itemVariants}
              whileHover={{ y: -10 }}
            >
              <div className={`w-16 h-16 mx-auto mb-6 bg-gradient-to-br ${value.color} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                <div className="w-8 h-8 bg-white rounded-lg"></div>
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-3">
                {value.title}
              </h4>
              <p className="text-gray-600">
                {value.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
