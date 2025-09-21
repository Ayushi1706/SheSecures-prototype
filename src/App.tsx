import React, { useState, useCallback, memo, Suspense } from 'react';
import { motion } from 'motion/react';
import { Home, FileText, Shield, Users, User, Menu, Phone, MapPin, Bell, Check, AlertTriangle } from 'lucide-react';
import { Button } from './components/ui/button';
import { Card } from './components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs';
import { Input } from './components/ui/input';
import { Textarea } from './components/ui/textarea';
import { Switch } from './components/ui/switch';
import { Badge } from './components/ui/badge';
import { Alert, AlertDescription } from './components/ui/alert';
import { ImageWithFallback } from './components/figma/ImageWithFallback';
import { OnboardingFlow } from './components/OnboardingFlow';
import { IncidentReport } from './components/IncidentReport';
import { EmergencyFeatures } from './components/EmergencyFeatures';
import { DataSafetyTool } from './components/DataSafetyTool';
import { CommunityStories } from './components/CommunityStories';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [emergencyActive, setEmergencyActive] = useState(false);

  const handleOnboardingComplete = useCallback(() => {
    setShowOnboarding(false);
  }, []);

  const handleEmergencyActivate = useCallback(() => {
    setEmergencyActive(true);
  }, []);

  const handleEmergencyDeactivate = useCallback(() => {
    setEmergencyActive(false);
  }, []);

  if (showOnboarding) {
    return <OnboardingFlow onComplete={handleOnboardingComplete} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50 relative">
      {/* Emergency Overlay */}
      {emergencyActive && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-red-500 bg-opacity-90 z-50 flex flex-col items-center justify-center text-white p-6"
        >
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ repeat: Infinity, duration: 1 }}
            className="text-center"
          >
            <Shield className="w-24 h-24 mx-auto mb-4" />
            <h2 className="mb-4">Emergency Alert Active</h2>
            <p className="mb-6">Location sharing enabled. Emergency contacts notified.</p>
            <Button 
              onClick={handleEmergencyDeactivate} 
              variant="secondary"
              className="bg-white text-red-500 hover:bg-gray-100"
            >
              Deactivate
            </Button>
          </motion.div>
        </motion.div>
      )}

      {/* Main App Content */}
      <div className="max-w-md mx-auto bg-white min-h-screen shadow-xl">
        {/* Header */}
        <div className="bg-gradient-to-r from-pink-400 to-purple-500 text-white p-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Shield className="w-8 h-8" />
            <h1 className="text-xl">SheSecures</h1>
          </div>
          <Button 
            size="sm" 
            variant="ghost" 
            className="text-white hover:bg-white/20"
            onClick={handleEmergencyActivate}
          >
            SOS
          </Button>
        </div>

        {/* Tab Navigation */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1">
          <div className="flex-1 overflow-y-auto pb-20">
            <Suspense fallback={<div className="p-4 text-center">Loading...</div>}>
              <TabsContent value="home" className="p-4 space-y-4">
                <HomeContent onEmergency={handleEmergencyActivate} setShowOnboarding={setShowOnboarding} />
              </TabsContent>
              
              <TabsContent value="report" className="p-4">
                <IncidentReport />
              </TabsContent>
              
              <TabsContent value="emergency" className="p-4">
                <EmergencyFeatures onEmergency={handleEmergencyActivate} />
              </TabsContent>
              
              <TabsContent value="community" className="p-4">
                <CommunityStories />
              </TabsContent>
              
              <TabsContent value="profile" className="p-4">
                <ProfileContent />
              </TabsContent>
            </Suspense>
          </div>

          {/* Bottom Navigation */}
          <TabsList className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-md h-16 bg-white border-t border-gray-200 rounded-none grid grid-cols-5">
            <TabsTrigger value="home" className="flex flex-col items-center py-2">
              <Home className="w-5 h-5" />
              <span className="text-xs mt-1">Home</span>
            </TabsTrigger>
            <TabsTrigger value="report" className="flex flex-col items-center py-2">
              <FileText className="w-5 h-5" />
              <span className="text-xs mt-1">Report</span>
            </TabsTrigger>
            <TabsTrigger value="emergency" className="flex flex-col items-center py-2">
              <Shield className="w-5 h-5" />
              <span className="text-xs mt-1">SOS</span>
            </TabsTrigger>
            <TabsTrigger value="community" className="flex flex-col items-center py-2">
              <Users className="w-5 h-5" />
              <span className="text-xs mt-1">Community</span>
            </TabsTrigger>
            <TabsTrigger value="profile" className="flex flex-col items-center py-2">
              <User className="w-5 h-5" />
              <span className="text-xs mt-1">Profile</span>
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
    </div>
  );
}

