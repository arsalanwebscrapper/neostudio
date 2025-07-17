
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Eye, MessageSquare, Trash2 } from 'lucide-react';

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: string;
  created_at: string;
}

export const ContactMessagesTab = () => {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    const { data, error } = await supabase
      .from('contact_messages')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      toast({
        title: "Error",
        description: "Failed to fetch messages",
        variant: "destructive",
      });
    } else {
      setMessages(data || []);
    }
    setLoading(false);
  };

  const updateStatus = async (id: string, status: string) => {
    const { error } = await supabase
      .from('contact_messages')
      .update({ status })
      .eq('id', id);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to update status",
        variant: "destructive",
      });
    } else {
      fetchMessages();
      toast({
        title: "Success",
        description: "Status updated successfully",
      });
    }
  };

  const deleteMessage = async (id: string) => {
    const { error } = await supabase
      .from('contact_messages')
      .delete()
      .eq('id', id);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to delete message",
        variant: "destructive",
      });
    } else {
      fetchMessages();
      toast({
        title: "Success",
        description: "Message deleted successfully",
      });
    }
  };

  if (loading) {
    return <div className="text-white">Loading messages...</div>;
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Contact Messages ({messages.length})</h2>
      </div>

      <div className="grid gap-4">
        {messages.map((message) => (
          <Card key={message.id} className="glass">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-white">{message.subject}</CardTitle>
                  <p className="text-gray-300">From: {message.name} ({message.email})</p>
                  <p className="text-gray-400 text-sm">
                    {new Date(message.created_at).toLocaleDateString()}
                  </p>
                </div>
                <Badge variant={message.status === 'unread' ? 'destructive' : 'secondary'}>
                  {message.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300 mb-4">{message.message}</p>
              <div className="flex gap-2">
                <Button
                  onClick={() => updateStatus(message.id, 'read')}
                  size="sm"
                  variant="outline"
                  className="text-white border-white hover:bg-white/10"
                >
                  <Eye className="w-4 h-4 mr-2" />
                  Mark as Read
                </Button>
                <Button
                  onClick={() => updateStatus(message.id, 'responded')}
                  size="sm"
                  variant="outline"
                  className="text-white border-white hover:bg-white/10"
                >
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Mark as Responded
                </Button>
                <Button
                  onClick={() => deleteMessage(message.id)}
                  size="sm"
                  variant="destructive"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
