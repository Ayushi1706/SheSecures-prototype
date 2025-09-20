import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Shield, MessageCircle, FileText, Users, ChevronRight, Check } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';

interface OnboardingFlowProps {
  onComplete: () => void;
}

export function OnboardingFlow({ onComplete }: OnboardingFlowProps) {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    {
      icon: Shield,
      title: "Welcome to SheSecures",
      description: "Your all-in-one safety and digital empowerment companion. We're here to keep you safe and informed.",
      color: "text-pink-500"
    },
    {
      icon: MessageCircle,
      title: "WhatsApp Bot Integration",
      description: "Report incidents, get help, and access all features through our intelligent WhatsApp bot with multi-language support.",
      color: "text-green-500"
    },
    {
      icon: FileText,
      title: "Anonymous Reporting",
      description: "Report incidents safely with complete anonymity or choose to identify yourself. Every report gets a case ID for tracking.",
      color: "text-blue-500"
    },
    {
      icon: Shield,
      title: "Emergency Features",
      description: "Triple power button, secret codes, and covert triggers for emergency situations. Your safety is just a tap away.",
      color: "text-red-500"
    },
    {
      icon: Users,
      title: "Community Support",
      description: "Share experiences, learn from others, and build a supportive community while maintaining your privacy.",
      color: "text-purple-500"
    }
  ];

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete();
    }
  };

  const skip = () => {
    onComplete();
  };

  const step = steps[currentStep];
  const IconComponent = step.icon;

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50 flex flex-col">
      <div className="max-w-md mx-auto flex-1 flex flex-col justify-center p-6">
        {/* Progress Indicator */}
        <div className="flex justify-center mb-8">
          <div className="flex space-x-2">
            {steps.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index <= currentStep ? 'bg-pink-500' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Content */}
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.3 }}
          className="text-center"
        >
          <Card className="p-8 border-0 shadow-lg">
            <div className="mb-6">
              <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-r from-pink-100 to-purple-100 rounded-full flex items-center justify-center">
                <IconComponent className={`w-10 h-10 ${step.color}`} />
              </div>
              
              <h1 className="mb-4">{step.title}</h1>
              <p className="text-gray-600 leading-relaxed">{step.description}</p>
            </div>

            {/* Special demo for WhatsApp step */}
            {currentStep === 1 && (
              <div className="mb-6 p-4 bg-green-50 rounded-lg border border-green-200">
                <div className="flex items-center space-x-2 mb-2">
                  <MessageCircle className="w-4 h-4 text-green-500" />
                  <span className="text-sm text-green-700">WhatsApp Bot Demo</span>
                </div>
                <div className="text-xs text-green-600 bg-white p-2 rounded border">
                  "Hi! I need help" → Bot responds instantly with support options
                </div>
              </div>
            )}

            {/* Special demo for emergency step */}
            {currentStep === 3 && (
              <div className="mb-6 p-4 bg-red-50 rounded-lg border border-red-200">
                <div className="flex justify-center space-x-4">
                  <div className="text-center">
                    <div className="w-8 h-8 bg-red-500 rounded-full mx-auto mb-1 flex items-center justify-center">
                      <span className="text-white text-xs">×3</span>
                    </div>
                    <span className="text-xs text-red-600">Power Button</span>
                  </div>
                  <div className="text-center">
                    <div className="w-8 h-8 bg-red-500 rounded-full mx-auto mb-1 flex items-center justify-center">
                      <span className="text-white text-xs">#</span>
                    </div>
                    <span className="text-xs text-red-600">Secret Code</span>
                  </div>
                  <div className="text-center">
                    <div className="w-8 h-8 bg-red-500 rounded-full mx-auto mb-1 flex items-center justify-center">
                      <span className="text-white text-xs">○</span>
                    </div>
                    <span className="text-xs text-red-600">Hidden Tap</span>
                  </div>
                </div>
              </div>
            )}
          </Card>
        </motion.div>

        {/* Navigation */}
        <div className="flex justify-between items-center mt-8">
          <Button
            variant="ghost"
            onClick={skip}
            className="text-gray-500"
          >
            Skip
          </Button>

          <Button
            onClick={nextStep}
            className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-6"
          >
            {currentStep === steps.length - 1 ? (
              <>
                Get Started <Check className="w-4 h-4 ml-2" />
              </>
            ) : (
              <>
                Next <ChevronRight className="w-4 h-4 ml-2" />
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}