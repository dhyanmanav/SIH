import { useState } from 'react';
import { motion } from 'motion/react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { 
  Droplets, Home, TrendingUp, Leaf, Download, Share, 
  Calculator, MapPin, Users, DollarSign, Award,
  Lightbulb, Target, Zap, TreePine
} from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line, AreaChart, Area
} from 'recharts';
import { AssessmentResult, AssessmentInput } from '../lib/rtrwh-engine';
import { StructureVisualizer } from './StructureVisualizer';
import { ImpactAnimation } from './ImpactAnimation';

interface ResultsDashboardProps {
  results: AssessmentResult;
  input: AssessmentInput;
  onNewAssessment: () => void;
}

export function ResultsDashboard({ results, input, onNewAssessment }: ResultsDashboardProps) {
  const [activeTab, setActiveTab] = useState('overview');

  const getFeasibilityColor = (category: string) => {
    switch (category) {
      case 'excellent': return 'text-green-600 bg-green-100';
      case 'good': return 'text-blue-600 bg-blue-100';
      case 'fair': return 'text-yellow-600 bg-yellow-100';
      case 'poor': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const monthlyData = [
    { month: 'Jan', rainfall: results.rainfall.annual * 0.02, harvest: results.potential.annualHarvest * 0.02 },
    { month: 'Feb', rainfall: results.rainfall.annual * 0.03, harvest: results.potential.annualHarvest * 0.03 },
    { month: 'Mar', rainfall: results.rainfall.annual * 0.05, harvest: results.potential.annualHarvest * 0.05 },
    { month: 'Apr', rainfall: results.rainfall.annual * 0.08, harvest: results.potential.annualHarvest * 0.08 },
    { month: 'May', rainfall: results.rainfall.annual * 0.12, harvest: results.potential.annualHarvest * 0.12 },
    { month: 'Jun', rainfall: results.rainfall.annual * 0.20, harvest: results.potential.annualHarvest * 0.20 },
    { month: 'Jul', rainfall: results.rainfall.annual * 0.25, harvest: results.potential.annualHarvest * 0.25 },
    { month: 'Aug', rainfall: results.rainfall.annual * 0.15, harvest: results.potential.annualHarvest * 0.15 },
    { month: 'Sep', rainfall: results.rainfall.annual * 0.08, harvest: results.potential.annualHarvest * 0.08 },
    { month: 'Oct', rainfall: results.rainfall.annual * 0.02, harvest: results.potential.annualHarvest * 0.02 },
    { month: 'Nov', rainfall: results.rainfall.annual * 0.00, harvest: results.potential.annualHarvest * 0.00 },
    { month: 'Dec', rainfall: results.rainfall.annual * 0.00, harvest: results.potential.annualHarvest * 0.00 }
  ];

  const costBreakdown = results.structures.map(structure => ({
    name: structure.type.replace('_', ' ').toUpperCase(),
    cost: structure.cost,
    color: structure.type === 'storage_tank' ? '#3B82F6' : 
           structure.type === 'recharge_pit' ? '#10B981' : '#F59E0B'
  }));

  const savingsProjection = Array.from({ length: 10 }, (_, i) => ({
    year: 2025 + i,
    savings: results.economics.annualSavings * (i + 1),
    cumulative: results.economics.annualSavings * (i + 1) * (i + 2) / 2
  }));

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-3xl mb-2">
                Your RTRWH Assessment Report
              </h1>
              <p className="text-gray-600">
                Comprehensive analysis for {input.location.address}
              </p>
            </div>
            
            <div className="flex gap-3">
              <Button variant="outline">
                <Share className="size-4 mr-2" />
                Share Report
              </Button>
              <Button variant="outline">
                <Download className="size-4 mr-2" />
                Download PDF
              </Button>
              <Button onClick={onNewAssessment} className="bg-blue-600 hover:bg-blue-700">
                New Assessment
              </Button>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid md:grid-cols-4 gap-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
            >
              <Card className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Feasibility Score</p>
                    <p className="text-2xl font-bold">{results.feasibility.score}/100</p>
                  </div>
                  <Badge className={getFeasibilityColor(results.feasibility.category)}>
                    {results.feasibility.category.toUpperCase()}
                  </Badge>
                </div>
                <Progress value={results.feasibility.score} className="mt-3" />
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Annual Harvest</p>
                    <p className="text-2xl font-bold">{Math.round(results.potential.annualHarvest).toLocaleString()}L</p>
                  </div>
                  <Droplets className="size-8 text-blue-600" />
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  ~{Math.round(results.potential.dailyAverage)}L per day
                </p>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
            >
              <Card className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Payback Period</p>
                    <p className="text-2xl font-bold">{results.economics.paybackPeriod.toFixed(1)} yrs</p>
                  </div>
                  <TrendingUp className="size-8 text-green-600" />
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  ROI: {results.economics.roi.toFixed(1)}%
                </p>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
            >
              <Card className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">CO₂ Reduction</p>
                    <p className="text-2xl font-bold">{Math.round(results.environmental.co2Saved)}kg</p>
                  </div>
                  <Leaf className="size-8 text-green-600" />
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  Per year
                </p>
              </Card>
            </motion.div>
          </div>
        </motion.div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="structures">Structures</TabsTrigger>
            <TabsTrigger value="economics">Economics</TabsTrigger>
            <TabsTrigger value="technical">Technical</TabsTrigger>
            <TabsTrigger value="impact">Impact</TabsTrigger>
            <TabsTrigger value="actionplan">Action Plan</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Feasibility Analysis */}
              <Card className="lg:col-span-2 p-6">
                <h3 className="text-lg mb-4 flex items-center">
                  <Target className="size-5 mr-2" />
                  Feasibility Analysis
                </h3>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span>Overall Assessment</span>
                    <Badge className={getFeasibilityColor(results.feasibility.category)}>
                      {results.feasibility.category.toUpperCase()}
                    </Badge>
                  </div>
                  
                  <div className="space-y-2">
                    {results.feasibility.reasons.map((reason, index) => (
                      <div key={index} className="flex items-start gap-2 text-sm">
                        <div className="size-2 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                        <span>{reason}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6">
                  <h4 className="font-medium mb-3">Monthly Harvest Potential</h4>
                  <ResponsiveContainer width="100%" height={250}>
                    <AreaChart data={monthlyData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip formatter={(value: any) => [`${Math.round(value).toLocaleString()}L`, 'Harvest']} />
                      <Area type="monotone" dataKey="harvest" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.3} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </Card>

              {/* Key Metrics */}
              <div className="space-y-6">
                <Card className="p-6">
                  <h3 className="text-lg mb-4 flex items-center">
                    <MapPin className="size-5 mr-2" />
                    Location Insights
                  </h3>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Annual Rainfall</span>
                      <span className="font-medium">{results.rainfall.annual}mm</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Aquifer Type</span>
                      <span className="font-medium capitalize">{results.aquifer.type}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Groundwater Depth</span>
                      <span className="font-medium">{results.aquifer.depth}m</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Water Quality</span>
                      <span className={`font-medium capitalize ${
                        results.aquifer.quality === 'excellent' ? 'text-green-600' :
                        results.aquifer.quality === 'good' ? 'text-blue-600' :
                        results.aquifer.quality === 'moderate' ? 'text-yellow-600' : 'text-red-600'
                      }`}>
                        {results.aquifer.quality}
                      </span>
                    </div>
                  </div>
                </Card>

                <Card className="p-6">
                  <h3 className="text-lg mb-4 flex items-center">
                    <Calculator className="size-5 mr-2" />
                    Quick Calculator
                  </h3>
                  
                  <div className="space-y-3">
                    <div className="bg-blue-50 p-3 rounded">
                      <div className="text-sm text-blue-800">Daily Supply Capacity</div>
                      <div className="text-lg font-bold text-blue-900">
                        {Math.round(results.potential.dailyAverage)}L/day
                      </div>
                    </div>
                    <div className="bg-green-50 p-3 rounded">
                      <div className="text-sm text-green-800">Peak Month Harvest</div>
                      <div className="text-lg font-bold text-green-900">
                        {Math.round(results.potential.peakMonthHarvest).toLocaleString()}L
                      </div>
                    </div>
                    <div className="bg-amber-50 p-3 rounded">
                      <div className="text-sm text-amber-800">Dry Season Buffer</div>
                      <div className="text-lg font-bold text-amber-900">
                        {results.potential.dryMonthSupply} days
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="structures" className="space-y-6">
            <StructureVisualizer 
              structures={results.structures}
              dimensions={results.dimensions}
              input={input}
            />
          </TabsContent>

          <TabsContent value="economics" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Cost Breakdown */}
              <Card className="p-6">
                <h3 className="text-lg mb-4 flex items-center">
                  <DollarSign className="size-5 mr-2" />
                  Investment Breakdown
                </h3>
                
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={costBreakdown}
                      dataKey="cost"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      label={({ name, percent }: any) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {costBreakdown.map((entry, index) => (
                        <Cell key={index} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value: any) => `₹${value.toLocaleString()}`} />
                  </PieChart>
                </ResponsiveContainer>

                <div className="mt-4 space-y-2">
                  <div className="flex justify-between">
                    <span>Total Investment</span>
                    <span className="font-bold">₹{results.economics.totalCost.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-green-600">
                    <span>Available Subsidies</span>
                    <span className="font-bold">
                      -₹{results.economics.subsidies.reduce((sum, s) => sum + s.amount, 0).toLocaleString()}
                    </span>
                  </div>
                  <div className="border-t pt-2 flex justify-between font-bold">
                    <span>Net Investment</span>
                    <span>
                      ₹{(results.economics.totalCost - results.economics.subsidies.reduce((sum, s) => sum + s.amount, 0)).toLocaleString()}
                    </span>
                  </div>
                </div>
              </Card>

              {/* Savings Projection */}
              <Card className="p-6">
                <h3 className="text-lg mb-4 flex items-center">
                  <TrendingUp className="size-5 mr-2" />
                  10-Year Savings Projection
                </h3>
                
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={savingsProjection}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="year" />
                    <YAxis />
                    <Tooltip formatter={(value: any) => `₹${Math.round(value).toLocaleString()}`} />
                    <Line 
                      type="monotone" 
                      dataKey="cumulative" 
                      stroke="#10B981" 
                      strokeWidth={3}
                      name="Cumulative Savings"
                    />
                  </LineChart>
                </ResponsiveContainer>

                <div className="mt-4 grid grid-cols-2 gap-4">
                  <div className="bg-green-50 p-3 rounded">
                    <div className="text-sm text-green-800">Annual Savings</div>
                    <div className="text-lg font-bold text-green-900">
                      ₹{Math.round(results.economics.annualSavings).toLocaleString()}
                    </div>
                  </div>
                  <div className="bg-blue-50 p-3 rounded">
                    <div className="text-sm text-blue-800">ROI</div>
                    <div className="text-lg font-bold text-blue-900">
                      {results.economics.roi.toFixed(1)}%
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            {/* Subsidy Information */}
            <Card className="p-6">
              <h3 className="text-lg mb-4 flex items-center">
                <Award className="size-5 mr-2" />
                Available Government Subsidies
              </h3>
              
              <div className="grid md:grid-cols-2 gap-4">
                {results.economics.subsidies.map((subsidy, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-medium">{subsidy.scheme}</h4>
                      <Badge variant="secondary">₹{subsidy.amount.toLocaleString()}</Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{subsidy.authority}</p>
                    <div className="text-xs space-y-1">
                      <div><strong>Eligibility:</strong> {subsidy.eligibility.join(', ')}</div>
                      <div><strong>Application:</strong> {subsidy.applicationProcess}</div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="technical" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Technical Specifications */}
              <Card className="p-6">
                <h3 className="text-lg mb-4 flex items-center">
                  <Home className="size-5 mr-2" />
                  System Specifications
                </h3>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">Storage Tank</h4>
                    <div className="text-sm space-y-1 text-gray-600">
                      <div>Capacity: {results.dimensions.storageTank.capacity.toLocaleString()}L</div>
                      <div>Diameter: {results.dimensions.storageTank.diameter.toFixed(1)}m</div>
                      <div>Height: {results.dimensions.storageTank.height}m</div>
                      <div>Material: {results.dimensions.storageTank.material}</div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-2">Recharge Pit</h4>
                    <div className="text-sm space-y-1 text-gray-600">
                      <div>Depth: {results.dimensions.rechargePit.depth}m</div>
                      <div>Diameter: {results.dimensions.rechargePit.diameter.toFixed(1)}m</div>
                      <div>Number of Pits: {results.dimensions.rechargePit.numberOfPits}</div>
                      <div>Filter Layers: {results.dimensions.rechargePit.filterLayers.join(' → ')}</div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-2">First Flush Diverter</h4>
                    <div className="text-sm space-y-1 text-gray-600">
                      <div>Capacity: {results.dimensions.firstFlushDiverter.capacity}L</div>
                      <div>Diameter: {results.dimensions.firstFlushDiverter.diameter}mm</div>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Quality Parameters */}
              <Card className="p-6">
                <h3 className="text-lg mb-4 flex items-center">
                  <Droplets className="size-5 mr-2" />
                  Water Quality & Treatment
                </h3>
                
                <div className="space-y-4">
                  <div className="bg-blue-50 p-4 rounded">
                    <h4 className="font-medium mb-2">Recommended Treatment</h4>
                    <ul className="text-sm space-y-1">
                      <li>• First flush diversion (first 2mm rainfall)</li>
                      <li>• Mesh filtering for debris removal</li>
                      <li>• Chlorination for drinking water use</li>
                      <li>• UV sterilization (optional)</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-2">Expected Water Quality</h4>
                    <div className="text-sm space-y-2">
                      <div className="flex justify-between">
                        <span>Turbidity</span>
                        <span className="font-medium">5-10 NTU</span>
                      </div>
                      <div className="flex justify-between">
                        <span>pH</span>
                        <span className="font-medium">6.5-7.5</span>
                      </div>
                      <div className="flex justify-between">
                        <span>TDS</span>
                        <span className="font-medium">50-150 ppm</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Hardness</span>
                        <span className="font-medium">Low-Medium</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-amber-50 p-4 rounded">
                    <h4 className="font-medium mb-2">Maintenance Schedule</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Monthly: Check gutters and downpipes</li>
                      <li>• Quarterly: Clean first flush diverter</li>
                      <li>• Bi-annually: Tank cleaning and disinfection</li>
                      <li>• Annually: System inspection and repairs</li>
                    </ul>
                  </div>
                </div>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="impact" className="space-y-6">
            <ImpactAnimation 
              environmental={results.environmental}
              potential={results.potential}
              dwellers={input.property.dwellers}
            />
          </TabsContent>

          <TabsContent value="actionplan" className="space-y-6">
            <Card className="p-6">
              <h3 className="text-lg mb-4 flex items-center">
                <Lightbulb className="size-5 mr-2" />
                Implementation Roadmap
              </h3>
              
              <div className="space-y-6">
                {/* Phase 1 */}
                <div className="border-l-4 border-blue-500 pl-4">
                  <h4 className="font-medium text-blue-700">Phase 1: Planning & Approvals (Month 1-2)</h4>
                  <ul className="text-sm mt-2 space-y-1">
                    <li>• Site survey and soil percolation test</li>
                    <li>• Apply for government subsidies</li>
                    <li>• Obtain necessary municipal approvals</li>
                    <li>• Finalize contractor and material suppliers</li>
                  </ul>
                </div>
                
                {/* Phase 2 */}
                <div className="border-l-4 border-green-500 pl-4">
                  <h4 className="font-medium text-green-700">Phase 2: Construction (Month 3-4)</h4>
                  <ul className="text-sm mt-2 space-y-1">
                    <li>• Install guttering and downpipe modifications</li>
                    <li>• Construct recharge pits and storage tanks</li>
                    <li>• Install first flush diverters and filtration</li>
                    <li>• Setup distribution and overflow systems</li>
                  </ul>
                </div>
                
                {/* Phase 3 */}
                <div className="border-l-4 border-amber-500 pl-4">
                  <h4 className="font-medium text-amber-700">Phase 3: Testing & Commissioning (Month 5)</h4>
                  <ul className="text-sm mt-2 space-y-1">
                    <li>• System testing and leak detection</li>
                    <li>• Water quality testing and treatment setup</li>
                    <li>• Training on system operation and maintenance</li>
                    <li>• Documentation and warranty activation</li>
                  </ul>
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-green-50 rounded">
                <h4 className="font-medium text-green-800 mb-2">Next Immediate Steps</h4>
                <ol className="text-sm space-y-1 list-decimal list-inside">
                  <li>Contact certified RTRWH contractors in your area</li>
                  <li>Schedule a detailed site survey</li>
                  <li>Apply for subsidies through state water department</li>
                  <li>Begin procurement of major components</li>
                </ol>
              </div>
            </Card>
            
            {/* Contact Information */}
            <div className="grid md:grid-cols-3 gap-4">
              <Card className="p-4">
                <h4 className="font-medium mb-2">Technical Support</h4>
                <p className="text-sm text-gray-600 mb-2">CGWB Regional Office</p>
                <p className="text-sm">📞 1800-XXX-XXXX</p>
                <p className="text-sm">✉️ support@cgwb.gov.in</p>
              </Card>
              
              <Card className="p-4">
                <h4 className="font-medium mb-2">Certified Contractors</h4>
                <p className="text-sm text-gray-600 mb-2">Find verified installers</p>
                <Button size="sm" variant="outline" className="w-full">
                  Browse Contractors
                </Button>
              </Card>
              
              <Card className="p-4">
                <h4 className="font-medium mb-2">Community Forum</h4>
                <p className="text-sm text-gray-600 mb-2">Connect with others</p>
                <Button size="sm" variant="outline" className="w-full">
                  Join Discussion
                </Button>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}