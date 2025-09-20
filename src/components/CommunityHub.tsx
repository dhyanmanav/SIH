import { useState } from 'react';
import { motion } from 'motion/react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Avatar } from './ui/avatar';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  Users, MapPin, TrendingUp, Heart, MessageSquare, 
  Star, Award, Camera, Share2, ThumbsUp, Filter,
  Calendar, Globe, Droplets, Leaf, Target
} from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function CommunityHub() {
  const [activeFilter, setActiveFilter] = useState('all');

  const communityStats = {
    totalMembers: 52847,
    activeCommunities: 1247,
    waterSaved: 125600000, // liters
    co2Reduced: 47800, // kg
    systemsInstalled: 8934
  };

  const successStories = [
    {
      id: 1,
      user: {
        name: "Priya Sharma",
        location: "Pune, Maharashtra",
        avatar: "https://images.unsplash.com/photo-1751118765821-ecc116f2d70e?crop=face&w=100&h=100"
      },
      title: "From Water Shortage to Water Security",
      description: "Our society of 50 families implemented community RTRWH and now harvests 50,000L annually. We've reduced dependency on tankers by 80%.",
      impact: {
        waterSaved: 50000,
        costSaving: 45000,
        families: 50
      },
      images: ["https://images.unsplash.com/photo-1727637598483-0c139a8fb48f"],
      likes: 234,
      comments: 67,
      date: "2024-12-15",
      tags: ["community", "water-security", "maharashtra"]
    },
    {
      id: 2,
      user: {
        name: "Rajesh Kumar",
        location: "Jaipur, Rajasthan",
        avatar: "https://images.unsplash.com/photo-1723155781081-a9a6f34e3fe0?crop=face&w=100&h=100"
      },
      title: "School RTRWH Project Transforms Learning",
      description: "Our government school's RTRWH system now provides clean water for 300 students and has become a live laboratory for environmental education.",
      impact: {
        waterSaved: 25000,
        costSaving: 20000,
        families: 300
      },
      images: ["https://images.unsplash.com/photo-1730367795396-0e42c6602f77"],
      likes: 456,
      comments: 89,
      date: "2024-12-10",
      tags: ["education", "school", "rajasthan"]
    },
    {
      id: 3,
      user: {
        name: "Lakshmi Narayanan",
        location: "Chennai, Tamil Nadu",
        avatar: "https://images.unsplash.com/photo-1677907564161-7279d5aac75f?crop=face&w=100&h=100"
      },
      title: "Tech-Enabled Smart RTRWH System",
      description: "IoT sensors and app integration help us monitor and optimize our harvest. Tech meets tradition for maximum efficiency.",
      impact: {
        waterSaved: 35000,
        costSaving: 30000,
        families: 1
      },
      images: ["https://images.unsplash.com/photo-1727637598483-0c139a8fb48f"],
      likes: 189,
      comments: 45,
      date: "2024-12-08",
      tags: ["technology", "innovation", "tamil-nadu"]
    }
  ];

  const leaderboard = [
    {
      rank: 1,
      name: "Green Valley Society",
      location: "Bangalore",
      waterSaved: 250000,
      members: 120,
      badge: "Water Champion"
    },
    {
      rank: 2,
      name: "Eco Warriors Collective",
      location: "Mumbai",
      waterSaved: 180000,
      members: 85,
      badge: "Climate Hero"
    },
    {
      rank: 3,
      name: "Sustainable Delhi Initiative",
      location: "Delhi",
      waterSaved: 165000,
      members: 95,
      badge: "Innovation Leader"
    },
    {
      rank: 4,
      name: "Rainwater Pioneers",
      location: "Hyderabad",
      waterSaved: 145000,
      members: 67,
      badge: "Early Adopter"
    },
    {
      rank: 5,
      name: "Water Wise Community",
      location: "Kolkata",
      waterSaved: 132000,
      members: 78,
      badge: "Consistent Performer"
    }
  ];

  const upcomingEvents = [
    {
      id: 1,
      title: "National Water Conservation Day Workshop",
      date: "2025-01-22",
      time: "10:00 AM",
      location: "India Habitat Centre, New Delhi",
      type: "Workshop",
      attendees: 156,
      description: "Hands-on workshop on RTRWH design and installation"
    },
    {
      id: 2,
      title: "Community RTRWH Planning Meet",
      date: "2025-01-25",
      time: "6:00 PM",
      location: "Online",
      type: "Webinar",
      attendees: 89,
      description: "Planning session for society-level implementations"
    },
    {
      id: 3,
      title: "Water Harvesting Expo 2025",
      date: "2025-02-15",
      time: "9:00 AM",
      location: "Pragati Maidan, New Delhi",
      type: "Exhibition",
      attendees: 450,
      description: "Latest technologies and success stories showcase"
    }
  ];

  const challenges = [
    {
      id: 1,
      title: "Monsoon Harvest Challenge 2025",
      description: "Maximize your rainwater harvest this monsoon season",
      startDate: "2025-06-01",
      endDate: "2025-09-30",
      participants: 1247,
      prize: "₹50,000 + Smart Water Monitoring Kit",
      status: "upcoming"
    },
    {
      id: 2,
      title: "Zero Water Waste Community",
      description: "Achieve 100% rainwater utilization in your area",
      startDate: "2025-01-01",
      endDate: "2025-12-31",
      participants: 89,
      prize: "₹1,00,000 + Recognition Award",
      status: "active"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl mb-2 flex items-center justify-center">
            <Users className="size-8 mr-3" />
            AquaHarvest Community Hub
          </h1>
          <p className="text-gray-600 mb-6">
            Connect, learn, and inspire with India's largest water conservation community
          </p>

          {/* Community Stats */}
          <div className="grid md:grid-cols-5 gap-4 max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-blue-50 p-4 rounded-lg"
            >
              <div className="text-2xl font-bold text-blue-600">
                {(communityStats.totalMembers / 1000).toFixed(0)}K+
              </div>
              <div className="text-sm text-blue-700">Members</div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
              className="bg-green-50 p-4 rounded-lg"
            >
              <div className="text-2xl font-bold text-green-600">
                {communityStats.activeCommunities}
              </div>
              <div className="text-sm text-green-700">Communities</div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="bg-purple-50 p-4 rounded-lg"
            >
              <div className="text-2xl font-bold text-purple-600">
                {(communityStats.waterSaved / 1000000).toFixed(0)}M L
              </div>
              <div className="text-sm text-purple-700">Water Saved</div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="bg-amber-50 p-4 rounded-lg"
            >
              <div className="text-2xl font-bold text-amber-600">
                {(communityStats.co2Reduced / 1000).toFixed(0)}T
              </div>
              <div className="text-sm text-amber-700">CO₂ Reduced</div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
              className="bg-red-50 p-4 rounded-lg"
            >
              <div className="text-2xl font-bold text-red-600">
                {(communityStats.systemsInstalled / 1000).toFixed(1)}K
              </div>
              <div className="text-sm text-red-700">Systems Installed</div>
            </motion.div>
          </div>
        </div>

        <Tabs defaultValue="stories" className="w-full">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="stories">Success Stories</TabsTrigger>
            <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
            <TabsTrigger value="events">Events</TabsTrigger>
            <TabsTrigger value="challenges">Challenges</TabsTrigger>
            <TabsTrigger value="forum">Forum</TabsTrigger>
            <TabsTrigger value="resources">Resources</TabsTrigger>
          </TabsList>

          <TabsContent value="stories" className="space-y-6">
            {/* Filters */}
            <div className="flex gap-2 flex-wrap">
              <Button
                variant={activeFilter === 'all' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setActiveFilter('all')}
              >
                All Stories
              </Button>
              <Button
                variant={activeFilter === 'community' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setActiveFilter('community')}
              >
                Community Projects
              </Button>
              <Button
                variant={activeFilter === 'school' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setActiveFilter('school')}
              >
                Educational
              </Button>
              <Button
                variant={activeFilter === 'innovation' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setActiveFilter('innovation')}
              >
                Innovation
              </Button>
            </div>

            {/* Success Stories */}
            <div className="grid gap-6">
              {successStories.map((story, index) => (
                <motion.div
                  key={story.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="p-6">
                    <div className="flex gap-4">
                      <Avatar className="size-12">
                        <ImageWithFallback
                          src={story.user.avatar}
                          alt={story.user.name}
                          className="size-12 rounded-full"
                        />
                      </Avatar>
                      
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h3 className="font-medium">{story.user.name}</h3>
                            <p className="text-sm text-gray-600 flex items-center">
                              <MapPin className="size-3 mr-1" />
                              {story.user.location}
                            </p>
                          </div>
                          <div className="text-sm text-gray-500">
                            {new Date(story.date).toLocaleDateString()}
                          </div>
                        </div>

                        <h4 className="text-lg mb-3">{story.title}</h4>
                        <p className="text-gray-700 mb-4">{story.description}</p>

                        {/* Impact Metrics */}
                        <div className="grid md:grid-cols-3 gap-4 mb-4 p-3 bg-blue-50 rounded-lg">
                          <div className="text-center">
                            <div className="text-lg font-bold text-blue-600">
                              {story.impact.waterSaved.toLocaleString()}L
                            </div>
                            <div className="text-xs text-blue-700">Water Saved/Year</div>
                          </div>
                          <div className="text-center">
                            <div className="text-lg font-bold text-green-600">
                              ₹{story.impact.costSaving.toLocaleString()}
                            </div>
                            <div className="text-xs text-green-700">Annual Savings</div>
                          </div>
                          <div className="text-center">
                            <div className="text-lg font-bold text-purple-600">
                              {story.impact.families}
                            </div>
                            <div className="text-xs text-purple-700">People Benefited</div>
                          </div>
                        </div>

                        {/* Images */}
                        <div className="grid md:grid-cols-2 gap-2 mb-4">
                          {story.images.map((image, idx) => (
                            <ImageWithFallback
                              key={idx}
                              src={image}
                              alt={`${story.title} - Image ${idx + 1}`}
                              className="w-full h-32 object-cover rounded"
                            />
                          ))}
                        </div>

                        {/* Tags */}
                        <div className="flex gap-2 mb-4">
                          {story.tags.map(tag => (
                            <Badge key={tag} variant="secondary" className="text-xs">
                              #{tag}
                            </Badge>
                          ))}
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-4 pt-2 border-t">
                          <Button variant="ghost" size="sm">
                            <ThumbsUp className="size-4 mr-2" />
                            {story.likes}
                          </Button>
                          <Button variant="ghost" size="sm">
                            <MessageSquare className="size-4 mr-2" />
                            {story.comments}
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Share2 className="size-4 mr-2" />
                            Share
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="leaderboard" className="space-y-6">
            <Card className="p-6">
              <h3 className="text-lg mb-6 flex items-center">
                <Award className="size-5 mr-2" />
                Community Water Conservation Leaderboard
              </h3>
              
              <div className="space-y-4">
                {leaderboard.map((entry, index) => (
                  <motion.div
                    key={entry.rank}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`flex items-center gap-4 p-4 rounded-lg border ${
                      entry.rank <= 3 ? 'bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200' : 'bg-gray-50'
                    }`}
                  >
                    <div className={`flex items-center justify-center size-12 rounded-full font-bold text-lg ${
                      entry.rank === 1 ? 'bg-yellow-500 text-white' :
                      entry.rank === 2 ? 'bg-gray-400 text-white' :
                      entry.rank === 3 ? 'bg-amber-600 text-white' :
                      'bg-blue-100 text-blue-600'
                    }`}>
                      {entry.rank}
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">{entry.name}</h4>
                          <p className="text-sm text-gray-600 flex items-center">
                            <MapPin className="size-3 mr-1" />
                            {entry.location} • {entry.members} members
                          </p>
                        </div>
                        
                        <div className="text-right">
                          <div className="text-lg font-bold text-blue-600">
                            {(entry.waterSaved / 1000).toFixed(0)}K L
                          </div>
                          <div className="text-sm text-gray-600">Water Saved</div>
                        </div>
                      </div>
                      
                      <Badge variant="secondary" className="mt-2">
                        {entry.badge}
                      </Badge>
                    </div>
                  </motion.div>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="events" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card className="p-6">
                <h3 className="text-lg mb-4 flex items-center">
                  <Calendar className="size-5 mr-2" />
                  Upcoming Events
                </h3>
                
                <div className="space-y-4">
                  {upcomingEvents.map((event, index) => (
                    <motion.div
                      key={event.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="border rounded-lg p-4"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-medium">{event.title}</h4>
                        <Badge variant={event.type === 'Workshop' ? 'default' : 'secondary'}>
                          {event.type}
                        </Badge>
                      </div>
                      
                      <p className="text-sm text-gray-600 mb-2">{event.description}</p>
                      
                      <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                        <span>📅 {new Date(event.date).toLocaleDateString()}</span>
                        <span>🕐 {event.time}</span>
                        <span>📍 {event.location}</span>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">
                          {event.attendees} attending
                        </span>
                        <Button size="sm">Register</Button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="text-lg mb-4 flex items-center">
                  <Target className="size-5 mr-2" />
                  Active Challenges
                </h3>
                
                <div className="space-y-4">
                  {challenges.map((challenge, index) => (
                    <motion.div
                      key={challenge.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="border rounded-lg p-4"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-medium">{challenge.title}</h4>
                        <Badge variant={challenge.status === 'active' ? 'default' : 'secondary'}>
                          {challenge.status}
                        </Badge>
                      </div>
                      
                      <p className="text-sm text-gray-600 mb-3">{challenge.description}</p>
                      
                      <div className="text-sm text-gray-500 mb-3">
                        📅 {new Date(challenge.startDate).toLocaleDateString()} - {new Date(challenge.endDate).toLocaleDateString()}
                      </div>
                      
                      <div className="bg-green-50 p-3 rounded mb-3">
                        <div className="text-sm font-medium text-green-800">Prize</div>
                        <div className="text-sm text-green-700">{challenge.prize}</div>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">
                          {challenge.participants} participants
                        </span>
                        <Button size="sm" variant={challenge.status === 'active' ? 'default' : 'outline'}>
                          {challenge.status === 'active' ? 'Join Challenge' : 'Learn More'}
                        </Button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="forum" className="space-y-6">
            <Card className="p-6">
              <h3 className="text-lg mb-4">Community Discussions</h3>
              <p className="text-gray-600 mb-4">Connect with fellow water conservationists, ask questions, and share experiences.</p>
              
              <div className="text-center py-8">
                <MessageSquare className="size-16 text-gray-400 mx-auto mb-4" />
                <h4 className="text-lg mb-2">Forum Coming Soon</h4>
                <p className="text-gray-600 mb-4">
                  We're building an interactive community forum where you can discuss RTRWH techniques, 
                  troubleshoot issues, and collaborate on projects.
                </p>
                <Button>Join Waitlist</Button>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="resources" className="space-y-6">
            <Card className="p-6">
              <h3 className="text-lg mb-4">Community Resources</h3>
              <p className="text-gray-600 mb-4">
                Access shared knowledge, templates, and tools contributed by our community.
              </p>
              
              <div className="text-center py-8">
                <Globe className="size-16 text-gray-400 mx-auto mb-4" />
                <h4 className="text-lg mb-2">Resource Library Coming Soon</h4>
                <p className="text-gray-600 mb-4">
                  Community-contributed guides, templates, vendor directories, and technical resources.
                </p>
                <Button>Contribute Resources</Button>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}