import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Trash2, Edit3, Plus, Save, X } from 'lucide-react';

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
    try {
      const { data, error } = await supabase
        .from('services')
        .insert([newService])
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
      <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm">
        <CardContent className="p-6">
          <div className="text-slate-300">Loading services...</div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-slate-100">Services Management</CardTitle>
          <Button
            onClick={() => setShowNewForm(true)}
            className="bg-cyan-600 hover:bg-cyan-700 text-white"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Service
          </Button>
        </CardHeader>
        <CardContent>
          {showNewForm && (
            <Card className="mb-6 bg-slate-700/50 border-slate-600/50">
              <CardHeader>
                <CardTitle className="text-slate-100 text-lg">Add New Service</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Input
                  placeholder="Service title"
                  value={newService.title || ''}
                  onChange={(e) => setNewService(prev => ({ ...prev, title: e.target.value }))}
                  className="bg-slate-600/50 border-slate-500/50 text-slate-100 placeholder:text-slate-400"
                />
                <Textarea
                  placeholder="Service description"
                  value={newService.description || ''}
                  onChange={(e) => setNewService(prev => ({ ...prev, description: e.target.value }))}
                  className="bg-slate-600/50 border-slate-500/50 text-slate-100 placeholder:text-slate-400"
                />
                <Input
                  placeholder="Icon name (e.g., Palette, Code, TrendingUp)"
                  value={newService.icon || ''}
                  onChange={(e) => setNewService(prev => ({ ...prev, icon: e.target.value }))}
                  className="bg-slate-600/50 border-slate-500/50 text-slate-100 placeholder:text-slate-400"
                />
                <Input
                  placeholder="Gradient color (e.g., from-purple-500 to-cyan-500)"
                  value={newService.color || ''}
                  onChange={(e) => setNewService(prev => ({ ...prev, color: e.target.value }))}
                  className="bg-slate-600/50 border-slate-500/50 text-slate-100 placeholder:text-slate-400"
                />
                <div className="flex space-x-2">
                  <Button onClick={createService} className="bg-emerald-600 hover:bg-emerald-700">
                    <Save className="w-4 h-4 mr-2" />
                    Save
                  </Button>
                  <Button 
                    onClick={() => setShowNewForm(false)} 
                    variant="outline"
                    className="border-slate-500 text-slate-300 hover:bg-slate-600"
                  >
                    <X className="w-4 h-4 mr-2" />
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          <div className="grid gap-4">
            {services.map((service) => (
              <Card key={service.id} className="bg-slate-700/30 border-slate-600/50">
                <CardContent className="p-4">
                  {editingService?.id === service.id ? (
                    <div className="space-y-4">
                      <Input
                        value={editingService.title}
                        onChange={(e) => setEditingService(prev => prev ? { ...prev, title: e.target.value } : null)}
                        className="bg-slate-600/50 border-slate-500/50 text-slate-100"
                      />
                      <Textarea
                        value={editingService.description}
                        onChange={(e) => setEditingService(prev => prev ? { ...prev, description: e.target.value } : null)}
                        className="bg-slate-600/50 border-slate-500/50 text-slate-100"
                      />
                      <Input
                        value={editingService.icon}
                        onChange={(e) => setEditingService(prev => prev ? { ...prev, icon: e.target.value } : null)}
                        className="bg-slate-600/50 border-slate-500/50 text-slate-100"
                      />
                      <Input
                        value={editingService.color}
                        onChange={(e) => setEditingService(prev => prev ? { ...prev, color: e.target.value } : null)}
                        className="bg-slate-600/50 border-slate-500/50 text-slate-100"
                      />
                      <div className="flex space-x-2">
                        <Button onClick={updateService} size="sm" className="bg-emerald-600 hover:bg-emerald-700">
                          <Save className="w-4 h-4 mr-2" />
                          Save
                        </Button>
                        <Button 
                          onClick={() => setEditingService(null)} 
                          size="sm" 
                          variant="outline"
                          className="border-slate-500 text-slate-300 hover:bg-slate-600"
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="font-semibold text-slate-100">{service.title}</h3>
                          <Badge variant="outline" className="border-cyan-500/50 text-cyan-400">
                            {service.icon}
                          </Badge>
                        </div>
                        <p className="text-slate-300 text-sm mb-2">{service.description}</p>
                        <Badge variant="outline" className="border-purple-500/50 text-purple-400">
                          {service.color}
                        </Badge>
                      </div>
                      <div className="flex space-x-2 ml-4">
                        <Button
                          onClick={() => setEditingService(service)}
                          size="sm"
                          variant="outline"
                          className="border-blue-500/50 text-blue-400 hover:bg-blue-500/20"
                        >
                          <Edit3 className="w-4 h-4" />
                        </Button>
                        <Button
                          onClick={() => deleteService(service.id)}
                          size="sm"
                          variant="outline"
                          className="border-red-500/50 text-red-400 hover:bg-red-500/20"
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
            <div className="text-center py-8 text-slate-400">
              No services found. Create your first service to get started.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};