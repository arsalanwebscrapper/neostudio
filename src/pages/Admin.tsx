
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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 relative overflow-hidden">
      {/* Modern background texture */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            radial-gradient(circle at 20% 50%, rgba(59, 130, 246, 0.4) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(139, 92, 246, 0.4) 0%, transparent 50%),
            radial-gradient(circle at 40% 80%, rgba(6, 182, 212, 0.4) 0%, transparent 50%)
          `,
          backgroundSize: '200px 200px, 300px 300px, 150px 150px'
        }} />
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(45deg, rgba(30, 41, 59, 0.8) 25%, transparent 25%), 
                           linear-gradient(-45deg, rgba(30, 41, 59, 0.8) 25%, transparent 25%), 
                           linear-gradient(45deg, transparent 75%, rgba(30, 41, 59, 0.8) 75%), 
                           linear-gradient(-45deg, transparent 75%, rgba(30, 41, 59, 0.8) 75%)`,
          backgroundSize: '30px 30px',
          backgroundPosition: '0 0, 0 15px, 15px -15px, -15px 0px'
        }} />
      </div>

      {/* Header */}
      <header className="border-b border-slate-700/50 bg-slate-800/30 backdrop-blur-xl shadow-2xl relative z-10">
        <div className="container mx-auto px-6 py-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-6">
              <h1 className="text-3xl font-bold text-white tracking-tight">
                <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                  Admin Dashboard
                </span>
              </h1>
              <Link 
                to="/" 
                className="flex items-center text-slate-300 hover:text-cyan-400 transition-all duration-300 px-3 py-2 rounded-lg hover:bg-slate-700/50"
                data-cursor-hover
              >
                <Home className="w-5 h-5 mr-2" />
                <span className="font-medium">View Site</span>
              </Link>
            </div>
            <Button 
              onClick={handleLogout} 
              variant="outline" 
              size="sm"
              className="border-slate-600/50 text-slate-300 hover:text-white hover:bg-red-500/20 hover:border-red-500/50 transition-all duration-300"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8 relative z-10">
        <Tabs defaultValue="contacts" className="space-y-8">
          <TabsList className="bg-slate-800/40 border border-slate-700/50 p-2 rounded-xl backdrop-blur-xl grid grid-cols-5 gap-2">
            <TabsTrigger 
              value="contacts" 
              className="flex items-center space-x-2 text-slate-300 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-purple-600 data-[state=active]:text-white rounded-lg py-3 px-4 transition-all duration-300 hover:bg-slate-700/50"
            >
              <MessageSquare className="w-4 h-4" />
              <span className="font-medium">Messages</span>
            </TabsTrigger>
            <TabsTrigger 
              value="team" 
              className="flex items-center space-x-2 text-slate-300 data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-pink-600 data-[state=active]:text-white rounded-lg py-3 px-4 transition-all duration-300 hover:bg-slate-700/50"
            >
              <Users className="w-4 h-4" />
              <span className="font-medium">Team</span>
            </TabsTrigger>
            <TabsTrigger 
              value="portfolio" 
              className="flex items-center space-x-2 text-slate-300 data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-600 data-[state=active]:to-blue-600 data-[state=active]:text-white rounded-lg py-3 px-4 transition-all duration-300 hover:bg-slate-700/50"
            >
              <Briefcase className="w-4 h-4" />
              <span className="font-medium">Portfolio</span>
            </TabsTrigger>
            <TabsTrigger 
              value="services" 
              className="flex items-center space-x-2 text-slate-300 data-[state=active]:bg-gradient-to-r data-[state=active]:from-emerald-600 data-[state=active]:to-cyan-600 data-[state=active]:text-white rounded-lg py-3 px-4 transition-all duration-300 hover:bg-slate-700/50"
            >
              <Wrench className="w-4 h-4" />
              <span className="font-medium">Services</span>
            </TabsTrigger>
            <TabsTrigger 
              value="settings" 
              className="flex items-center space-x-2 text-slate-300 data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-600 data-[state=active]:to-red-600 data-[state=active]:text-white rounded-lg py-3 px-4 transition-all duration-300 hover:bg-slate-700/50"
            >
              <Settings className="w-4 h-4" />
              <span className="font-medium">Settings</span>
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
            <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-slate-100">Website Settings</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-300">Advanced settings panel coming soon...</p>
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
