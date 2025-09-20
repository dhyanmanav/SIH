import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import { 
  BookOpen, Play, CheckCircle, ArrowRight, ArrowLeft,
  Droplets, Cloud, Filter, Wrench, Leaf, Users
} from 'lucide-react';

interface EducationalModuleProps {
  onComplete?: () => void;
}

export function EducationalModule({ onComplete }: EducationalModuleProps) {
  const [currentModule, setCurrentModule] = useState(0);
  const [completedModules, setCompletedModules] = useState<number[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);

  const modules = [
    {
      id: 0,
      title: "Understanding Rainwater Harvesting",
      duration: "5 min",
      topics: [
        "What is RTRWH and why it matters",
        "Global water crisis and local solutions",
        "Benefits for households and communities",
        "Success stories from across India"
      ],
      content: {
        intro: "Rainwater harvesting is an ancient practice that's more relevant today than ever before.",
        animation: "water-cycle",
        keyPoints: [
          "Every 1mm of rainfall on 1 sq.m roof = 1 liter of water",
          "India receives 4000 BCM of rainfall annually",
          "Only 8% is currently harvested effectively",
          "RTRWH can meet 40-60% of household water needs"
        ]
      },
      icon: Droplets,
      color: "blue"
    },
    {
      id: 1,
      title: "Science Behind Water Collection",
      duration: "7 min",
      topics: [
        "Rainfall patterns and monsoon cycles",
        "Runoff coefficients and calculations",
        "Water quality considerations",
        "Seasonal planning strategies"
      ],
      content: {
        intro: "Understanding the science helps optimize your rainwater harvesting system.",
        animation: "rainfall-calculation",
        keyPoints: [
          "Monsoon brings 70-80% of annual rainfall",
          "Concrete roofs have 85% runoff efficiency",
          "First flush should be diverted for quality",
          "Storage capacity = Monthly demand × dry months"
        ]
      },
      icon: Cloud,
      color: "gray"
    },
    {
      id: 2,
      title: "System Components & Design",
      duration: "8 min",
      topics: [
        "Catchment area optimization",
        "Gutters and downpipes",
        "First flush diverters",
        "Storage and filtration systems"
      ],
      content: {
        intro: "Each component plays a crucial role in efficient water harvesting.",
        animation: "system-components",
        keyPoints: [
          "Gutter size = Roof area ÷ 50 (in sq.m)",
          "First flush = 2mm × roof area",
          "Tank material affects water quality",
          "Overflow prevents structural damage"
        ]
      },
      icon: Filter,
      color: "green"
    },
    {
      id: 3,
      title: "Installation & Maintenance",
      duration: "6 min",
      topics: [
        "DIY vs professional installation",
        "Common mistakes to avoid",
        "Seasonal maintenance checklist",
        "Troubleshooting guide"
      ],
      content: {
        intro: "Proper installation and maintenance ensure long-term system efficiency.",
        animation: "maintenance-cycle",
        keyPoints: [
          "Professional installation recommended for >5000L systems",
          "Clean gutters before every monsoon",
          "Check tank integrity every 6 months",
          "Water testing annually for drinking use"
        ]
      },
      icon: Wrench,
      color: "orange"
    },
    {
      id: 4,
      title: "Environmental Impact",
      duration: "5 min",
      topics: [
        "Groundwater recharge benefits",
        "Reducing urban flooding",
        "Carbon footprint reduction",
        "Biodiversity conservation"
      ],
      content: {
        intro: "RTRWH creates positive environmental impacts beyond your property.",
        animation: "environmental-impact",
        keyPoints: [
          "1000L recharged = 500L available to neighbors",
          "Reduces stormwater runoff by 60-80%",
          "Saves 4kWh energy per 1000L harvested",
          "Improves local microclimate"
        ]
      },
      icon: Leaf,
      color: "green"
    },
    {
      id: 5,
      title: "Community & Policy",
      duration: "4 min",
      topics: [
        "Government schemes and subsidies",
        "Building community awareness",
        "Regulatory compliance",
        "Future of water management"
      ],
      content: {
        intro: "RTRWH is part of larger water security and climate adaptation strategies.",
        animation: "community-network",
        keyPoints: [
          "50+ government schemes available",
          "Mandatory in many cities for >300 sq.m plots",
          "Community systems 3x more cost-effective",
          "Key to achieving water security by 2030"
        ]
      },
      icon: Users,
      color: "purple"
    }
  ];

  const currentModuleData = modules[currentModule];
  const progress = (completedModules.length / modules.length) * 100;

  const startModule = () => {
    setIsPlaying(true);
    // Simulate module completion after animation
    setTimeout(() => {
      setIsPlaying(false);
      if (!completedModules.includes(currentModule)) {
        setCompletedModules([...completedModules, currentModule]);
      }
    }, 3000);
  };

  const nextModule = () => {
    if (currentModule < modules.length - 1) {
      setCurrentModule(currentModule + 1);
    }
  };

  const prevModule = () => {
    if (currentModule > 0) {
      setCurrentModule(currentModule - 1);
    }
  };

  const renderAnimation = (type: string) => {
    switch (type) {
      case 'water-cycle':
        return <WaterCycleAnimation isPlaying={isPlaying} />;
      case 'rainfall-calculation':
        return <RainfallCalculationAnimation isPlaying={isPlaying} />;
      case 'system-components':
        return <SystemComponentsAnimation isPlaying={isPlaying} />;
      case 'environmental-impact':
        return <EnvironmentalImpactAnimation isPlaying={isPlaying} />;
      default:
        return <DefaultAnimation isPlaying={isPlaying} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl mb-2 flex items-center justify-center">
            <BookOpen className="size-8 mr-3" />
            RTRWH Learning Center
          </h1>
          <p className="text-gray-600 mb-4">
            Master the science and practice of rooftop rainwater harvesting
          </p>
          
          <div className="max-w-md mx-auto">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>Progress</span>
              <span>{completedModules.length}/{modules.length} modules</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Module Navigation */}
          <Card className="lg:col-span-1 p-6">
            <h3 className="font-medium mb-4">Learning Modules</h3>
            
            <div className="space-y-3">
              {modules.map((module, index) => (
                <motion.div
                  key={module.id}
                  className={`p-3 border rounded-lg cursor-pointer transition-all ${
                    currentModule === index 
                      ? 'border-blue-500 bg-blue-50' 
                      : completedModules.includes(index)
                      ? 'border-green-500 bg-green-50'
                      : 'hover:border-gray-300'
                  }`}
                  onClick={() => setCurrentModule(index)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <module.icon className={`size-4 ${
                        module.color === 'blue' ? 'text-blue-600' :
                        module.color === 'green' ? 'text-green-600' :
                        module.color === 'orange' ? 'text-orange-600' :
                        module.color === 'purple' ? 'text-purple-600' :
                        'text-gray-600'
                      }`} />
                      <span className="text-sm font-medium">{module.title}</span>
                    </div>
                    
                    {completedModules.includes(index) && (
                      <CheckCircle className="size-4 text-green-600" />
                    )}
                  </div>
                  
                  <div className="text-xs text-gray-500">
                    {module.duration}
                  </div>
                </motion.div>
              ))}
            </div>
          </Card>

          {/* Main Content */}
          <Card className="lg:col-span-3 p-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentModule}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                {/* Module Header */}
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <currentModuleData.icon className={`size-6 ${
                        currentModuleData.color === 'blue' ? 'text-blue-600' :
                        currentModuleData.color === 'green' ? 'text-green-600' :
                        currentModuleData.color === 'orange' ? 'text-orange-600' :
                        currentModuleData.color === 'purple' ? 'text-purple-600' :
                        'text-gray-600'
                      }`} />
                      <h2 className="text-xl">{currentModuleData.title}</h2>
                    </div>
                    <p className="text-gray-600">{currentModuleData.content.intro}</p>
                  </div>
                  
                  <Badge variant="secondary">
                    {currentModuleData.duration}
                  </Badge>
                </div>

                {/* Animation Area */}
                <div className="bg-gradient-to-br from-blue-50 to-green-50 rounded-lg p-8 mb-6 min-h-[300px] flex items-center justify-center">
                  {renderAnimation(currentModuleData.content.animation)}
                </div>

                {/* Play Button */}
                <div className="text-center mb-6">
                  <Button 
                    onClick={startModule}
                    disabled={isPlaying}
                    size="lg"
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    <Play className="size-5 mr-2" />
                    {isPlaying ? 'Playing Animation...' : 'Start Learning'}
                  </Button>
                </div>

                {/* Key Points */}
                <div className="mb-6">
                  <h3 className="font-medium mb-3">Key Learning Points</h3>
                  <div className="grid md:grid-cols-2 gap-3">
                    {currentModuleData.content.keyPoints.map((point, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-start gap-2 p-3 bg-white rounded border"
                      >
                        <div className="size-2 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                        <span className="text-sm">{point}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Topics Covered */}
                <div className="mb-6">
                  <h3 className="font-medium mb-3">Topics Covered</h3>
                  <div className="flex flex-wrap gap-2">
                    {currentModuleData.topics.map((topic, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {topic}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Navigation */}
                <div className="flex justify-between">
                  <Button
                    variant="outline"
                    onClick={prevModule}
                    disabled={currentModule === 0}
                  >
                    <ArrowLeft className="size-4 mr-2" />
                    Previous
                  </Button>
                  
                  <Button
                    onClick={currentModule === modules.length - 1 ? onComplete : nextModule}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    {currentModule === modules.length - 1 ? 'Complete Course' : 'Next Module'}
                    <ArrowRight className="size-4 ml-2" />
                  </Button>
                </div>
              </motion.div>
            </AnimatePresence>
          </Card>
        </div>
      </div>
    </div>
  );
}

// Animation Components
function WaterCycleAnimation({ isPlaying }: { isPlaying: boolean }) {
  return (
    <div className="relative w-full h-full">
      {/* Sun */}
      <motion.div
        animate={isPlaying ? { rotate: 360 } : {}}
        transition={{ duration: 3, repeat: isPlaying ? Infinity : 0, ease: "linear" }}
        className="absolute top-4 right-4 w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center"
      >
        ☀️
      </motion.div>

      {/* Clouds */}
      <motion.div
        animate={isPlaying ? { x: [0, 20, 0] } : {}}
        transition={{ duration: 2, repeat: isPlaying ? Infinity : 0 }}
        className="absolute top-8 left-1/4 text-4xl"
      >
        ☁️
      </motion.div>

      {/* Rain */}
      <AnimatePresence>
        {isPlaying && (
          <>
            {Array.from({ length: 10 }).map((_, i) => (
              <motion.div
                key={i}
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 200, opacity: [0, 1, 0] }}
                transition={{ duration: 1, delay: i * 0.1, repeat: Infinity }}
                className="absolute w-0.5 h-8 bg-blue-400"
                style={{ left: `${30 + i * 6}%` }}
              />
            ))}
          </>
        )}
      </AnimatePresence>

      {/* House */}
      <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2">
        <div className="w-24 h-16 bg-yellow-200 border-2 border-yellow-400" />
        <div className="w-28 h-4 bg-red-400 transform -translate-x-2 -translate-y-2" />
      </div>

      {/* Water Collection */}
      <motion.div
        animate={isPlaying ? { scale: [1, 1.2, 1] } : {}}
        transition={{ duration: 1, delay: 1 }}
        className="absolute bottom-8 right-1/4 w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white"
      >
        💧
      </motion.div>
    </div>
  );
}

function RainfallCalculationAnimation({ isPlaying }: { isPlaying: boolean }) {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isPlaying ? 1 : 0.3 }}
        className="text-center"
      >
        <div className="text-6xl mb-4">🏠</div>
        <motion.div
          animate={isPlaying ? { scale: [1, 1.1, 1] } : {}}
          transition={{ duration: 1, repeat: isPlaying ? 3 : 0 }}
          className="text-lg font-bold"
        >
          Roof Area × Rainfall × Runoff Coefficient = Harvest Potential
        </motion.div>
        <div className="mt-4 text-sm text-gray-600">
          100 sq.m × 1000mm × 0.85 = 85,000 liters/year
        </div>
      </motion.div>
    </div>
  );
}

function SystemComponentsAnimation({ isPlaying }: { isPlaying: boolean }) {
  return (
    <div className="relative w-full h-full">
      {/* Components appearing one by one */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isPlaying ? 1 : 0.3 }}
        transition={{ delay: 0 }}
        className="absolute top-4 left-1/4 text-center"
      >
        <div className="text-2xl">🏠</div>
        <div className="text-xs">Catchment</div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isPlaying ? 1 : 0.3 }}
        transition={{ delay: 0.5 }}
        className="absolute top-16 left-1/2 text-center"
      >
        <div className="text-2xl">〰️</div>
        <div className="text-xs">Gutters</div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isPlaying ? 1 : 0.3 }}
        transition={{ delay: 1 }}
        className="absolute top-32 right-1/4 text-center"
      >
        <div className="text-2xl">⚪</div>
        <div className="text-xs">First Flush</div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isPlaying ? 1 : 0.3 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-16 left-1/3 text-center"
      >
        <div className="text-2xl">🏺</div>
        <div className="text-xs">Storage</div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isPlaying ? 1 : 0.3 }}
        transition={{ delay: 2 }}
        className="absolute bottom-16 right-1/3 text-center"
      >
        <div className="text-2xl">🕳️</div>
        <div className="text-xs">Recharge</div>
      </motion.div>
    </div>
  );
}

function EnvironmentalImpactAnimation({ isPlaying }: { isPlaying: boolean }) {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <motion.div
        animate={isPlaying ? { scale: [1, 1.2, 1] } : {}}
        transition={{ duration: 2, repeat: isPlaying ? 2 : 0 }}
        className="text-center"
      >
        <div className="text-6xl mb-4">🌍</div>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>💧 Water Saved</div>
          <div>🌱 Carbon Reduced</div>
          <div>⚡ Energy Saved</div>
          <div>👥 Community Benefit</div>
        </div>
      </motion.div>
    </div>
  );
}

function DefaultAnimation({ isPlaying }: { isPlaying: boolean }) {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <motion.div
        animate={isPlaying ? { rotate: 360, scale: [1, 1.2, 1] } : {}}
        transition={{ duration: 2 }}
        className="text-6xl"
      >
        💧
      </motion.div>
    </div>
  );
}