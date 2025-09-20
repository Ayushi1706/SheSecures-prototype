import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Shield, AlertTriangle, CheckCircle, Eye, Smartphone, Wifi, X } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Alert, AlertDescription } from './ui/alert';

export function DataSafetyTool() {
  const [showFullTool, setShowFullTool] = useState(false);
  const [checkUrl, setCheckUrl] = useState('');
  const [appName, setAppName] = useState('');
  const [isChecking, setIsChecking] = useState(false);
  const [result, setResult] = useState<any>(null);

  const recentChecks = [
    {
      type: 'Website',
      name: 'socialmedia-site.com',
      status: 'unsafe',
      reason: 'Requests unnecessary permissions',
      timestamp: '2 hours ago'
    },
    {
      type: 'App',
      name: 'Photo Editor Pro',
      status: 'caution',
      reason: 'Accesses contacts without clear reason',
      timestamp: '1 day ago'
    },
    {
      type: 'Website',
      name: 'banking-official.com',
      status: 'safe',
      reason: 'Secure and verified',
      timestamp: '2 days ago'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'safe': return 'text-green-600 bg-green-50 border-green-200';
      case 'caution': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'unsafe': return 'text-red-600 bg-red-50 border-red-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'safe': return <CheckCircle className="w-4 h-4" />;
      case 'caution': return <AlertTriangle className="w-4 h-4" />;
      case 'unsafe': return <X className="w-4 h-4" />;
      default: return <Shield className="w-4 h-4" />;
    }
  };

  const handleCheck = async () => {
    setIsChecking(true);
    
    // Simulate API check
    setTimeout(() => {
      const mockResult = {
        status: Math.random() > 0.7 ? 'unsafe' : Math.random() > 0.4 ? 'caution' : 'safe',
        permissions: ['Camera', 'Location', 'Contacts', 'Storage'],
        riskFactors: [
          'Requests location data without clear purpose',
          'Third-party data sharing detected',
          'No clear privacy policy'
        ],
        recommendations: [
          'Deny location access',
          'Review app permissions regularly',
          'Consider alternatives with better privacy'
        ]
      };
      setResult(mockResult);
      setIsChecking(false);
    }, 2000);
  };

  if (!showFullTool) {
    return (
      <Card className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <Shield className="w-5 h-5 text-blue-500" />
            <h3>Should I Share Data?</h3>
          </div>
          <Badge variant="outline" className="text-xs">
            Smart Check
          </Badge>
        </div>
        <p className="text-sm text-gray-600 mb-3">
          Quick privacy check for apps and websites before sharing your data.
        </p>
        <Button 
          onClick={() => setShowFullTool(true)}
          variant="outline" 
          size="sm" 
          className="w-full"
        >
          <Eye className="w-4 h-4 mr-2" />
          Check Safety Now
        </Button>
      </Card>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 z-40 flex items-center justify-center p-4"
    >
      <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center space-x-2">
            <Shield className="w-6 h-6 text-blue-500" />
            <h2>Data Safety Checker</h2>
          </div>
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => setShowFullTool(false)}
          >
            <X className="w-4 h-4" />
          </Button>
        </div>

        <div className="p-4 space-y-6">
          {/* Check Form */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm mb-2">Website URL</label>
              <Input 
                placeholder="https://example.com"
                value={checkUrl}
                onChange={(e) => setCheckUrl(e.target.value)}
              />
            </div>
            
            <div className="text-center">
              <span className="text-sm text-gray-500">OR</span>
            </div>
            
            <div>
              <label className="block text-sm mb-2">App Name</label>
              <Input 
                placeholder="Enter app name"
                value={appName}
                onChange={(e) => setAppName(e.target.value)}
              />
            </div>

            <Button 
              onClick={handleCheck}
              disabled={!checkUrl && !appName || isChecking}
              className="w-full bg-blue-500 hover:bg-blue-600"
            >
              {isChecking ? (
                <>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"
                  />
                  Checking Safety...
                </>
              ) : (
                <>
                  <Shield className="w-4 h-4 mr-2" />
                  Check Safety
                </>
              )}
            </Button>
          </div>

          {/* Results */}
          {result && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              <Alert className={getStatusColor(result.status)}>
                {getStatusIcon(result.status)}
                <AlertDescription>
                  <strong>Safety Status: {result.status.toUpperCase()}</strong>
                  {result.status === 'unsafe' && ' - We recommend avoiding this'}
                  {result.status === 'caution' && ' - Proceed with caution'}
                  {result.status === 'safe' && ' - Generally safe to use'}
                </AlertDescription>
              </Alert>

              <Card className="p-4">
                <h4 className="mb-2">Permissions Requested</h4>
                <div className="flex flex-wrap gap-2">
                  {result.permissions.map((permission: string, index: number) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {permission}
                    </Badge>
                  ))}
                </div>
              </Card>

              {result.riskFactors.length > 0 && (
                <Card className="p-4 bg-yellow-50 border-yellow-200">
                  <h4 className="mb-2 text-yellow-800">Risk Factors</h4>
                  <ul className="text-sm text-yellow-700 space-y-1">
                    {result.riskFactors.map((factor: string, index: number) => (
                      <li key={index}>• {factor}</li>
                    ))}
                  </ul>
                </Card>
              )}

              <Card className="p-4 bg-blue-50 border-blue-200">
                <h4 className="mb-2 text-blue-800">Recommendations</h4>
                <ul className="text-sm text-blue-700 space-y-1">
                  {result.recommendations.map((rec: string, index: number) => (
                    <li key={index}>• {rec}</li>
                  ))}
                </ul>
              </Card>
            </motion.div>
          )}

          {/* Recent Checks */}
          <div>
            <h4 className="mb-3">Recent Safety Checks</h4>
            <div className="space-y-2">
              {recentChecks.map((check, index) => (
                <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                  <div className="flex items-center space-x-2">
                    {check.type === 'App' ? (
                      <Smartphone className="w-4 h-4 text-gray-500" />
                    ) : (
                      <Wifi className="w-4 h-4 text-gray-500" />
                    )}
                    <div>
                      <p className="text-sm">{check.name}</p>
                      <p className="text-xs text-gray-500">{check.reason}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge 
                      variant="outline" 
                      className={`text-xs ${getStatusColor(check.status)}`}
                    >
                      {check.status}
                    </Badge>
                    <p className="text-xs text-gray-400 mt-1">{check.timestamp}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Tips */}
          <Alert>
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              <strong>Privacy Tip:</strong> Always review app permissions and decline unnecessary access to your data.
            </AlertDescription>
          </Alert>
        </div>
      </div>
    </motion.div>
  );
}