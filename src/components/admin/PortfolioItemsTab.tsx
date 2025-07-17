
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Plus, Edit, Trash2, Save, X } from 'lucide-react';

interface PortfolioItem {
  id?: string;
  title: string;
  description: string;
  category: string;
  image_url: string;
  project_url: string;
  github_url: string;
  tags: string[];
  featured: boolean;
  display_order: number;
  is_active: boolean;
}

export const PortfolioItemsTab = () => {
  const [items, setItems] = useState<PortfolioItem[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const emptyItem: PortfolioItem = {
    title: '',
    description: '',
    category: '',
    image_url: '',
    project_url: '',
    github_url: '',
    tags: [],
    featured: false,
    display_order: 0,
    is_active: true,
  };

  const [newItem, setNewItem] = useState<PortfolioItem>(emptyItem);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    const { data, error } = await supabase
      .from('portfolio_items')
      .select('*')
      .order('display_order', { ascending: true });

    if (error) {
      toast({
        title: "Error",
        description: "Failed to fetch portfolio items",
        variant: "destructive",
      });
    } else {
      setItems(data || []);
    }
    setLoading(false);
  };

  const saveItem = async (item: PortfolioItem) => {
    if (item.id) {
      // Update existing item
      const { error } = await supabase
        .from('portfolio_items')
        .update(item)
        .eq('id', item.id);

      if (error) {
        toast({
          title: "Error",
          description: "Failed to update portfolio item",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Success",
          description: "Portfolio item updated successfully",
        });
        setEditingId(null);
        fetchItems();
      }
    } else {
      // Add new item
      const { error } = await supabase
        .from('portfolio_items')
        .insert([item]);

      if (error) {
        toast({
          title: "Error",
          description: "Failed to add portfolio item",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Success",
          description: "Portfolio item added successfully",
        });
        setShowAddForm(false);
        setNewItem(emptyItem);
        fetchItems();
      }
    }
  };

  const deleteItem = async (id: string) => {
    const { error } = await supabase
      .from('portfolio_items')
      .delete()
      .eq('id', id);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to delete portfolio item",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Success",
        description: "Portfolio item deleted successfully",
      });
      fetchItems();
    }
  };

  const ItemForm = ({ item, onSave, onCancel }: { item: PortfolioItem; onSave: (item: PortfolioItem) => void; onCancel: () => void }) => {
    const [formData, setFormData] = useState(item);

    return (
      <Card className="glass">
        <CardHeader>
          <CardTitle className="text-white">
            {item.id ? 'Edit Portfolio Item' : 'Add Portfolio Item'}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              placeholder="Title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="glass text-white"
            />
            <Input
              placeholder="Category"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="glass text-white"
            />
          </div>
          <Textarea
            placeholder="Description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="glass text-white"
          />
          <Input
            placeholder="Image URL"
            value={formData.image_url}
            onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
            className="glass text-white"
          />
          <div className="grid grid-cols-2 gap-4">
            <Input
              placeholder="Project URL"
              value={formData.project_url}
              onChange={(e) => setFormData({ ...formData, project_url: e.target.value })}
              className="glass text-white"
            />
            <Input
              placeholder="GitHub URL"
              value={formData.github_url}
              onChange={(e) => setFormData({ ...formData, github_url: e.target.value })}
              className="glass text-white"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Input
              placeholder="Tags (comma separated)"
              value={formData.tags.join(', ')}
              onChange={(e) => setFormData({ ...formData, tags: e.target.value.split(',').map(tag => tag.trim()) })}
              className="glass text-white"
            />
            <Input
              placeholder="Display Order"
              type="number"
              value={formData.display_order}
              onChange={(e) => setFormData({ ...formData, display_order: parseInt(e.target.value) })}
              className="glass text-white"
            />
          </div>
          <div className="flex items-center space-x-4">
            <label className="flex items-center space-x-2 text-white">
              <input
                type="checkbox"
                checked={formData.featured}
                onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                className="rounded"
              />
              <span>Featured</span>
            </label>
            <label className="flex items-center space-x-2 text-white">
              <input
                type="checkbox"
                checked={formData.is_active}
                onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                className="rounded"
              />
              <span>Active</span>
            </label>
          </div>
          <div className="flex gap-2">
            <Button
              onClick={() => onSave(formData)}
              className="bg-gradient-to-r from-modern-purple to-modern-cyan text-white"
            >
              <Save className="w-4 h-4 mr-2" />
              Save
            </Button>
            <Button
              onClick={onCancel}
              variant="outline"
              className="text-white border-white hover:bg-white/10"
            >
              <X className="w-4 h-4 mr-2" />
              Cancel
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  };

  if (loading) {
    return <div className="text-white">Loading portfolio items...</div>;
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Portfolio Items ({items.length})</h2>
        <Button
          onClick={() => setShowAddForm(true)}
          className="bg-gradient-to-r from-modern-purple to-modern-cyan text-white"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Item
        </Button>
      </div>

      {showAddForm && (
        <ItemForm
          item={newItem}
          onSave={saveItem}
          onCancel={() => {
            setShowAddForm(false);
            setNewItem(emptyItem);
          }}
        />
      )}

      <div className="grid gap-4">
        {items.map((item) => (
          <div key={item.id}>
            {editingId === item.id ? (
              <ItemForm
                item={item}
                onSave={saveItem}
                onCancel={() => setEditingId(null)}
              />
            ) : (
              <Card className="glass">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                    <div className="flex gap-4">
                      {item.image_url && (
                        <img
                          src={item.image_url}
                          alt={item.title}
                          className="w-20 h-20 rounded-lg object-cover"
                        />
                      )}
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="text-xl font-bold text-white">{item.title}</h3>
                          {item.featured && <Badge variant="secondary">Featured</Badge>}
                          <Badge variant="outline" className="text-white border-white">
                            {item.category}
                          </Badge>
                        </div>
                        <p className="text-gray-300 text-sm mb-2">{item.description}</p>
                        <div className="flex flex-wrap gap-1 mb-2">
                          {item.tags.map((tag, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                        <p className="text-gray-400 text-sm">Order: {item.display_order}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        onClick={() => setEditingId(item.id!)}
                        size="sm"
                        variant="outline"
                        className="text-white border-white hover:bg-white/10"
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        onClick={() => deleteItem(item.id!)}
                        size="sm"
                        variant="destructive"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
