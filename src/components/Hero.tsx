import { motion } from 'motion/react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Droplets, Leaf, Home, Users, TrendingUp, Award } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface HeroProps {
  onStartAssessment: () => void;
}

export function Hero({ onStartAssessment }: HeroProps) {
  const features = [
    {
      icon: Droplets,
      title: "Smart Assessment",
      description: "AI-powered analysis of your rooftop rainwater harvesting potential"
    },
    {
      icon: Home,
      title: "Custom Solutions",
      description: "Tailored recommendations based on your specific location and needs"
    },
    {
      icon: TrendingUp,
      title: "Cost Analysis",
      description: "Detailed ROI calculations with subsidy information"
    },
    {
      icon: Leaf,
      title: "Environmental Impact",
      description: "Track your contribution to groundwater conservation"
    }
  ];

  const stats = [
    { value: "50,000+", label: "Assessments Completed" },
    { value: "₹2.5 Cr", label: "Water Bills Saved" },
    { value: "100M L", label: "Water Harvested" },
    { value: "500+", label: "Communities Served" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Navigation */}
      <nav className="flex items-center justify-between p-6">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-2"
        >
          <Droplets className="size-8 text-blue-600" />
          <span className="text-xl font-semibold">AquaHarvest Pro</span>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-4"
        >
          <Badge className="bg-green-100 text-green-800 border-green-200">
            <Award className="size-3 mr-1" />
            TEAM : CODE BLOODED
          </Badge>
          <Button variant="outline">
            <Users className="size-4 mr-2" />
            हिंदी
          </Button>
        </motion.div>
      </nav>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="mb-6">
              <h1 className="text-5xl mb-4 bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                Transform Every Drop into Opportunity
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                Unlock your rooftop's water harvesting potential with AI-powered assessment, 
                custom engineering solutions, and government subsidy optimization. Join India's 
                largest water conservation movement.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button 
                  onClick={onStartAssessment}
                  size="lg" 
                  className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white px-8 py-6"
                >
                  <Droplets className="size-5 mr-2" />
                  Start Free Assessment
                </Button>
              </motion.div>
              
              <Button variant="outline" size="lg" className="px-8 py-6">
                <Users className="size-5 mr-2" />
                Join Community
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                  className="text-center"
                >
                  <div className="text-2xl font-bold text-blue-600">{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="relative">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1727637598483-0c139a8fb48f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyYWlud2F0ZXIlMjBoYXJ2ZXN0aW5nJTIwcm9vZnRvcCUyMHN5c3RlbXxlbnwxfHx8fDE3NTc5NTg4NDl8MA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Rooftop Rainwater Harvesting System"
                className="rounded-2xl shadow-2xl w-full h-[400px] object-cover"
              />
              
              {/* Floating Animation Elements */}
              <motion.div
                animate={{ y: [-10, 10, -10] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute -top-4 -right-4 bg-blue-600 text-white p-3 rounded-full shadow-lg"
              >
                <Droplets className="size-6" />
              </motion.div>
              
              <motion.div
                animate={{ y: [10, -10, 10] }}
                transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
                className="absolute -bottom-4 -left-4 bg-green-600 text-white p-3 rounded-full shadow-lg"
              >
                <Leaf className="size-6" />
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-20"
        >
          <h2 className="text-3xl text-center mb-12">
            Why Choose AquaHarvest Pro?
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                whileHover={{ y: -5 }}
              >
                <Card className="p-6 h-full hover:shadow-lg transition-shadow">
                  <feature.icon className="size-12 text-blue-600 mb-4" />
                  <h3 className="mb-2">{feature.title}</h3>
                  <p className="text-gray-600 text-sm">{feature.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Social Impact Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-20 bg-gradient-to-r from-blue-600 to-green-600 rounded-3xl p-8 text-white text-center"
        >
          <h2 className="text-3xl mb-4">Creating Social Impact</h2>
          <p className="text-xl mb-6 opacity-90">
            Every assessment helps build water-secure communities across India
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <div className="text-3xl mb-2">🏘️</div>
              <div className="text-lg">500+ Villages Transformed</div>
            </div>
            <div>
              <div className="text-3xl mb-2">💧</div>
              <div className="text-lg">100M L Water Saved</div>
            </div>
            <div>
              <div className="text-3xl mb-2">🌱</div>
              <div className="text-lg">50,000 Tons CO₂ Reduced</div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function Badge({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm ${className}`}>
      {children}
    </div>
  );
}