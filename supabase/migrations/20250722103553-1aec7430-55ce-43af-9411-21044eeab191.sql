-- Create services table
CREATE TABLE public.services (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  icon TEXT NOT NULL,
  color TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;

-- Create policies for services (allowing public read access and admin write access)
CREATE POLICY "Services are viewable by everyone" 
ON public.services 
FOR SELECT 
USING (true);

CREATE POLICY "Authenticated users can create services" 
ON public.services 
FOR INSERT 
WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can update services" 
ON public.services 
FOR UPDATE 
USING (auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can delete services" 
ON public.services 
FOR DELETE 
USING (auth.uid() IS NOT NULL);

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_services_updated_at
BEFORE UPDATE ON public.services
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert default services data
INSERT INTO public.services (title, description, icon, color) VALUES
('Brand Design', 'Creating stunning visual identities that capture your brand''s essence and resonate with your audience.', 'Palette', 'from-modern-purple to-modern-pink'),
('Digital Strategy', 'Data-driven strategies that propel your business forward in the digital landscape.', 'TrendingUp', 'from-modern-blue to-modern-cyan'),
('Web Development', 'Building fast, responsive, and user-friendly websites that convert visitors into customers.', 'Code', 'from-modern-cyan to-modern-blue'),
('Social Media Marketing', 'Engaging social media campaigns that build communities and drive brand awareness.', 'Megaphone', 'from-modern-orange to-modern-pink'),
('SEO Optimization', 'Improving your search engine rankings to increase visibility and organic traffic.', 'Search', 'from-modern-purple to-modern-cyan'),
('Analytics & Insights', 'Comprehensive analytics and reporting to measure success and optimize performance.', 'BarChart3', 'from-modern-cyan to-modern-purple');