
-- Create contact_messages table to store form submissions
CREATE TABLE public.contact_messages (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'unread' CHECK (status IN ('unread', 'read', 'responded')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create team_members table to manage team data
CREATE TABLE public.team_members (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  bio TEXT,
  image_url TEXT,
  email TEXT,
  linkedin_url TEXT,
  twitter_url TEXT,
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create portfolio_items table to manage portfolio projects
CREATE TABLE public.portfolio_items (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL,
  image_url TEXT,
  project_url TEXT,
  github_url TEXT,
  tags TEXT[] DEFAULT '{}',
  featured BOOLEAN DEFAULT false,
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.portfolio_items ENABLE ROW LEVEL SECURITY;

-- Contact messages policies (admin access only for management)
CREATE POLICY "Allow public to insert contact messages" 
  ON public.contact_messages 
  FOR INSERT 
  WITH CHECK (true);

CREATE POLICY "Allow authenticated users to view contact messages" 
  ON public.contact_messages 
  FOR SELECT 
  TO authenticated
  USING (true);

CREATE POLICY "Allow authenticated users to update contact messages" 
  ON public.contact_messages 
  FOR UPDATE 
  TO authenticated
  USING (true);

-- Team members policies (public read, authenticated write)
CREATE POLICY "Allow public to view active team members" 
  ON public.team_members 
  FOR SELECT 
  USING (is_active = true);

CREATE POLICY "Allow authenticated users to manage team members" 
  ON public.team_members 
  FOR ALL 
  TO authenticated
  USING (true);

-- Portfolio items policies (public read, authenticated write)
CREATE POLICY "Allow public to view active portfolio items" 
  ON public.portfolio_items 
  FOR SELECT 
  USING (is_active = true);

CREATE POLICY "Allow authenticated users to manage portfolio items" 
  ON public.portfolio_items 
  FOR ALL 
  TO authenticated
  USING (true);

-- Insert some sample data for team members
INSERT INTO public.team_members (name, role, bio, image_url, display_order) VALUES
('Sarah Johnson', 'Creative Director', 'Leading creative vision with 10+ years in digital marketing', 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&h=300&fit=crop&crop=face', 1),
('Michael Chen', 'Strategy Lead', 'Expert in data-driven marketing strategies and growth', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face', 2),
('Emily Rodriguez', 'Design Director', 'Award-winning designer with a passion for user experience', 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face', 3),
('David Thompson', 'Tech Lead', 'Full-stack developer and technical architecture specialist', 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face', 4);

-- Insert some sample portfolio data
INSERT INTO public.portfolio_items (title, description, category, image_url, tags, featured, display_order) VALUES
('TechCorp Website', 'Modern corporate website with sleek design', 'web', 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop', '{"React", "UI/UX", "Responsive"}', true, 1),
('FoodieApp Mobile', 'Food delivery app with intuitive interface', 'mobile', 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&h=400&fit=crop', '{"React Native", "Mobile UI", "API"}', true, 2),
('Brand Identity Suite', 'Complete brand identity for startup', 'branding', 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&h=400&fit=crop', '{"Logo Design", "Brand Guidelines", "Print"}', false, 3),
('E-Shop Platform', 'Full-featured e-commerce platform', 'ecommerce', 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop', '{"E-commerce", "Payment Gateway", "Admin Panel"}', true, 4),
('Portfolio Website', 'Creative portfolio for digital artist', 'web', 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=600&h=400&fit=crop', '{"Portfolio", "Gallery", "Animation"}', false, 5),
('FinTech Dashboard', 'Advanced analytics dashboard', 'web', 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop', '{"Dashboard", "Data Viz", "FinTech"}', false, 6);
