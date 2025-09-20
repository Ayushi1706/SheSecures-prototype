import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Shield, MapPin, Phone, Users, Zap, Volume2, Clock } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Switch } from './ui/switch';
import { Badge } from './ui/badge';
import { Alert, AlertDescription } from './ui/alert';

interface EmergencyFeaturesProps {
  onEmergency: () => void;
}

export function EmergencyFeatures({ onEmergency }: EmergencyFeaturesProps) {
  const [locationSharing, setLocationSharing] = useState(false);
  const [trustedContacts, setTrustedContacts] = useState([
    { name: 'Papa', phone: '+91 82349 42151', active: true },
    { name: 'Mummy', phone: '+91 82349 42151', active: true },
    { name: 'Didi', phone: '+91 82349 42151', active: false }
  ]);

  const emergencyTriggers = [
    {
      trigger: 'Triple Power Button',
      description: 'Press power button 3 times quickly',
      icon: Zap,
      status: 'Active'
    },
    {
      trigger: 'Secret Dialer Code',
      description: 'Dial *100# from any phone',
      icon: Phone,
      status: 'Active'
    },
    {
      trigger: 'Hidden Pattern',
      description: 'Tap specific screen pattern',
      icon: Shield,
      status: 'Inactive'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Emergency SOS Button */}
      <Card className="p-6 bg-gradient-to-r from-red-50 to-pink-50 border-red-200">
        <div className="text-center">
          <motion.button
            className="w-32 h-32 bg-gradient-to-r from-red-500 to-red-600 rounded-full mx-auto mb-4 flex items-center justify-center shadow-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onEmergency}
          >
            <Shield className="w-16 h-16 text-white" />
          </motion.button>
          
          <h2 className="text-red-600 mb-2">Emergency SOS</h2>
          <p className="text-sm text-gray-600 mb-4">
            Press and hold for 3 seconds to activate emergency protocol
          </p>
          
          <div className="grid grid-cols-2 gap-2 text-xs">
            <Badge variant="outline" className="text-red-600 border-red-300">
              <MapPin className="w-3 h-3 mr-1" />
              GPS Sharing
            </Badge>
            <Badge variant="outline" className="text-red-600 border-red-300">
              <Phone className="w-3 h-3 mr-1" />
              Auto-Call
            </Badge>
          </div>
        </div>
      </Card>

      {/* Emergency Triggers */}
      <Card className="p-4">
        <h3 className="mb-4">Emergency Triggers</h3>
        <div className="space-y-3">
          {emergencyTriggers.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <IconComponent className="w-5 h-5 text-gray-600" />
                  <div>
                    <p className="text-sm">{item.trigger}</p>
                    <p className="text-xs text-gray-500">{item.description}</p>
                  </div>
                </div>
                <Badge variant={item.status === 'Active' ? 'default' : 'secondary'}>
                  {item.status}
                </Badge>
              </div>
            );
          })}
        </div>
      </Card>

      {/* Location Sharing */}
      <Card className="p-4">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3>Live Location Sharing</h3>
            <p className="text-sm text-gray-600">Share your location with trusted contacts</p>
          </div>
          <Switch 
            checked={locationSharing}
            onCheckedChange={setLocationSharing}
          />
        </div>
        
        {locationSharing && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="space-y-3"
          >
            <Alert>
              <MapPin className="h-4 w-4" />
              <AlertDescription>
                Location sharing active. Updates sent every 5 minutes.
              </AlertDescription>
            </Alert>
            
            <div className="flex items-center justify-between text-sm">
              <span>Auto-expire in:</span>
              <Badge variant="outline">
                <Clock className="w-3 h-3 mr-1" />
                2 hours
              </Badge>
            </div>
          </motion.div>
        )}
      </Card>

      {/* Trusted Contacts */}
      <Card className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h3>Trusted Contacts</h3>
          <Button variant="outline" size="sm">
            Add Contact
          </Button>
        </div>
        
        <div className="space-y-3">
          {trustedContacts.map((contact, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full flex items-center justify-center">
                  <Users className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-sm">{contact.name}</p>
                  <p className="text-xs text-gray-500">{contact.phone}</p>
                </div>
              </div>
              <Switch 
                checked={contact.active}
                onCheckedChange={(checked) => {
                  const updated = [...trustedContacts];
                  updated[index].active = checked;
                  setTrustedContacts(updated);
                }}
              />
            </div>
          ))}
        </div>
      </Card>

      {/* Emergency Actions */}
      <div className="grid grid-cols-2 gap-4">
        <Button variant="outline" className="flex flex-col items-center p-4 h-auto">
          <Phone className="w-6 h-6 mb-2 text-blue-500" />
          <span className="text-sm">Call 112</span>
        </Button>
        <Button variant="outline" className="flex flex-col items-center p-4 h-auto">
          <Volume2 className="w-6 h-6 mb-2 text-orange-500" />
          <span className="text-sm">Sound Alarm</span>
        </Button>
      </div>

      {/* Safety Tips */}
      <Card className="p-4 bg-blue-50 border-blue-200">
        <h4 className="mb-2 text-blue-800">Safety Reminders</h4>
        <ul className="text-sm text-blue-700 space-y-1">
          <li>• Keep your emergency contacts updated</li>
          <li>• Test emergency triggers monthly</li>
          <li>• Share your location during commutes</li>
          <li>• Trust your instincts - if something feels wrong, get help</li>
        </ul>
      </Card>
    </div>
  );
}