const HomeContent = memo(function HomeContent({ onEmergency, setShowOnboarding }: { onEmergency: () => void; setShowOnboarding: (show: boolean) => void }) {
  return (
    <div className="space-y-6">
      {/* Welcome Card */}
      <Card className="bg-gradient-to-r from-pink-100 to-purple-100 p-6 border-0">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
            <Shield className="w-8 h-8 text-pink-500" />
          </div>
          <div>
            <h2 className="text-lg mb-1">Welcome to SheSecures</h2>
            <p className="text-sm text-gray-600">Your safety companion</p>
          </div>
        </div>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-4">
        <Card className="p-4 text-center cursor-pointer hover:shadow-md transition-shadow" onClick={onEmergency}>
          <Shield className="w-8 h-8 text-red-500 mx-auto mb-2" />
          <p className="text-sm">Emergency SOS</p>
        </Card>
        <Card className="p-4 text-center cursor-pointer hover:shadow-md transition-shadow">
          <FileText className="w-8 h-8 text-blue-500 mx-auto mb-2" />
          <p className="text-sm">Report Incident</p>
        </Card>
        <Card className="p-4 text-center cursor-pointer hover:shadow-md transition-shadow">
          <MapPin className="w-8 h-8 text-green-500 mx-auto mb-2" />
          <p className="text-sm">Share Location</p>
        </Card>
        <Card 
          className="p-4 text-center cursor-pointer hover:shadow-md transition-shadow"
          onClick={() => setShowOnboarding(true)}
        >
          <Phone className="w-8 h-8 text-purple-500 mx-auto mb-2" />
          <p className="text-sm">View Tutorial</p>
        </Card>
      </div>

      {/* Data Safety Tool */}
      <DataSafetyTool />

      {/* Recent Activity */}
      <Card className="p-4">
        <h3 className="mb-3">Recent Activity</h3>
        <div className="space-y-3">
          <div className="flex items-center space-x-3">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <p className="text-sm">Location shared with trusted contacts</p>
            <span className="text-xs text-gray-500 ml-auto">2h ago</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <p className="text-sm">Safety check completed</p>
            <span className="text-xs text-gray-500 ml-auto">1d ago</span>
          </div>
        </div>
      </Card>
    </div>
  );
});

const ProfileContent = memo(function ProfileContent() {
  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="text-center">
          <div className="w-20 h-20 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full mx-auto mb-4 flex items-center justify-center">
            <User className="w-10 h-10 text-white" />
          </div>
          <h2 className="mb-2">Ayushi Singh</h2>
          <Badge variant="secondary">Verified</Badge>
        </div>
      </Card>

      <Card className="p-4">
        <h3 className="mb-4">Settings</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm">Anonymous Mode</span>
            <Switch defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm">Location Sharing</span>
            <Switch />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm">Emergency Alerts</span>
            <Switch defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm">WhatsApp Integration</span>
            <Switch defaultChecked />
          </div>
        </div>
      </Card>

      <Card className="p-4">
        <h3 className="mb-4">Support</h3>
        <div className="space-y-3">
          <Button variant="ghost" className="w-full justify-start">
            <Phone className="w-4 h-4 mr-2" />
            Emergency Helpline
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            <Bell className="w-4 h-4 mr-2" />
            Report a Bug
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            <Users className="w-4 h-4 mr-2" />
            Community Guidelines
          </Button>
        </div>
      </Card>
    </div>
  );
});
