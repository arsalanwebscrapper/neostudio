import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Trash2, Edit3, Plus, Save, X, Palette, Code, TrendingUp } from 'lucide-react';

interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  created_at?: string;
}

export const ServicesTab = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [newService, setNewService] = useState<Partial<Service>>({});
  const [showNewForm, setShowNewForm] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setServices(data || []);
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to fetch services",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const createService = async () => {
    if (!newService.title || !newService.description || !newService.icon || !newService.color) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    try {
      const serviceData = {
        title: newService.title!,
        description: newService.description!,
        icon: newService.icon!,
        color: newService.color!
      };

      const { data, error } = await supabase
        .from('services')
        .insert([serviceData])
        .select()
        .single();

      if (error) throw error;

      setServices(prev => [data, ...prev]);
      setNewService({});
      setShowNewForm(false);
      
      toast({
        title: "Success",
        description: "Service created successfully",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const updateService = async () => {
    if (!editingService) return;

    try {
      const { error } = await supabase
        .from('services')
        .update(editingService)
        .eq('id', editingService.id);

      if (error) throw error;

      setServices(prev => 
        prev.map(service => 
          service.id === editingService.id ? editingService : service
        )
      );
      setEditingService(null);
      
      toast({
        title: "Success",
        description: "Service updated successfully",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const deleteService = async (id: string) => {
    try {
      const { error } = await supabase
        .from('services')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setServices(prev => prev.filter(service => service.id !== id));
      
      toast({
        title: "Success",
        description: "Service deleted successfully",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return (
      <Card className="glass-card border-slate-700/30 shadow-professional">
        <CardContent className="p-8">
          <div className="flex items-center justify-center space-x-3">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-cyan-400"></div>
            <div className="text-slate-300 font-medium">Loading services...</div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-8">
      <Card className="glass-card border-slate-700/30 shadow-professional">
        <CardHeader className="flex flex-row items-center justify-between pb-4">
          <div>
            <CardTitle className="text-slate-100 text-2xl">Services Management</CardTitle>
            <p className="text-slate-400 mt-1">Manage website services that appear on the homepage</p>
          </div>
          <Button
            onClick={() => setShowNewForm(true)}
            variant="admin"
            className="shadow-lg hover:shadow-cyan-500/25"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Service
          </Button>
        </CardHeader>
        <CardContent className="space-y-6">
          {showNewForm && (
            <Card className="glass-card border-cyan-500/20 shadow-professional">
              <CardHeader>
                <CardTitle className="text-slate-100 text-lg flex items-center">
                  <Plus className="w-5 h-5 mr-2 text-cyan-400" />
                  Add New Service
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    placeholder="Service title"
                    value={newService.title || ''}
                    onChange={(e) => setNewService(prev => ({ ...prev, title: e.target.value }))}
                    className="bg-slate-800/50 border-slate-600/50 text-slate-100 placeholder:text-slate-400 focus:border-cyan-400"
                  />
                  <Input
                    placeholder="Icon name (e.g., Palette, Code, TrendingUp)"
                    value={newService.icon || ''}
                    onChange={(e) => setNewService(prev => ({ ...prev, icon: e.target.value }))}
                    className="bg-slate-800/50 border-slate-600/50 text-slate-100 placeholder:text-slate-400 focus:border-cyan-400"
                  />
                </div>
                <Textarea
                  placeholder="Service description"
                  value={newService.description || ''}
                  onChange={(e) => setNewService(prev => ({ ...prev, description: e.target.value }))}
                  className="bg-slate-800/50 border-slate-600/50 text-slate-100 placeholder:text-slate-400 focus:border-cyan-400"
                  rows={3}
                />
                <Input
                  placeholder="Gradient color (e.g., from-purple-500 to-cyan-500)"
                  value={newService.color || ''}
                  onChange={(e) => setNewService(prev => ({ ...prev, color: e.target.value }))}
                  className="bg-slate-800/50 border-slate-600/50 text-slate-100 placeholder:text-slate-400 focus:border-cyan-400"
                />
                <div className="flex space-x-3">
                  <Button onClick={createService} variant="success" className="shadow-lg">
                    <Save className="w-4 h-4 mr-2" />
                    Save Service
                  </Button>
                  <Button 
                    onClick={() => setShowNewForm(false)} 
                    variant="outline"
                    className="border-slate-600 text-slate-300 hover:bg-slate-700"
                  >
                    <X className="w-4 h-4 mr-2" />
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          <div className="grid gap-6">
            {services.map((service) => (
              <Card key={service.id} className="glass-card border-slate-700/30 hover:border-slate-600/50 transition-all duration-300 shadow-professional">
                <CardContent className="p-6">
                  {editingService?.id === service.id ? (
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Input
                          value={editingService.title}
                          onChange={(e) => setEditingService(prev => prev ? { ...prev, title: e.target.value } : null)}
                          className="bg-slate-800/50 border-slate-600/50 text-slate-100 focus:border-cyan-400"
                        />
                        <Input
                          value={editingService.icon}
                          onChange={(e) => setEditingService(prev => prev ? { ...prev, icon: e.target.value } : null)}
                          className="bg-slate-800/50 border-slate-600/50 text-slate-100 focus:border-cyan-400"
                        />
                      </div>
                      <Textarea
                        value={editingService.description}
                        onChange={(e) => setEditingService(prev => prev ? { ...prev, description: e.target.value } : null)}
                        className="bg-slate-800/50 border-slate-600/50 text-slate-100 focus:border-cyan-400"
                        rows={3}
                      />
                      <Input
                        value={editingService.color}
                        onChange={(e) => setEditingService(prev => prev ? { ...prev, color: e.target.value } : null)}
                        className="bg-slate-800/50 border-slate-600/50 text-slate-100 focus:border-cyan-400"
                      />
                      <div className="flex space-x-3">
                        <Button onClick={updateService} variant="success" size="sm" className="shadow-lg">
                          <Save className="w-4 h-4 mr-2" />
                          Save Changes
                        </Button>
                        <Button 
                          onClick={() => setEditingService(null)} 
                          size="sm" 
                          variant="outline"
                          className="border-slate-600 text-slate-300 hover:bg-slate-700"
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center space-x-4 mb-3">
                          <h3 className="font-semibold text-slate-100 text-lg">{service.title}</h3>
                          <div className="flex space-x-2">
                            <Badge variant="outline" className="border-cyan-500/50 text-cyan-400 bg-cyan-500/10">
                              {service.icon}
                            </Badge>
                            <Badge variant="outline" className="border-purple-500/50 text-purple-400 bg-purple-500/10">
                              {service.color.replace('from-', '').replace('to-', '').split(' ')[0]}
                            </Badge>
                          </div>
                        </div>
                        <p className="text-slate-300 text-sm mb-3 leading-relaxed">{service.description}</p>
                        <div className="text-xs text-slate-500">
                          Created: {new Date(service.created_at || '').toLocaleDateString()}
                        </div>
                      </div>
                      <div className="flex space-x-2 ml-6">
                        <Button
                          onClick={() => setEditingService(service)}
                          size="sm"
                          variant="outline"
                          className="border-blue-500/50 text-blue-400 hover:bg-blue-500/20 shadow-sm"
                        >
                          <Edit3 className="w-4 h-4" />
                        </Button>
                        <Button
                          onClick={() => deleteService(service.id)}
                          size="sm"
                          variant="outline"
                          className="border-red-500/50 text-red-400 hover:bg-red-500/20 shadow-sm"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          {services.length === 0 && (
            <div className="text-center py-12">
              <div className="flex flex-col items-center space-y-4">
                <div className="w-16 h-16 bg-slate-800/50 rounded-full flex items-center justify-center">
                  <Palette className="w-8 h-8 text-slate-500" />
                </div>
                <div className="text-slate-400 text-lg font-medium">No services found</div>
                <p className="text-slate-500 text-sm">Create your first service to get started</p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};