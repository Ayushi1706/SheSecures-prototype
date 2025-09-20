import React, { useState } from "react";
import { motion } from "motion/react";
import {
  MessageCircle,
  Send,
  Bot,
  User,
  Globe,
  Phone,
  AlertTriangle,
  FileText,
} from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";

export function WhatsAppBot() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "bot",
      text: "Hi! I'm SheSecures Bot. I'm here to help you with safety, reporting incidents, and emergency assistance. Type 'help' to see what I can do!",
      timestamp: "10:30 AM",
    },
  ]);
  const [inputText, setInputText] = useState("");

  const quickReplies = [
    { text: "Report Incident", command: "report" },
    { text: "Emergency Help", command: "emergency" },
    { text: "Safety Tips", command: "tips" },
    { text: "Help", command: "help" },
  ];

  const botResponses = {
    help: "Here's what I can help you with:\n\n🚨 Type 'emergency' for immediate help\n📝 Type 'report' to file an incident\n💡 Type 'tips' for safety advice\n🌍 Type 'translate' to change language\n📞 Type 'contact' for helpline numbers",

    emergency:
      "🚨 EMERGENCY MODE ACTIVATED\n\nChoose an option:\n1️⃣ Call emergency services\n2️⃣ Share live location\n3️⃣ Alert trusted contacts\n4️⃣ Anonymous emergency report\n\nCase ID: EMG-2024-001",

    report:
      "📝 INCIDENT REPORTING\n\nI'll help you report safely:\n\n1️⃣ Anonymous report (no personal info)\n2️⃣ Identified report (with your details)\n\nBoth options generate a case ID for tracking. What would you prefer?",

    tips: "💡 SAFETY TIPS\n\n🔹 Share your location with trusted contacts\n🔹 Use our emergency triggers (triple power button)\n🔹 Keep emergency contacts updated\n🔹 Trust your instincts - if something feels wrong, seek help\n🔹 Use the 'Should I Share Data?' tool before sharing personal info",

    translate:
      "🌍 LANGUAGE OPTIONS\n\nSelect your preferred language:\n🇬🇧 English\n🇪🇸 Español\n🇫🇷 Français\n🇭🇮 हिंदी\n🇮🇳 മലയാളം\n\nType the number or language name to switch.",

    contact:
      "📞 EMERGENCY CONTACTS\n\n🚨 National Emergency: 112\n👮 Police: 100\n🚑 Ambulance: 108\n🔥 Fire: 101\n👩‍⚕️ Women Helpline: 181\n\nWould you like me to help you call any of these numbers?",
  };

  const sendMessage = (text?: string) => {
    const messageText = text || inputText.trim();
    if (!messageText) return;

    // Add user message
    const userMessage = {
      id: messages.length + 1,
      sender: "user",
      text: messageText,
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputText("");

    // Simulate bot response
    setTimeout(() => {
      const botResponse =
        botResponses[
          messageText.toLowerCase() as keyof typeof botResponses
        ] ||
        "I understand you need help. Type 'help' to see all available options, or use one of the quick reply buttons below.";

      const botMessage = {
        id: messages.length + 2,
        sender: "bot",
        text: botResponse,
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };

      setMessages((prev) => [...prev, botMessage]);
    }, 1000);
  };

  return (
    <div className="flex flex-col h-full max-h-[600px]">
      {/* Header */}
      <div className="bg-green-500 text-white p-4 flex items-center space-x-3">
        <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
          <Bot className="w-6 h-6 text-green-500" />
        </div>
        <div>
          <h3 className="text-white">
            SheSecures WhatsApp Bot
          </h3>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-300 rounded-full animate-pulse"></div>
            <span className="text-xs text-green-100">
              Online • Multi-language
            </span>
          </div>
        </div>
        <Badge variant="secondary" className="ml-auto">
          <Globe className="w-3 h-3 mr-1" />
          EN
        </Badge>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
        {messages.map((message) => (
          <motion.div
            key={message.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`flex items-start space-x-2 max-w-[80%] ${
                message.sender === "user"
                  ? "flex-row-reverse space-x-reverse"
                  : ""
              }`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  message.sender === "user"
                    ? "bg-blue-500 text-white"
                    : "bg-green-500 text-white"
                }`}
              >
                {message.sender === "user" ? (
                  <User className="w-4 h-4" />
                ) : (
                  <Bot className="w-4 h-4" />
                )}
              </div>
              <div
                className={`rounded-lg p-3 ${
                  message.sender === "user"
                    ? "bg-blue-500 text-white"
                    : "bg-white text-gray-800 border"
                }`}
              >
                <p className="text-sm whitespace-pre-line">
                  {message.text}
                </p>
                <span
                  className={`text-xs opacity-70 block mt-1 ${
                    message.sender === "user"
                      ? "text-blue-100"
                      : "text-gray-500"
                  }`}
                >
                  {message.timestamp}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Quick Replies */}
      <div className="p-3 bg-white border-t">
        <div className="grid grid-cols-2 gap-2 mb-3">
          {quickReplies.map((reply) => (
            <Button
              key={reply.command}
              variant="outline"
              size="sm"
              onClick={() => sendMessage(reply.command)}
              className="text-xs h-8"
            >
              {reply.text}
            </Button>
          ))}
        </div>

        {/* Input */}
        <div className="flex space-x-2">
          <Input
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Type a message..."
            onKeyPress={(e) =>
              e.key === "Enter" && sendMessage()
            }
            className="flex-1"
          />
          <Button
            onClick={() => sendMessage()}
            size="sm"
            className="bg-green-500 hover:bg-green-600 text-white"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>

        {/* Voice Input Option */}
        <div className="flex justify-center mt-2">
          <Button
            variant="ghost"
            size="sm"
            className="text-xs text-gray-500"
          >
            <MessageCircle className="w-3 h-3 mr-1" />
            Voice message supported
          </Button>
        </div>
      </div>
    </div>
  );
}