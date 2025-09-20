import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  Home, Droplets, ArrowDown, Zap, Settings, 
  Info, CheckCircle, AlertTriangle, Lightbulb
} from 'lucide-react';
import { StructureRecommendation, StructureDimensions, AssessmentInput } from '../lib/rtrwh-engine';

interface StructureVisualizerProps {
  structures: StructureRecommendation[];
  dimensions: StructureDimensions;
  input: AssessmentInput;
}

export function StructureVisualizer({ structures, dimensions, input }: StructureVisualizerProps) {
  const [selectedStructure, setSelectedStructure] = useState(0);
  const [animateFlow, setAnimateFlow] = useState(false);

  const triggerAnimation = () => {
    setAnimateFlow(true);
    setTimeout(() => setAnimateFlow(false), 3000);
  };

  return (
    <div className="space-y-6">
      {/* 3D System Visualization */}
      <Card className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg flex items-center">
            <Home className="size-5 mr-2" />
            System Visualization
          </h3>
          <Button onClick={triggerAnimation} variant="outline">
            <Zap className="size-4 mr-2" />
            Simulate Rain Flow
          </Button>
        </div>

        {/* 3D Isometric View */}
        <div className="relative bg-gradient-to-b from-sky-100 to-green-100 rounded-lg p-8 overflow-hidden min-h-[400px]">
          {/* Sky with animated rain */}
          <AnimatePresence>
            {animateFlow && (
              <>
                {Array.from({ length: 20 }).map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ y: -50, x: Math.random() * 100 + '%', opacity: 0 }}
                    animate={{ y: 300, opacity: [0, 1, 1, 0] }}
                    transition={{ duration: 2, delay: Math.random() * 1 }}
                    className="absolute w-0.5 h-8 bg-blue-400"
                    style={{ left: `${Math.random() * 100}%` }}
                  />
                ))}
              </>
            )}
          </AnimatePresence>

          {/* Building Structure */}
          <div className="relative mx-auto max-w-md">
            {/* Roof */}
            <motion.div 
              className="relative"
              animate={animateFlow ? { scale: [1, 1.02, 1] } : {}}
              transition={{ duration: 0.5 }}
            >
              <div className="bg-gradient-to-r from-red-400 to-red-500 h-16 transform perspective-100 -skew-y-12 mb-2 rounded-t-lg relative">
                {/* Gutters */}
                <div className="absolute bottom-0 left-0 right-0 h-2 bg-gray-300 rounded-full" />
                
                {/* Water collection animation */}
                <AnimatePresence>
                  {animateFlow && (
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: '100%' }}
                      transition={{ duration: 1, delay: 1 }}
                      className="absolute bottom-0 left-0 h-2 bg-blue-400 rounded-full"
                    />
                  )}
                </AnimatePresence>
              </div>

              {/* Roof Area Label */}
              <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
                <Badge variant="secondary" className="text-xs">
                  {input.property.roofArea} sq.m
                </Badge>
              </div>
            </motion.div>

            {/* Building */}
            <div className="bg-gradient-to-b from-yellow-200 to-yellow-300 h-32 border-2 border-yellow-400 relative">
              {/* Windows */}
              <div className="absolute top-4 left-4 w-6 h-6 bg-blue-200 border border-blue-400" />
              <div className="absolute top-4 right-4 w-6 h-6 bg-blue-200 border border-blue-400" />
              <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 w-8 h-12 bg-brown-300 border border-brown-500" />
            </div>

            {/* Downpipe */}
            <motion.div 
              className="absolute right-0 top-16 w-2 bg-gray-400"
              style={{ height: animateFlow ? '120px' : '100px' }}
            >
              <AnimatePresence>
                {animateFlow && (
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: '100%' }}
                    transition={{ duration: 1.5, delay: 1.5 }}
                    className="w-full bg-blue-400"
                  />
                )}
              </AnimatePresence>
            </motion.div>

            {/* First Flush Diverter */}
            <motion.div 
              className="absolute right-8 top-32 w-8 h-8 bg-orange-400 rounded border-2 border-orange-500"
              animate={animateFlow ? { scale: [1, 1.2, 1] } : {}}
              transition={{ duration: 0.5, delay: 2 }}
            >
              <div className="absolute -bottom-2 -right-6 text-xs bg-white px-1 rounded whitespace-nowrap">
                First Flush
              </div>
            </motion.div>

            {/* Storage Tank */}
            <motion.div 
              className="absolute left-8 top-40 w-16 h-20 bg-blue-500 rounded-lg border-2 border-blue-600 relative"
              animate={animateFlow ? { 
                backgroundColor: ['#3B82F6', '#1D4ED8', '#3B82F6'] 
              } : {}}
              transition={{ duration: 2, delay: 2.5 }}
            >
              <div className="absolute top-2 left-2 right-2 bottom-8 bg-blue-300 rounded" />
              <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs bg-white px-1 rounded">
                {(dimensions.storageTank.capacity / 1000).toFixed(1)}k L
              </div>
              
              {/* Water level animation */}
              <AnimatePresence>
                {animateFlow && (
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: '60%' }}
                    transition={{ duration: 1, delay: 2.5 }}
                    className="absolute bottom-8 left-2 right-2 bg-blue-400 rounded-b"
                  />
                )}
              </AnimatePresence>
            </motion.div>

            {/* Recharge Pit */}
            <motion.div 
              className="absolute right-16 top-56 w-12 h-8 bg-brown-400 rounded border-2 border-brown-500 relative"
              animate={animateFlow ? { scale: [1, 1.1, 1] } : {}}
              transition={{ duration: 0.5, delay: 3 }}
            >
              <div className="absolute top-1 left-1 right-1 bottom-1 bg-brown-300 rounded" />
              <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs bg-white px-1 rounded">
                Recharge Pit
              </div>
              
              {/* Infiltration animation */}
              <AnimatePresence>
                {animateFlow && (
                  <>
                    {Array.from({ length: 5 }).map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ y: 0, opacity: 1 }}
                        animate={{ y: 20, opacity: 0 }}
                        transition={{ duration: 1, delay: 3 + i * 0.2 }}
                        className="absolute w-1 h-1 bg-blue-400 rounded-full"
                        style={{ left: `${20 + i * 15}%`, top: '50%' }}
                      />
                    ))}
                  </>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Ground Level */}
            <div className="absolute top-64 left-0 right-0 h-2 bg-green-500" />
            <div className="absolute top-66 left-0 right-0 h-8 bg-brown-600" />

            {/* Underground Aquifer */}
            <div className="absolute top-74 left-0 right-0 h-6 bg-blue-800 opacity-30">
              <div className="text-xs text-white text-center pt-1">
                Aquifer ({results.aquifer.depth}m depth)
              </div>
            </div>
          </div>

          {/* Flow Arrows */}
          <AnimatePresence>
            {animateFlow && (
              <>
                {/* Roof to Gutter */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ delay: 1 }}
                  className="absolute top-20 left-1/2 transform -translate-x-1/2"
                >
                  <ArrowDown className="size-4 text-blue-600" />
                </motion.div>
                
                {/* Gutter to Downpipe */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ delay: 1.5 }}
                  className="absolute top-32 right-4"
                >
                  <ArrowDown className="size-4 text-blue-600" />
                </motion.div>
                
                {/* To Storage */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ delay: 2.5 }}
                  className="absolute top-36 left-24 transform rotate-45"
                >
                  <ArrowDown className="size-4 text-blue-600" />
                </motion.div>
                
                {/* To Recharge */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ delay: 3 }}
                  className="absolute top-52 right-20"
                >
                  <ArrowDown className="size-4 text-blue-600" />
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>

        {/* Legend */}
        <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-blue-400 rounded" />
            <span>Water Flow</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-orange-400 rounded" />
            <span>First Flush Diverter</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-blue-500 rounded" />
            <span>Storage Tank</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-brown-400 rounded" />
            <span>Recharge Pit</span>
          </div>
        </div>
      </Card>

      {/* Structure Details */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Structure List */}
        <Card className="lg:col-span-1 p-6">
          <h3 className="text-lg mb-4">Recommended Structures</h3>
          
          <div className="space-y-3">
            {structures.map((structure, index) => (
              <motion.div
                key={index}
                className={`p-3 border rounded-lg cursor-pointer transition-all ${
                  selectedStructure === index ? 'border-blue-500 bg-blue-50' : 'hover:border-gray-300'
                }`}
                onClick={() => setSelectedStructure(index)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-medium text-sm capitalize">
                    {structure.type.replace('_', ' ')}
                  </h4>
                  <Badge 
                    variant={structure.priority === 1 ? 'default' : 'secondary'}
                    className="text-xs"
                  >
                    Priority {structure.priority}
                  </Badge>
                </div>
                
                <div className="text-xs text-gray-600 mb-2">
                  Suitability: {structure.suitability}%
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">
                    ₹{structure.cost.toLocaleString()}
                  </span>
                  <div className="flex items-center gap-1">
                    {structure.suitability >= 80 ? (
                      <CheckCircle className="size-4 text-green-500" />
                    ) : structure.suitability >= 60 ? (
                      <Info className="size-4 text-blue-500" />
                    ) : (
                      <AlertTriangle className="size-4 text-yellow-500" />
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </Card>

        {/* Structure Details */}
        <Card className="lg:col-span-2 p-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedStructure}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg capitalize">
                  {structures[selectedStructure].type.replace('_', ' ')} Details
                </h3>
                <Badge className={
                  structures[selectedStructure].suitability >= 80 ? 'bg-green-100 text-green-800' :
                  structures[selectedStructure].suitability >= 60 ? 'bg-blue-100 text-blue-800' :
                  'bg-yellow-100 text-yellow-800'
                }>
                  {structures[selectedStructure].suitability}% Suitable
                </Badge>
              </div>

              <p className="text-gray-600 mb-6">
                {structures[selectedStructure].description}
              </p>

              <Tabs defaultValue="specs" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="specs">Specifications</TabsTrigger>
                  <TabsTrigger value="benefits">Benefits</TabsTrigger>
                  <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
                </TabsList>

                <TabsContent value="specs" className="space-y-4">
                  {renderSpecifications(structures[selectedStructure], dimensions)}
                </TabsContent>

                <TabsContent value="benefits" className="space-y-4">
                  <div className="grid gap-3">
                    {structures[selectedStructure].benefits.map((benefit, index) => (
                      <div key={index} className="flex items-start gap-2">
                        <CheckCircle className="size-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{benefit}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 p-4 bg-green-50 rounded-lg">
                    <h4 className="font-medium text-green-800 mb-2">Expected Performance</h4>
                    <div className="text-sm text-green-700 space-y-1">
                      <div>Capacity: {structures[selectedStructure].capacity.toLocaleString()} L</div>
                      <div>Expected Life: {structures[selectedStructure].expectedLife} years</div>
                      <div>ROI: {((structures[selectedStructure].capacity * 0.05 * 365) / structures[selectedStructure].cost * 100).toFixed(1)}%</div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="maintenance" className="space-y-4">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Settings className="size-5 text-blue-600" />
                      <div>
                        <div className="font-medium">Frequency</div>
                        <div className="text-sm text-gray-600">
                          {structures[selectedStructure].maintenanceFrequency}
                        </div>
                      </div>
                    </div>

                    <div className="p-4 bg-blue-50 rounded-lg">
                      <h4 className="font-medium text-blue-800 mb-2 flex items-center">
                        <Lightbulb className="size-4 mr-2" />
                        Maintenance Tips
                      </h4>
                      <ul className="text-sm text-blue-700 space-y-1">
                        {getMaintenanceTips(structures[selectedStructure].type).map((tip, index) => (
                          <li key={index}>• {tip}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="text-sm text-gray-600">
                      <strong>Annual Maintenance Cost:</strong> ₹{(structures[selectedStructure].cost * 0.03).toLocaleString()}
                      <br />
                      <span className="text-xs">(~3% of installation cost)</span>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </motion.div>
          </AnimatePresence>
        </Card>
      </div>
    </div>
  );
}

function renderSpecifications(structure: StructureRecommendation, dimensions: StructureDimensions) {
  switch (structure.type) {
    case 'storage_tank':
      return (
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <h4 className="font-medium mb-2">Tank Specifications</h4>
            <div className="text-sm space-y-1">
              <div>Capacity: {dimensions.storageTank.capacity.toLocaleString()} L</div>
              <div>Diameter: {dimensions.storageTank.diameter.toFixed(1)} m</div>
              <div>Height: {dimensions.storageTank.height} m</div>
              <div>Material: {dimensions.storageTank.material}</div>
            </div>
          </div>
          <div>
            <h4 className="font-medium mb-2">Installation Requirements</h4>
            <div className="text-sm space-y-1">
              <div>Foundation: RCC platform</div>
              <div>Inlet: 100mm PVC pipe</div>
              <div>Outlet: 50mm PVC pipe</div>
              <div>Overflow: 75mm PVC pipe</div>
            </div>
          </div>
        </div>
      );
    
    case 'recharge_pit':
      return (
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <h4 className="font-medium mb-2">Pit Specifications</h4>
            <div className="text-sm space-y-1">
              <div>Depth: {dimensions.rechargePit.depth} m</div>
              <div>Diameter: {dimensions.rechargePit.diameter.toFixed(1)} m</div>
              <div>Number of Pits: {dimensions.rechargePit.numberOfPits}</div>
              <div>Recharge Rate: {structure.capacity} L/day</div>
            </div>
          </div>
          <div>
            <h4 className="font-medium mb-2">Filter Media</h4>
            <div className="text-sm space-y-1">
              {dimensions.rechargePit.filterLayers.map((layer, index) => (
                <div key={index}>Layer {index + 1}: {layer}</div>
              ))}
            </div>
          </div>
        </div>
      );
    
    default:
      return (
        <div>
          <h4 className="font-medium mb-2">General Specifications</h4>
          <div className="text-sm space-y-1">
            <div>Capacity: {structure.capacity.toLocaleString()} L</div>
            <div>Expected Life: {structure.expectedLife} years</div>
            <div>Installation Cost: ₹{structure.cost.toLocaleString()}</div>
          </div>
        </div>
      );
  }
}

function getMaintenanceTips(type: string): string[] {
  switch (type) {
    case 'storage_tank':
      return [
        'Clean tank every 6 months to prevent algae growth',
        'Check for cracks and leaks regularly',
        'Ensure proper chlorination for drinking water',
        'Inspect inlet and outlet pipes for blockages'
      ];
    
    case 'recharge_pit':
      return [
        'Remove debris and silt from pit surface',
        'Replace top filter layer annually',
        'Check for proper water infiltration',
        'Maintain vegetation around the pit'
      ];
    
    default:
      return [
        'Regular inspection and cleaning',
        'Check for structural integrity',
        'Maintain proper drainage',
        'Follow manufacturer guidelines'
      ];
  }
}