
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Plus, Edit, Trash2, Save, X } from 'lucide-react';

interface TeamMember {
  id?: string;
  name: string;
  role: string;
  bio: string;
  image_url: string;
  email: string;
  linkedin_url: string;
  twitter_url: string;
  display_order: number;
  is_active: boolean;
}

export const TeamMembersTab = () => {
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const emptyMember: TeamMember = {
    name: '',
    role: '',
    bio: '',
    image_url: '',
    email: '',
    linkedin_url: '',
    twitter_url: '',
    display_order: 0,
    is_active: true,
  };

  const [newMember, setNewMember] = useState<TeamMember>(emptyMember);

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    const { data, error } = await supabase
      .from('team_members')
      .select('*')
      .order('display_order', { ascending: true });

    if (error) {
      toast({
        title: "Error",
        description: "Failed to fetch team members",
        variant: "destructive",
      });
    } else {
      setMembers(data || []);
    }
    setLoading(false);
  };

  const saveMember = async (member: TeamMember) => {
    if (member.id) {
      // Update existing member
      const { error } = await supabase
        .from('team_members')
        .update(member)
        .eq('id', member.id);

      if (error) {
        toast({
          title: "Error",
          description: "Failed to update team member",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Success",
          description: "Team member updated successfully",
        });
        setEditingId(null);
        fetchMembers();
      }
    } else {
      // Add new member
      const { error } = await supabase
        .from('team_members')
        .insert([member]);

      if (error) {
        toast({
          title: "Error",
          description: "Failed to add team member",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Success",
          description: "Team member added successfully",
        });
        setShowAddForm(false);
        setNewMember(emptyMember);
        fetchMembers();
      }
    }
  };

  const deleteMember = async (id: string) => {
    const { error } = await supabase
      .from('team_members')
      .delete()
      .eq('id', id);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to delete team member",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Success",
        description: "Team member deleted successfully",
      });
      fetchMembers();
    }
  };

  const MemberForm = ({ member, onSave, onCancel }: { member: TeamMember; onSave: (member: TeamMember) => void; onCancel: () => void }) => {
    const [formData, setFormData] = useState(member);

    return (
      <Card className="glass">
        <CardHeader>
          <CardTitle className="text-white">
            {member.id ? 'Edit Team Member' : 'Add Team Member'}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              placeholder="Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="glass text-white"
            />
            <Input
              placeholder="Role"
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              className="glass text-white"
            />
          </div>
          <Textarea
            placeholder="Bio"
            value={formData.bio}
            onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
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
              placeholder="Email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
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
          <div className="grid grid-cols-2 gap-4">
            <Input
              placeholder="LinkedIn URL"
              value={formData.linkedin_url}
              onChange={(e) => setFormData({ ...formData, linkedin_url: e.target.value })}
              className="glass text-white"
            />
            <Input
              placeholder="Twitter URL"
              value={formData.twitter_url}
              onChange={(e) => setFormData({ ...formData, twitter_url: e.target.value })}
              className="glass text-white"
            />
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
    return <div className="text-white">Loading team members...</div>;
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Team Members ({members.length})</h2>
        <Button
          onClick={() => setShowAddForm(true)}
          className="bg-gradient-to-r from-modern-purple to-modern-cyan text-white"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Member
        </Button>
      </div>

      {showAddForm && (
        <MemberForm
          member={newMember}
          onSave={saveMember}
          onCancel={() => {
            setShowAddForm(false);
            setNewMember(emptyMember);
          }}
        />
      )}

      <div className="grid gap-4">
        {members.map((member) => (
          <div key={member.id}>
            {editingId === member.id ? (
              <MemberForm
                member={member}
                onSave={saveMember}
                onCancel={() => setEditingId(null)}
              />
            ) : (
              <Card className="glass">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                    <div className="flex gap-4">
                      {member.image_url && (
                        <img
                          src={member.image_url}
                          alt={member.name}
                          className="w-16 h-16 rounded-full object-cover"
                        />
                      )}
                      <div>
                        <h3 className="text-xl font-bold text-white">{member.name}</h3>
                        <p className="text-modern-cyan">{member.role}</p>
                        <p className="text-gray-300 text-sm mt-2">{member.bio}</p>
                        <p className="text-gray-400 text-sm">Order: {member.display_order}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        onClick={() => setEditingId(member.id!)}
                        size="sm"
                        variant="outline"
                        className="text-white border-white hover:bg-white/10"
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        onClick={() => deleteMember(member.id!)}
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
