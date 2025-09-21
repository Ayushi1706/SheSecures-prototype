import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Users, Heart, MessageCircle, Share, Plus, EyeOff, Clock, ThumbsUp, Flag } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';
import { Switch } from './ui/switch';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function CommunityStories() {
  const [showPostForm, setShowPostForm] = useState(false);
  const [postText, setPostText] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(true);

  const stories = [
    {
      id: 1,
      author: 'Ayushi Singh',
      isAnonymous: false,
      timestamp: '1 day ago',
      category: 'Digital Safety',
      content: "PSA: I almost fell for a phishing scam yesterday. The fake banking email looked so real! Thanks to the SheSecures data safety tool, I caught it before sharing my details. Always double-check suspicious links!",
      likes: 42,
      comments: 15,
      helpful: true,
      verified: true
    },
    {
      id: 2,
      author: 'Anonymous',
      isAnonymous: true,
      timestamp: '2 hours ago',
      category: 'Workplace Safety',
      content: "I wanted to share my experience about speaking up against harassment at work. It was scary at first, but HR was actually very supportive. To anyone facing similar issues - you're not alone and it's worth reporting.",
      likes: 24,
      comments: 8,
      helpful: true,
      verified: false
    },
    
    
    {
      id: 3,
      author: 'Ankita Verma.',
      isAnonymous: false,
      timestamp: '1 week ago',
      category: 'Community Support',
      content: "Thank you to everyone who shared resources about dealing with stalking. Your support and advice helped me take the right steps to stay safe. This community is truly amazing.",
      likes: 67,
      comments: 23,
      helpful: true,
      verified: true
    },
    {
      id: 4,
      author: 'Anonymous',
      isAnonymous: true,
      timestamp: '3 days ago',
      category: 'Personal Safety',
      content: "I've been using location sharing with my trusted contacts during late commutes. It gives me and my family peace of mind. Small steps like these can make a big difference in feeling secure.",
      likes: 18,
      comments: 5,
      helpful: false,
      verified: false
    },
    {
      id: 5,
      author: 'Yashasvi',
      isAnonymous: false,
      timestamp: '1 month ago',
      category: 'Community Support',
      content: "Share your live location with trusted contacts when traveling late. It’s a small step, but it can make a big difference for your safety and your family’s peace of mind..",
      likes: 67,
      comments: 23,
      helpful: true,
      verified: true
    }
  ];

  const categories = [
    'All Stories',
    'Workplace Safety',
    'Digital Safety',
    'Personal Safety',
    'Community Support',
    'Success Stories'
  ];

  const [selectedCategory, setSelectedCategory] = useState('All Stories');

  const handlePost = () => {
    // Handle posting logic
    setPostText('');
    setShowPostForm(false);
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      'Workplace Safety': 'bg-blue-100 text-blue-700',
      'Digital Safety': 'bg-green-100 text-green-700',
      'Personal Safety': 'bg-red-100 text-red-700',
      'Community Support': 'bg-purple-100 text-purple-700',
      'Success Stories': 'bg-yellow-100 text-yellow-700'
    };
    return colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-700';
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Users className="w-6 h-6 text-purple-500" />
          <h2>Community Stories</h2>
        </div>
        <Button 
          onClick={() => setShowPostForm(true)}
          size="sm"
          className="bg-purple-500 hover:bg-purple-600"
        >
          <Plus className="w-4 h-4 mr-1" />
          Share
        </Button>
      </div>

      {/* Hero Image */}
      <Card className="p-6 bg-gradient-to-r from-purple-100 to-pink-100 border-0">
        <div className="flex items-center space-x-4">
          <ImageWithFallback 
            src="https://images.unsplash.com/photo-1723564211731-21ceb97443a5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21tdW5pdHklMjB3b21lbiUyMHN1cHBvcnQlMjBncm91cHxlbnwxfHx8fDE3NTgzNzg0NTB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            alt="Community support"
            className="w-16 h-16 rounded-full object-cover"
          />
          <div>
            <h3 className="mb-1">Safe Space for Sharing</h3>
            <p className="text-sm text-gray-600">Share experiences, learn from others, and build a supportive community.</p>
          </div>
        </div>
      </Card>

      {/* Post Form Modal */}
      {showPostForm && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black bg-opacity-50 z-40 flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-lg max-w-md w-full p-6"
          >
            <h3 className="mb-4">Share Your Story</h3>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                <div className="flex items-center space-x-2">
                  <EyeOff className="w-4 h-4 text-purple-600" />
                  <span className="text-sm">Post anonymously</span>
                </div>
                <Switch 
                  checked={isAnonymous}
                  onCheckedChange={setIsAnonymous}
                />
              </div>

              <Textarea 
                placeholder="Share your experience, advice, or story to help others in the community..."
                rows={6}
                value={postText}
                onChange={(e) => setPostText(e.target.value)}
              />

              <div className="text-xs text-gray-500">
                Your story helps create a supportive community. All posts are moderated for safety.
              </div>

              <div className="flex space-x-2">
                <Button 
                  onClick={() => setShowPostForm(false)}
                  variant="outline"
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button 
                  onClick={handlePost}
                  disabled={!postText.trim()}
                  className="flex-1 bg-purple-500 hover:bg-purple-600"
                >
                  Share Story
                </Button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Category Filter */}
      <div className="flex space-x-2 overflow-x-auto pb-2">
        {categories.map((category) => (
          <Button
            key={category}
            variant={selectedCategory === category ? 'default' : 'outline'}
            size="sm"
            className="whitespace-nowrap"
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </Button>
        ))}
      </div>

      {/* Stories Feed */}
      <div className="space-y-4">
        {stories.map((story) => (
          <motion.div
            key={story.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card className="p-4">
              {/* Story Header */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full flex items-center justify-center">
                    {story.isAnonymous ? (
                      <EyeOff className="w-4 h-4 text-white" />
                    ) : (
                      <Users className="w-4 h-4 text-white" />
                    )}
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm">{story.author}</span>
                      {story.verified && (
                        <Badge variant="outline" className="text-xs">
                          Verified
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center space-x-2 text-xs text-gray-500">
                      <Clock className="w-3 h-3" />
                      <span>{story.timestamp}</span>
                    </div>
                  </div>
                </div>
                
                <Badge className={`text-xs ${getCategoryColor(story.category)}`}>
                  {story.category}
                </Badge>
              </div>

              {/* Story Content */}
              <p className="text-sm text-gray-700 mb-4 leading-relaxed">
                {story.content}
              </p>

              {/* Story Actions */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <button className="flex items-center space-x-1 text-gray-500 hover:text-pink-500">
                    <Heart className="w-4 h-4" />
                    <span className="text-xs">{story.likes}</span>
                  </button>
                  
                  <button className="flex items-center space-x-1 text-gray-500 hover:text-blue-500">
                    <MessageCircle className="w-4 h-4" />
                    <span className="text-xs">{story.comments}</span>
                  </button>
                  
                  <button className="flex items-center space-x-1 text-gray-500 hover:text-green-500">
                    <Share className="w-4 h-4" />
                    <span className="text-xs">Share</span>
                  </button>
                </div>

                <div className="flex items-center space-x-2">
                  {story.helpful && (
                    <Badge variant="outline" className="text-xs text-green-600 border-green-300">
                      <ThumbsUp className="w-3 h-3 mr-1" />
                      Helpful
                    </Badge>
                  )}
                  
                  <button className="text-gray-400 hover:text-gray-600">
                    <Flag className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Community Guidelines */}
      <Card className="p-4 bg-blue-50 border-blue-200">
        <h4 className="mb-2 text-blue-800">Community Guidelines</h4>
        <ul className="text-sm text-blue-700 space-y-1">
          <li>• Be respectful and supportive of all community members</li>
          <li>• Share experiences to help others, not to harm</li>
          <li>• Protect privacy - yours and others'</li>
          <li>• Report inappropriate content to moderators</li>
        </ul>
      </Card>
    </div>
  );
}
