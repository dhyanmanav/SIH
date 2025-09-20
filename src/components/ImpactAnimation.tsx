import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { 
  Droplets, TreePine, Users, Globe, Zap, 
  Heart, Leaf, Award, TrendingUp, Home
} from 'lucide-react';

interface ImpactAnimationProps {
  environmental: {
    co2Saved: number;
    energySaved: number;
    groundwaterRecharged: number;
    communityImpact: string;
  };
  potential: {
    annualHarvest: number;
    dailyAverage: number;
  };
  dwellers: number;
}

export function ImpactAnimation({ environmental, potential, dwellers }: ImpactAnimationProps) {
  const [animationPhase, setAnimationPhase] = useState(0);
  const [counters, setCounters] = useState({
    water: 0,
    co2: 0,
    energy: 0,
    people: 0
  });

  const impacts = [
    {
      icon: Droplets,
      title: "Water Conservation",
      value: potential.annualHarvest,
      unit: "L/year",
      color: "blue",
      description: "Fresh water saved from traditional sources",
      counter: counters.water
    },
    {
      icon: TreePine,
      title: "Carbon Footprint",
      value: environmental.co2Saved,
      unit: "kg CO₂/year",
      color: "green",
      description: "Equivalent to planting " + Math.round(environmental.co2Saved / 20) + " trees",
      counter: counters.co2
    },
    {
      icon: Zap,
      title: "Energy Savings",
      value: environmental.energySaved,
      unit: "kWh/year",
      color: "yellow",
      description: "Reduced pumping and treatment energy",
      counter: counters.energy
    },
    {
      icon: Users,
      title: "Community Benefit",
      value: dwellers * 2.5,
      unit: "people",
      color: "purple",
      description: "Neighbors benefiting from groundwater recharge",
      counter: counters.people
    }
  ];

  const startAnimation = () => {
    setAnimationPhase(1);
    
    // Animate counters
    impacts.forEach((impact, index) => {
      const duration = 2000;
      const steps = 60;
      const increment = impact.value / steps;
      
      for (let i = 0; i <= steps; i++) {
        setTimeout(() => {
          setCounters(prev => ({
            ...prev,
            [index === 0 ? 'water' : index === 1 ? 'co2' : index === 2 ? 'energy' : 'people']: 
              Math.min(impact.value, i * increment)
          }));
        }, (i * duration) / steps + index * 500);
      }
    });
  };

  const resetAnimation = () => {
    setAnimationPhase(0);
    setCounters({ water: 0, co2: 0, energy: 0, people: 0 });
  };

  return (
    <div className="space-y-6">
      {/* Animation Control */}
      <Card className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg flex items-center">
            <Globe className="size-5 mr-2" />
            Environmental & Social Impact Visualization
          </h3>
          <div className="flex gap-2">
            <Button onClick={startAnimation} disabled={animationPhase === 1}>
              Start Impact Animation
            </Button>
            <Button onClick={resetAnimation} variant="outline">
              Reset
            </Button>
          </div>
        </div>

        {/* Impact Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {impacts.map((impact, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className={`p-6 border-2 ${
                impact.color === 'blue' ? 'border-blue-200 bg-blue-50' :
                impact.color === 'green' ? 'border-green-200 bg-green-50' :
                impact.color === 'yellow' ? 'border-yellow-200 bg-yellow-50' :
                'border-purple-200 bg-purple-50'
              }`}>
                <div className="flex items-center justify-between mb-4">
                  <impact.icon className={`size-8 ${
                    impact.color === 'blue' ? 'text-blue-600' :
                    impact.color === 'green' ? 'text-green-600' :
                    impact.color === 'yellow' ? 'text-yellow-600' :
                    'text-purple-600'
                  }`} />
                  <motion.div
                    animate={animationPhase === 1 ? { scale: [1, 1.2, 1] } : {}}
                    transition={{ duration: 0.5, delay: index * 0.5 }}
                    className={`text-2xl font-bold ${
                      impact.color === 'blue' ? 'text-blue-700' :
                      impact.color === 'green' ? 'text-green-700' :
                      impact.color === 'yellow' ? 'text-yellow-700' :
                      'text-purple-700'
                    }`}
                  >
                    {Math.round(impact.counter).toLocaleString()}
                  </motion.div>
                </div>
                
                <h4 className="font-medium mb-2">{impact.title}</h4>
                <p className="text-sm text-gray-600 mb-3">{impact.description}</p>
                
                <div className="text-xs text-gray-500">
                  Target: {Math.round(impact.value).toLocaleString()} {impact.unit}
                </div>
                
                <Progress 
                  value={(impact.counter / impact.value) * 100} 
                  className={`mt-2 ${
                    impact.color === 'blue' ? '[&>div]:bg-blue-600' :
                    impact.color === 'green' ? '[&>div]:bg-green-600' :
                    impact.color === 'yellow' ? '[&>div]:bg-yellow-600' :
                    '[&>div]:bg-purple-600'
                  }`}
                />
              </Card>
            </motion.div>
          ))}
        </div>
      </Card>

      {/* Community Impact Visualization */}
      <Card className="p-6">
        <h3 className="text-lg mb-6 flex items-center">
          <Heart className="size-5 mr-2" />
          Community Impact Ripple Effect
        </h3>

        <div className="relative bg-gradient-to-br from-blue-50 to-green-50 rounded-lg p-8 min-h-[300px] overflow-hidden">
          {/* Central House */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <motion.div
              animate={animationPhase === 1 ? { scale: [1, 1.1, 1] } : {}}
              transition={{ duration: 1, repeat: 3 }}
              className="relative"
            >
              <Home className="size-12 text-blue-600" />
              <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs font-medium whitespace-nowrap">
                Your Home
              </div>
            </motion.div>

            {/* Ripple Effects */}
            <AnimatePresence>
              {animationPhase === 1 && (
                <>
                  {Array.from({ length: 3 }).map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ scale: 0, opacity: 1 }}
                      animate={{ scale: 4 + i * 2, opacity: 0 }}
                      transition={{ duration: 3, delay: i * 1 }}
                      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 border-2 border-blue-400 rounded-full"
                    />
                  ))}
                </>
              )}
            </AnimatePresence>
          </div>

          {/* Surrounding Houses */}
          {Array.from({ length: 8 }).map((_, i) => {
            const angle = (i * 45) * Math.PI / 180;
            const radius = 80;
            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * radius;
            
            return (
              <motion.div
                key={i}
                className="absolute"
                style={{
                  left: `calc(50% + ${x}px)`,
                  top: `calc(50% + ${y}px)`,
                  transform: 'translate(-50%, -50%)'
                }}
                initial={{ opacity: 0.3 }}
                animate={animationPhase === 1 ? { 
                  opacity: [0.3, 1, 0.8],
                  scale: [1, 1.1, 1]
                } : {}}
                transition={{ duration: 2, delay: 1 + i * 0.2 }}
              >
                <Home className="size-6 text-green-600" />
              </motion.div>
            );
          })}

          {/* Impact Labels */}
          <div className="absolute top-4 left-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={animationPhase === 1 ? { opacity: 1 } : {}}
              transition={{ delay: 2 }}
              className="bg-white p-3 rounded-lg shadow-md"
            >
              <div className="text-sm font-medium text-green-700">Groundwater Recharge</div>
              <div className="text-xs text-gray-600">Benefiting entire neighborhood</div>
            </motion.div>
          </div>

          <div className="absolute top-4 right-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={animationPhase === 1 ? { opacity: 1 } : {}}
              transition={{ delay: 2.5 }}
              className="bg-white p-3 rounded-lg shadow-md"
            >
              <div className="text-sm font-medium text-blue-700">Water Security</div>
              <div className="text-xs text-gray-600">Reduced dependency on external sources</div>
            </motion.div>
          </div>

          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
            <motion.div
              initial={{ opacity: 0 }}
              animate={animationPhase === 1 ? { opacity: 1 } : {}}
              transition={{ delay: 3 }}
              className="bg-white p-3 rounded-lg shadow-md text-center"
            >
              <div className="text-sm font-medium text-purple-700">Community Resilience</div>
              <div className="text-xs text-gray-600">Climate change adaptation</div>
            </motion.div>
          </div>
        </div>
      </Card>

      {/* Impact Timeline */}
      <Card className="p-6">
        <h3 className="text-lg mb-6 flex items-center">
          <TrendingUp className="size-5 mr-2" />
          Long-term Impact Timeline
        </h3>

        <div className="space-y-6">
          {[
            {
              period: "Year 1",
              milestone: "System Installation & First Harvest",
              impact: `${Math.round(potential.annualHarvest).toLocaleString()}L water harvested`,
              icon: Droplets,
              color: "blue"
            },
            {
              period: "Year 2-3",
              milestone: "Aquifer Recharge & Community Adoption",
              impact: `${Math.round(environmental.groundwaterRecharged * 2).toLocaleString()}L groundwater recharged`,
              icon: TreePine,
              color: "green"
            },
            {
              period: "Year 4-5",
              milestone: "Neighborhood Water Security",
              impact: `${Math.round(dwellers * 2.5)} people benefit from improved water access`,
              icon: Users,
              color: "purple"
            },
            {
              period: "Year 6-10",
              milestone: "Climate Resilience & Awards",
              impact: `${Math.round(environmental.co2Saved * 10)}kg CO₂ saved, community recognized`,
              icon: Award,
              color: "yellow"
            }
          ].map((milestone, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.2 }}
              className="flex items-start gap-4"
            >
              <div className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center ${
                milestone.color === 'blue' ? 'bg-blue-100' :
                milestone.color === 'green' ? 'bg-green-100' :
                milestone.color === 'purple' ? 'bg-purple-100' :
                'bg-yellow-100'
              }`}>
                <milestone.icon className={`size-6 ${
                  milestone.color === 'blue' ? 'text-blue-600' :
                  milestone.color === 'green' ? 'text-green-600' :
                  milestone.color === 'purple' ? 'text-purple-600' :
                  'text-yellow-600'
                }`} />
              </div>
              
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-medium">{milestone.period}</span>
                  <span className="text-sm px-2 py-1 bg-gray-100 rounded text-gray-600">
                    {milestone.milestone}
                  </span>
                </div>
                <p className="text-sm text-gray-600">{milestone.impact}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </Card>

      {/* SDG Alignment */}
      <Card className="p-6">
        <h3 className="text-lg mb-6 flex items-center">
          <Globe className="size-5 mr-2" />
          UN Sustainable Development Goals Alignment
        </h3>

        <div className="grid md:grid-cols-3 gap-4">
          {[
            {
              sdg: "SDG 6",
              title: "Clean Water & Sanitation",
              description: "Ensuring sustainable water management and access",
              progress: 85
            },
            {
              sdg: "SDG 11",
              title: "Sustainable Cities",
              description: "Building resilient and sustainable communities",
              progress: 75
            },
            {
              sdg: "SDG 13",
              title: "Climate Action",
              description: "Taking action to combat climate change impacts",
              progress: 70
            }
          ].map((sdg, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="border rounded-lg p-4"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium text-blue-600">{sdg.sdg}</span>
                <span className="text-sm text-gray-500">{sdg.progress}%</span>
              </div>
              <h4 className="font-medium mb-2">{sdg.title}</h4>
              <p className="text-sm text-gray-600 mb-3">{sdg.description}</p>
              <Progress value={sdg.progress} className="[&>div]:bg-blue-600" />
            </motion.div>
          ))}
        </div>
      </Card>
    </div>
  );
}