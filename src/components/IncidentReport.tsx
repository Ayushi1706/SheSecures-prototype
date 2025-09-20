import React, { useState } from 'react';
import { motion } from 'motion/react';
import { FileText, MapPin, Camera, Mic, Eye, EyeOff, CheckCircle, AlertTriangle, Clock } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Switch } from './ui/switch';
import { Badge } from './ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Alert, AlertDescription } from './ui/alert';

export function IncidentReport() {
  const [reportType, setReportType] = useState<'anonymous' | 'identified' | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [caseId, setCaseId] = useState('');
  const [formData, setFormData] = useState({
    category: '',
    description: '',
    location: '',
    hasEvidence: false,
    emergency: false
  });

  const incidentCategories = [
    'Harassment',
    'Stalking',
    'Domestic Violence',
    'Cyber Crime',
    'Workplace Issues',
    'Public Safety',
    'Other'
  ];

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      const newCaseId = `${reportType?.toUpperCase().slice(0, 3)}-${Date.now().toString().slice(-6)}`;
      setCaseId(newCaseId);
      setIsSubmitted(true);
      setIsSubmitting(false);
    }, 2000);
  };

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center space-y-6"
      >
        <div className="w-20 h-20 bg-green-100 rounded-full mx-auto flex items-center justify-center">
          <CheckCircle className="w-10 h-10 text-green-500" />
        </div>
        
        <div>
          <h2 className="text-green-600 mb-2">Report Submitted Successfully</h2>
          <p className="text-gray-600 mb-4">Your incident has been recorded and will be reviewed by our team.</p>
          
          <Card className="p-4 bg-green-50 border-green-200">
            <div className="flex items-center justify-between mb-2">
              <span>Case ID:</span>
              <Badge variant="outline" className="text-green-600 border-green-300">
                {caseId}
              </Badge>
            </div>
            <p className="text-xs text-gray-600">
              Save this ID to track your report. You'll receive updates via WhatsApp.
            </p>
          </Card>
        </div>

        <div className="space-y-2">
          <Button 
            onClick={() => {
              setIsSubmitted(false);
              setReportType(null);
              setFormData({
                category: '',
                description: '',
                location: '',
                hasEvidence: false,
                emergency: false
              });
            }}
            variant="outline"
            className="w-full"
          >
            Submit Another Report
          </Button>
          <Button className="w-full bg-green-500 hover:bg-green-600">
            Track My Reports
          </Button>
        </div>
      </motion.div>
    );
  }

  if (!reportType) {
    return (
      <div className="space-y-6">
        <div className="text-center mb-6">
          <FileText className="w-12 h-12 text-blue-500 mx-auto mb-3" />
          <h2 className="mb-2">Report an Incident</h2>
          <p className="text-gray-600">Choose how you'd like to report. Both options are secure and confidential.</p>
        </div>

        <div className="space-y-4">
          <Card 
            className="p-6 cursor-pointer hover:shadow-md transition-shadow border-2 hover:border-pink-200"
            onClick={() => setReportType('anonymous')}
          >
            <div className="flex items-start space-x-4">
              <EyeOff className="w-8 h-8 text-pink-500 mt-1" />
              <div>
                <h3 className="mb-2">Anonymous Report</h3>
                <p className="text-sm text-gray-600 mb-3">
                  Report without sharing any personal information. Your identity remains completely private.
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline" className="text-xs">
                    <Eye className="w-3 h-3 mr-1" />
                    Private
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    <Clock className="w-3 h-3 mr-1" />
                    Quick
                  </Badge>
                </div>
              </div>
            </div>
          </Card>

          <Card 
            className="p-6 cursor-pointer hover:shadow-md transition-shadow border-2 hover:border-blue-200"
            onClick={() => setReportType('identified')}
          >
            <div className="flex items-start space-x-4">
              <Eye className="w-8 h-8 text-blue-500 mt-1" />
              <div>
                <h3 className="mb-2">Identified Report</h3>
                <p className="text-sm text-gray-600 mb-3">
                  Include your details for follow-up support and updates. Your information is encrypted and secure.
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline" className="text-xs">
                    <FileText className="w-3 h-3 mr-1" />
                    Follow-up
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    Secure
                  </Badge>
                </div>
              </div>
            </div>
          </Card>
        </div>

        <Alert>
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            If you're in immediate danger, use our Emergency SOS feature or call emergency services directly.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="flex items-center space-x-3">
        <Button 
          variant="ghost" 
          size="sm"
          onClick={() => setReportType(null)}
        >
          ←
        </Button>
        <div>
          <h2 className="flex items-center space-x-2">
            {reportType === 'anonymous' ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            <span>{reportType === 'anonymous' ? 'Anonymous' : 'Identified'} Report</span>
          </h2>
          <p className="text-sm text-gray-600">All information is encrypted and secure</p>
        </div>
      </div>

      {/* Form */}
      <Card className="p-6 space-y-4">
        {/* Emergency Toggle */}
        <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg border border-red-200">
          <div>
            <span className="text-sm">Emergency Situation</span>
            <p className="text-xs text-gray-600">Check if this requires immediate attention</p>
          </div>
          <Switch 
            checked={formData.emergency}
            onCheckedChange={(checked) => setFormData({...formData, emergency: checked})}
          />
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm mb-2">Incident Category</label>
          <Select value={formData.category} onValueChange={(value) => setFormData({...formData, category: value})}>
            <SelectTrigger>
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              {incidentCategories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm mb-2">Description</label>
          <Textarea 
            placeholder="Describe what happened. Include as much detail as you're comfortable sharing..."
            rows={4}
            value={formData.description}
            onChange={(e) => setFormData({...formData, description: e.target.value})}
          />
        </div>

        {/* Location */}
        <div>
          <label className="block text-sm mb-2">Location (Optional)</label>
          <div className="flex space-x-2">
            <Input 
              placeholder="Enter location or landmark"
              value={formData.location}
              onChange={(e) => setFormData({...formData, location: e.target.value})}
            />
            <Button variant="outline" size="sm">
              <MapPin className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Evidence */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm">Do you have evidence to share?</span>
            <Switch 
              checked={formData.hasEvidence}
              onCheckedChange={(checked) => setFormData({...formData, hasEvidence: checked})}
            />
          </div>
          
          {formData.hasEvidence && (
            <div className="grid grid-cols-2 gap-2">
              <Button variant="outline" size="sm" className="flex items-center">
                <Camera className="w-4 h-4 mr-2" />
                Photo/Video
              </Button>
              <Button variant="outline" size="sm" className="flex items-center">
                <Mic className="w-4 h-4 mr-2" />
                Audio
              </Button>
            </div>
          )}
        </div>

        {/* Contact Info for Identified Reports */}
        {reportType === 'identified' && (
          <div className="border-t pt-4 space-y-3">
            <h4 className="text-sm">Contact Information</h4>
            <Input placeholder="Phone number" />
            <Input placeholder="Email" />
          </div>
        )}
      </Card>

      {/* Submit */}
      <Button 
        onClick={handleSubmit}
        disabled={!formData.category || !formData.description || isSubmitting}
        className="w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white"
      >
        {isSubmitting ? (
          <>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"
            />
            Submitting Report...
          </>
        ) : (
          'Submit Report'
        )}
      </Button>

      <p className="text-xs text-center text-gray-500">
        Your report will be reviewed within 24 hours. Case ID will be provided for tracking.
      </p>
    </motion.div>
  );
}