
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ContactMessagesTab } from '@/components/admin/ContactMessagesTab';
import { TeamMembersTab } from '@/components/admin/TeamMembersTab';
import { PortfolioItemsTab } from '@/components/admin/PortfolioItemsTab';
import { ServicesTab } from '@/components/admin/ServicesTab';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { LogOut, Home, Users, MessageSquare, Briefcase, Settings, Wrench } from 'lucide-react';
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
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center">
        <div className="glass rounded-2xl p-8 bg-slate-800/30 border-slate-700/50">
          <div className="text-white text-xl font-semibold">Loading...</div>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center p-4 relative overflow-hidden">
        {/* Modern background texture */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, rgba(59, 130, 246, 0.3) 0%, transparent 50%), 
                             radial-gradient(circle at 75% 75%, rgba(139, 92, 246, 0.3) 0%, transparent 50%)`,
            backgroundSize: '100px 100px'
          }} />
        </div>
        <Card className="w-full max-w-md glass bg-slate-800/40 border-slate-700/50 shadow-2xl backdrop-blur-xl relative z-10">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-white">Admin Access</CardTitle>
            <p className="text-slate-300">Secure Dashboard Login</p>
          </CardHeader>
          <CardContent>
            <LoginForm />
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen gradient-admin relative overflow-hidden">
      {/* Sophisticated background patterns */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            radial-gradient(circle at 25% 25%, rgba(59, 130, 246, 0.6) 0%, transparent 50%),
            radial-gradient(circle at 75% 25%, rgba(139, 92, 246, 0.6) 0%, transparent 50%),
            radial-gradient(circle at 25% 75%, rgba(6, 182, 212, 0.6) 0%, transparent 50%),
            radial-gradient(circle at 75% 75%, rgba(16, 185, 129, 0.6) 0%, transparent 50%)
          `,
          backgroundSize: '400px 400px, 350px 350px, 300px 300px, 450px 450px',
          backgroundPosition: '0 0, 100% 0, 0 100%, 100% 100%'
        }} />
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(45deg, rgba(15, 23, 42, 0.9) 25%, transparent 25%), 
            linear-gradient(-45deg, rgba(15, 23, 42, 0.9) 25%, transparent 25%), 
            linear-gradient(45deg, transparent 75%, rgba(15, 23, 42, 0.9) 75%), 
            linear-gradient(-45deg, transparent 75%, rgba(15, 23, 42, 0.9) 75%)
          `,
          backgroundSize: '60px 60px',
          backgroundPosition: '0 0, 0 30px, 30px -30px, -30px 0px'
        }} />
      </div>

      {/* Modern header */}
      <header className="border-b border-slate-800/50 glass-admin relative z-10">
        <div className="container mx-auto px-6 py-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-8">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg flex items-center justify-center">
                  <Settings className="w-6 h-6 text-white" />
                </div>
                <h1 className="text-3xl font-bold">
                  <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                    Admin Dashboard
                  </span>
                </h1>
              </div>
              <Link 
                to="/" 
                className="flex items-center text-slate-400 hover:text-cyan-400 transition-all duration-300 px-4 py-2 rounded-lg hover:bg-slate-800/30 glass-card"
                data-cursor-hover
              >
                <Home className="w-5 h-5 mr-2" />
                <span className="font-medium">View Website</span>
              </Link>
            </div>
            <Button 
              onClick={handleLogout} 
              variant="outline" 
              size="sm"
              className="border-red-500/30 text-red-400 hover:text-white hover:bg-red-500/20 hover:border-red-400 transition-all duration-300"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-12 relative z-10">
        {/* Welcome Section */}
        <div className="mb-12">
          <div className="glass-card rounded-2xl p-8 shadow-professional-lg">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-white mb-2">
                  Welcome back, Administrator
                </h2>
                <p className="text-slate-400">
                  Manage your website content and monitor performance
                </p>
              </div>
              <div className="flex space-x-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-cyan-400">24</div>
                  <div className="text-sm text-slate-500">Active Items</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-400">12</div>
                  <div className="text-sm text-slate-500">New Messages</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-400">98%</div>
                  <div className="text-sm text-slate-500">Uptime</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Tabs defaultValue="contacts" className="space-y-8">
          <TabsList className="glass-card p-2 rounded-xl grid grid-cols-5 gap-2 shadow-professional">
            <TabsTrigger 
              value="contacts" 
              className="flex items-center space-x-3 text-slate-400 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-purple-600 data-[state=active]:text-white rounded-lg py-4 px-6 transition-all duration-300 hover:bg-slate-700/30 font-medium"
            >
              <MessageSquare className="w-5 h-5" />
              <span>Messages</span>
            </TabsTrigger>
            <TabsTrigger 
              value="team" 
              className="flex items-center space-x-3 text-slate-400 data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-pink-600 data-[state=active]:text-white rounded-lg py-4 px-6 transition-all duration-300 hover:bg-slate-700/30 font-medium"
            >
              <Users className="w-5 h-5" />
              <span>Team</span>
            </TabsTrigger>
            <TabsTrigger 
              value="portfolio" 
              className="flex items-center space-x-3 text-slate-400 data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-600 data-[state=active]:to-blue-600 data-[state=active]:text-white rounded-lg py-4 px-6 transition-all duration-300 hover:bg-slate-700/30 font-medium"
            >
              <Briefcase className="w-5 h-5" />
              <span>Portfolio</span>
            </TabsTrigger>
            <TabsTrigger 
              value="services" 
              className="flex items-center space-x-3 text-slate-400 data-[state=active]:bg-gradient-to-r data-[state=active]:from-emerald-600 data-[state=active]:to-cyan-600 data-[state=active]:text-white rounded-lg py-4 px-6 transition-all duration-300 hover:bg-slate-700/30 font-medium"
            >
              <Wrench className="w-5 h-5" />
              <span>Services</span>
            </TabsTrigger>
            <TabsTrigger 
              value="settings" 
              className="flex items-center space-x-3 text-slate-400 data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-600 data-[state=active]:to-red-600 data-[state=active]:text-white rounded-lg py-4 px-6 transition-all duration-300 hover:bg-slate-700/30 font-medium"
            >
              <Settings className="w-5 h-5" />
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

          <TabsContent value="services" className="space-y-6">
            <ServicesTab />
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <Card className="glass-card border-slate-700/30 shadow-professional">
              <CardHeader>
                <CardTitle className="text-slate-100 text-xl">Website Configuration</CardTitle>
                <p className="text-slate-400">Manage global website settings and preferences</p>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="font-semibold text-white">General Settings</h3>
                    <div className="space-y-2">
                      <label className="text-sm text-slate-400">Site Title</label>
                      <Input 
                        value="NeoStudio" 
                        className="bg-slate-800/50 border-slate-600/50 text-white"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm text-slate-400">Contact Email</label>
                      <Input 
                        value="hello@neostudio.com" 
                        className="bg-slate-800/50 border-slate-600/50 text-white"
                      />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h3 className="font-semibold text-white">Appearance</h3>
                    <div className="space-y-2">
                      <label className="text-sm text-slate-400">Theme Mode</label>
                      <Button variant="outline" className="w-full justify-start">
                        Dark Mode (Current)
                      </Button>
                    </div>
                  </div>
                </div>
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
          className="w-full bg-slate-700/50 border-slate-600/50 text-white placeholder:text-slate-400 focus:border-cyan-400 transition-colors duration-300"
        />
      </div>
      <div className="space-y-2">
        <Input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full bg-slate-700/50 border-slate-600/50 text-white placeholder:text-slate-400 focus:border-cyan-400 transition-colors duration-300"
        />
      </div>
      <Button
        type="submit"
        disabled={loading}
        className="w-full bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 text-white hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-purple-500/25"
      >
        {loading ? 'Logging in...' : 'Login'}
      </Button>
    </form>
  );
};

export default Admin;
