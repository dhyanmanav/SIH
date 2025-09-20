import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Slider } from './ui/slider';
import { Progress } from './ui/progress';
import { ArrowRight, ArrowLeft, MapPin, Home, Users, DollarSign, CheckCircle } from 'lucide-react';
import { AssessmentInput } from '../lib/rtrwh-engine';

interface AssessmentWizardProps {
  onComplete: (data: AssessmentInput) => void;
  onBack: () => void;
}

export function AssessmentWizard({ onComplete, onBack }: AssessmentWizardProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<Partial<AssessmentInput>>({
    location: { latitude: 0, longitude: 0, address: '', pincode: '', state: '', district: '' },
    property: { roofArea: 100, roofType: 'concrete', buildingHeight: 3, availableSpace: 20, dwellers: 4, waterConsumption: 500 },
    preferences: { budget: 50000, maintenanceLevel: 'medium', primaryUse: 'domestic' }
  });

  const steps = [
    {
      title: "Location Details",
      icon: MapPin,
      description: "Tell us about your location"
    },
    {
      title: "Property Information", 
      icon: Home,
      description: "Details about your building and roof"
    },
    {
      title: "Household Details",
      icon: Users,
      description: "Family size and water usage"
    },
    {
      title: "Preferences",
      icon: DollarSign,
      description: "Budget and maintenance preferences"
    }
  ];

  const progress = ((currentStep + 1) / steps.length) * 100;

  const updateFormData = (section: keyof AssessmentInput, updates: any) => {
    setFormData(prev => ({
      ...prev,
      [section]: { ...prev[section], ...updates }
    }));
  };

  const canProceed = () => {
    switch (currentStep) {
      case 0:
        return formData.location?.address && formData.location?.pincode;
      case 1:
        return formData.property?.roofArea && formData.property?.roofType;
      case 2:
        return formData.property?.dwellers && formData.property?.waterConsumption;
      case 3:
        return formData.preferences?.budget;
      default:
        return false;
    }
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete(formData as AssessmentInput);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="address">Full Address</Label>
                <Input
                  id="address"
                  placeholder="Enter your complete address"
                  value={formData.location?.address || ''}
                  onChange={(e) => updateFormData('location', { address: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="pincode">PIN Code</Label>
                <Input
                  id="pincode"
                  placeholder="Enter PIN code"
                  value={formData.location?.pincode || ''}
                  onChange={(e) => updateFormData('location', { pincode: e.target.value })}
                />
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="state">State</Label>
                <Select onValueChange={(value) => updateFormData('location', { state: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select state" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="maharashtra">Maharashtra</SelectItem>
                    <SelectItem value="karnataka">Karnataka</SelectItem>
                    <SelectItem value="delhi">Delhi</SelectItem>
                    <SelectItem value="gujarat">Gujarat</SelectItem>
                    <SelectItem value="rajasthan">Rajasthan</SelectItem>
                    <SelectItem value="tamil-nadu">Tamil Nadu</SelectItem>
                    <SelectItem value="west-bengal">West Bengal</SelectItem>
                    <SelectItem value="uttar-pradesh">Uttar Pradesh</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="district">District</Label>
                <Input
                  id="district"
                  placeholder="Enter district"
                  value={formData.location?.district || ''}
                  onChange={(e) => updateFormData('location', { district: e.target.value })}
                />
              </div>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-sm text-blue-800">
                <CheckCircle className="size-4 inline mr-2" />
                We'll use this location to determine local rainfall patterns, aquifer types, and applicable government subsidies.
              </p>
            </div>
          </motion.div>
        );

      case 1:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label>Roof Area (sq. meters)</Label>
                <div className="mt-2">
                  <Slider
                    value={[formData.property?.roofArea || 100]}
                    onValueChange={(value) => updateFormData('property', { roofArea: value[0] })}
                    max={500}
                    min={20}
                    step={10}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-gray-500 mt-1">
                    <span>20 sq.m</span>
                    <span className="font-medium">{formData.property?.roofArea || 100} sq.m</span>
                    <span>500 sq.m</span>
                  </div>
                </div>
              </div>
              
              <div>
                <Label>Available Space for Storage (sq. meters)</Label>
                <div className="mt-2">
                  <Slider
                    value={[formData.property?.availableSpace || 20]}
                    onValueChange={(value) => updateFormData('property', { availableSpace: value[0] })}
                    max={100}
                    min={5}
                    step={5}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-gray-500 mt-1">
                    <span>5 sq.m</span>
                    <span className="font-medium">{formData.property?.availableSpace || 20} sq.m</span>
                    <span>100 sq.m</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label>Roof Type</Label>
                <Select onValueChange={(value) => updateFormData('property', { roofType: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select roof type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="concrete">Concrete/RCC</SelectItem>
                    <SelectItem value="metal">Metal Sheets</SelectItem>
                    <SelectItem value="tile">Clay/Concrete Tiles</SelectItem>
                    <SelectItem value="thatched">Thatched</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label>Building Height (meters)</Label>
                <div className="mt-2">
                  <Slider
                    value={[formData.property?.buildingHeight || 3]}
                    onValueChange={(value) => updateFormData('property', { buildingHeight: value[0] })}
                    max={20}
                    min={1}
                    step={0.5}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-gray-500 mt-1">
                    <span>1m</span>
                    <span className="font-medium">{formData.property?.buildingHeight || 3}m</span>
                    <span>20m</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-green-50 p-4 rounded-lg">
              <p className="text-sm text-green-800">
                <CheckCircle className="size-4 inline mr-2" />
                Larger roof areas and proper storage space significantly increase your rainwater harvesting potential.
              </p>
            </div>
          </motion.div>
        );

      case 2:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label>Number of Residents</Label>
                <div className="mt-2">
                  <Slider
                    value={[formData.property?.dwellers || 4]}
                    onValueChange={(value) => updateFormData('property', { dwellers: value[0] })}
                    max={15}
                    min={1}
                    step={1}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-gray-500 mt-1">
                    <span>1 person</span>
                    <span className="font-medium">{formData.property?.dwellers || 4} people</span>
                    <span>15 people</span>
                  </div>
                </div>
              </div>
              
              <div>
                <Label>Daily Water Consumption (liters)</Label>
                <div className="mt-2">
                  <Slider
                    value={[formData.property?.waterConsumption || 500]}
                    onValueChange={(value) => updateFormData('property', { waterConsumption: value[0] })}
                    max={2000}
                    min={100}
                    step={50}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-gray-500 mt-1">
                    <span>100L</span>
                    <span className="font-medium">{formData.property?.waterConsumption || 500}L</span>
                    <span>2000L</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-medium mb-2">Water Usage Guidelines</h4>
              <div className="text-sm text-blue-800 space-y-1">
                <p>• Basic needs: 50-100L per person per day</p>
                <p>• Comfortable usage: 100-150L per person per day</p>
                <p>• Includes drinking, cooking, bathing, washing</p>
                <p>• Current estimate: ~{Math.round((formData.property?.waterConsumption || 500) / (formData.property?.dwellers || 4))}L per person per day</p>
              </div>
            </div>
          </motion.div>
        );

      case 3:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div>
              <Label>Budget for RTRWH System (₹)</Label>
              <div className="mt-2">
                <Slider
                  value={[formData.preferences?.budget || 50000]}
                  onValueChange={(value) => updateFormData('preferences', { budget: value[0] })}
                  max={200000}
                  min={10000}
                  step={5000}
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-gray-500 mt-1">
                  <span>₹10,000</span>
                  <span className="font-medium">₹{(formData.preferences?.budget || 50000).toLocaleString()}</span>
                  <span>₹2,00,000</span>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label>Maintenance Level Preference</Label>
                <Select onValueChange={(value) => updateFormData('preferences', { maintenanceLevel: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select maintenance level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low (Annual cleaning)</SelectItem>
                    <SelectItem value="medium">Medium (Bi-annual maintenance)</SelectItem>
                    <SelectItem value="high">High (Monthly checks)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label>Primary Use of Harvested Water</Label>
                <Select onValueChange={(value) => updateFormData('preferences', { primaryUse: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select primary use" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="drinking">Drinking (with filtration)</SelectItem>
                    <SelectItem value="domestic">Domestic (cooking, bathing)</SelectItem>
                    <SelectItem value="irrigation">Garden/Plant irrigation</SelectItem>
                    <SelectItem value="groundwater_recharge">Groundwater recharge</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="bg-amber-50 p-4 rounded-lg">
              <h4 className="font-medium mb-2">Government Subsidies Available</h4>
              <div className="text-sm text-amber-800 space-y-1">
                <p>• Up to 50% subsidy under PM Krishi Sinchayee Yojana</p>
                <p>• State-specific incentives up to ₹25,000</p>
                <p>• Tax benefits under Section 80CCG</p>
                <p>• Priority for water-stressed areas</p>
              </div>
            </div>
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <Button 
            variant="ghost" 
            onClick={onBack}
            className="mb-4"
          >
            <ArrowLeft className="size-4 mr-2" />
            Back to Home
          </Button>
          
          <h1 className="text-3xl mb-2">
            RTRWH Assessment Wizard
          </h1>
          <p className="text-gray-600">
            Let's assess your rooftop rainwater harvesting potential
          </p>
        </div>

        {/* Progress */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            {steps.map((step, index) => (
              <div 
                key={index}
                className={`flex items-center ${index < steps.length - 1 ? 'flex-1' : ''}`}
              >
                <div className={`
                  flex items-center justify-center size-10 rounded-full border-2 
                  ${index <= currentStep 
                    ? 'bg-blue-600 border-blue-600 text-white' 
                    : 'bg-white border-gray-300 text-gray-400'
                  }
                `}>
                  {index < currentStep ? (
                    <CheckCircle className="size-5" />
                  ) : (
                    <step.icon className="size-5" />
                  )}
                </div>
                {index < steps.length - 1 && (
                  <div className={`
                    flex-1 h-0.5 mx-4
                    ${index < currentStep ? 'bg-blue-600' : 'bg-gray-300'}
                  `} />
                )}
              </div>
            ))}
          </div>
          
          <Progress value={progress} className="h-2" />
          <div className="text-center mt-2 text-sm text-gray-600">
            Step {currentStep + 1} of {steps.length}
          </div>
        </div>

        {/* Content */}
        <Card className="p-8">
          <div className="mb-6">
            <h2 className="text-xl mb-2">
              {steps[currentStep].title}
            </h2>
            <p className="text-gray-600">
              {steps[currentStep].description}
            </p>
          </div>

          <AnimatePresence mode="wait">
            {renderStepContent()}
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex justify-between mt-8">
            <Button
              variant="outline"
              onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
              disabled={currentStep === 0}
            >
              <ArrowLeft className="size-4 mr-2" />
              Previous
            </Button>
            
            <Button
              onClick={handleNext}
              disabled={!canProceed()}
              className="bg-blue-600 hover:bg-blue-700"
            >
              {currentStep === steps.length - 1 ? 'Generate Assessment' : 'Next'}
              <ArrowRight className="size-4 ml-2" />
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}