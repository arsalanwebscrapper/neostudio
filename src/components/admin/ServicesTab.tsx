import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertCircle, Database } from 'lucide-react';

export const ServicesTab = () => {
  return (
    <div className="space-y-6">
      <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-slate-100 flex items-center gap-2">
            <Database className="w-5 h-5" />
            Services Management
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <AlertCircle className="w-16 h-16 text-yellow-500 mb-4" />
            <h3 className="text-xl font-semibold text-slate-100 mb-2">
              Database Setup Required
            </h3>
            <p className="text-slate-300 mb-6 max-w-md">
              The services table needs to be created in your database before you can manage services. 
              Please approve the pending database migration to enable this feature.
            </p>
            <div className="bg-slate-700/50 border border-slate-600/50 rounded-lg p-4 text-left">
              <h4 className="text-slate-100 font-medium mb-2">Migration includes:</h4>
              <ul className="text-slate-300 text-sm space-y-1">
                <li>• Services table with title, description, icon, and color fields</li>
                <li>• Row Level Security policies for data protection</li>
                <li>• Sample service data to get you started</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};