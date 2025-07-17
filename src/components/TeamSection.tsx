import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '@/integrations/supabase/client';
import { Linkedin, Twitter, Mail } from 'lucide-react';

interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  image_url: string;
  email: string;
  linkedin_url: string;
  twitter_url: string;
  display_order: number;
}

const TeamSection = () => {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTeamMembers();
  }, []);

  const fetchTeamMembers = async () => {
    const { data, error } = await supabase
      .from('team_members')
      .select('*')
      .eq('is_active', true)
      .order('display_order', { ascending: true });

    if (data) {
      setTeamMembers(data);
    }
    setLoading(false);
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

  if (loading) {
    return (
      <section id="team" className="py-20 gradient-modern relative overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center text-white text-xl">Loading team...</div>
        </div>
      </section>
    );
  }

  return (
    <section id="team" className="py-20 gradient-modern relative overflow-hidden">
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
            Meet Our <span className="bg-gradient-to-r from-modern-cyan via-modern-purple to-modern-pink bg-clip-text text-transparent">Dream Team</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Passionate creators, strategic thinkers, and technical experts working together to bring your vision to life
          </p>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.id}
              className="glass rounded-3xl p-8 text-center card-3d group"
              variants={itemVariants}
              whileHover={{ y: -20, scale: 1.05 }}
              data-cursor-hover
            >
              <motion.div
                className="relative mb-6"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.3 }}
              >
                <div className="w-32 h-32 mx-auto rounded-full overflow-hidden bg-gradient-to-br from-modern-purple to-modern-cyan p-1">
                  <img 
                    src={member.image_url || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face'} 
                    alt={member.name}
                    className="w-full h-full rounded-full object-cover"
                  />
                </div>
                <motion.div
                  className="absolute inset-0 rounded-full bg-gradient-to-br from-modern-purple/20 to-modern-cyan/20 opacity-0 group-hover:opacity-100"
                  transition={{ duration: 0.3 }}
                />
              </motion.div>
              
              <h3 className="text-xl font-bold text-white mb-2">{member.name}</h3>
              <p className="text-modern-cyan font-medium mb-4">{member.role}</p>
              <p className="text-gray-300 text-sm leading-relaxed mb-6">{member.bio}</p>
              
              <div className="flex justify-center space-x-4">
                {member.linkedin_url && (
                  <motion.a
                    href={member.linkedin_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-gradient-to-br from-modern-purple to-modern-cyan rounded-full flex items-center justify-center hover:shadow-lg hover:shadow-modern-purple/30"
                    whileHover={{ scale: 1.2, rotate: 10 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Linkedin className="w-5 h-5 text-white" />
                  </motion.a>
                )}
                {member.twitter_url && (
                  <motion.a
                    href={member.twitter_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-gradient-to-br from-modern-purple to-modern-cyan rounded-full flex items-center justify-center hover:shadow-lg hover:shadow-modern-purple/30"
                    whileHover={{ scale: 1.2, rotate: -10 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Twitter className="w-5 h-5 text-white" />
                  </motion.a>
                )}
                {member.email && (
                  <motion.a
                    href={`mailto:${member.email}`}
                    className="w-10 h-10 bg-gradient-to-br from-modern-purple to-modern-cyan rounded-full flex items-center justify-center hover:shadow-lg hover:shadow-modern-purple/30"
                    whileHover={{ scale: 1.2, rotate: 10 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Mail className="w-5 h-5 text-white" />
                  </motion.a>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TeamSection;
