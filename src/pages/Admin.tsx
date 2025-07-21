
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ContactMessagesTab } from '@/components/admin/ContactMessagesTab';
import { TeamMembersTab } from '@/components/admin/TeamMembersTab';
import { PortfolioItemsTab } from '@/components/admin/PortfolioItemsTab';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { LogOut, Home, Users, MessageSquare, Briefcase, Settings } from 'lucide-react';
import { Link } from 'react-router-dom';

const Admin = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        setUser(session.user);
      }
      setLoading(false);
    };

    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast({
        title: "Error",
        description: "Failed to log out",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-modern-dark flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen gradient-modern flex items-center justify-center p-4">
        <Card className="w-full max-w-md bg-modern-dark/90 border-modern-purple/30 shadow-2xl backdrop-blur-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-white">Admin Login</CardTitle>
            <p className="text-gray-300">Access your dashboard</p>
          </CardHeader>
          <CardContent>
            <LoginForm />
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-modern-dark">
      {/* Header */}
      <header className="border-b border-modern-purple/30 bg-modern-dark/95 backdrop-blur-lg shadow-lg">
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-white">Admin Dashboard</h1>
              <Link 
                to="/" 
                className="flex items-center text-gray-300 hover:text-modern-cyan transition-colors duration-300"
                data-cursor-hover
              >
                <Home className="w-4 h-4 mr-2" />
                View Site
              </Link>
            </div>
            <Button 
              onClick={handleLogout} 
              variant="outline" 
              size="sm"
              className="border-modern-purple/50 text-gray-300 hover:text-white hover:bg-modern-purple/20 hover:border-modern-purple"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        <Tabs defaultValue="contacts" className="space-y-6">
          <TabsList className="bg-modern-dark/50 border border-modern-purple/30 p-1 rounded-lg backdrop-blur-sm">
            <TabsTrigger 
              value="contacts" 
              className="flex items-center space-x-2 text-gray-300 data-[state=active]:bg-modern-purple data-[state=active]:text-white"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Messages</span>
            </TabsTrigger>
            <TabsTrigger 
              value="team" 
              className="flex items-center space-x-2 text-gray-300 data-[state=active]:bg-modern-purple data-[state=active]:text-white"
            >
              <Users className="w-4 h-4" />
              <span>Team</span>
            </TabsTrigger>
            <TabsTrigger 
              value="portfolio" 
              className="flex items-center space-x-2 text-gray-300 data-[state=active]:bg-modern-purple data-[state=active]:text-white"
            >
              <Briefcase className="w-4 h-4" />
              <span>Portfolio</span>
            </TabsTrigger>
            <TabsTrigger 
              value="settings" 
              className="flex items-center space-x-2 text-gray-300 data-[state=active]:bg-modern-purple data-[state=active]:text-white"
            >
              <Settings className="w-4 h-4" />
              <span>Settings</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="contacts" className="space-y-6">
            <ContactMessagesTab />
          </TabsContent>

          <TabsContent value="team" className="space-y-6">
            <TeamMembersTab />
          </TabsContent>

          <TabsContent value="portfolio" className="space-y-6">
            <PortfolioItemsTab />
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <Card className="bg-modern-dark/50 border-modern-purple/30 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white">Website Settings</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300">Settings panel coming soon...</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleLogin} className="space-y-4">
      <div className="space-y-2">
        <Input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full bg-modern-dark/30 border-modern-purple/50 text-white placeholder:text-gray-400 focus:border-modern-cyan"
        />
      </div>
      <div className="space-y-2">
        <Input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full bg-modern-dark/30 border-modern-purple/50 text-white placeholder:text-gray-400 focus:border-modern-cyan"
        />
      </div>
      <Button
        type="submit"
        disabled={loading}
        className="w-full bg-gradient-to-r from-modern-purple to-modern-cyan text-white hover:scale-105 transition-transform duration-300"
      >
        {loading ? 'Logging in...' : 'Login'}
      </Button>
    </form>
  );
};

export default Admin;
