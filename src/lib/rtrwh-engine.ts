// Advanced RTRWH Calculation Engine
// Based on CGWB guidelines and scientific principles

export interface AssessmentInput {
  location: {
    latitude: number;
    longitude: number;
    address: string;
    pincode: string;
    state: string;
    district: string;
  };
  property: {
    roofArea: number; // in sq meters
    roofType: 'concrete' | 'metal' | 'tile' | 'thatched';
    buildingHeight: number; // in meters
    availableSpace: number; // in sq meters for storage tanks
    dwellers: number;
    waterConsumption: number; // liters per day
  };
  preferences: {
    budget: number;
    maintenanceLevel: 'low' | 'medium' | 'high';
    primaryUse: 'drinking' | 'domestic' | 'irrigation' | 'groundwater_recharge';
  };
}

export interface AssessmentResult {
  feasibility: {
    score: number; // 0-100
    category: 'excellent' | 'good' | 'fair' | 'poor';
    reasons: string[];
  };
  rainfall: {
    annual: number; // mm
    monsoon: number; // mm
    postMonsoon: number; // mm
    preMonsoon: number; // mm
    reliabilityIndex: number;
  };
  potential: {
    annualHarvest: number; // liters
    dailyAverage: number; // liters
    peakMonthHarvest: number; // liters
    dryMonthSupply: number; // days
    runoffCoefficient: number;
  };
  aquifer: {
    type: string;
    depth: number; // meters
    quality: 'excellent' | 'good' | 'moderate' | 'poor';
    rechargeCapacity: number; // liters per day
    transmissivity: number;
  };
  structures: StructureRecommendation[];
  economics: {
    totalCost: number;
    annualSavings: number;
    paybackPeriod: number; // years
    roi: number; // percentage
    maintenanceCost: number; // annual
    subsidies: SubsidyInfo[];
  };
  environmental: {
    co2Saved: number; // kg per year
    energySaved: number; // kWh per year
    groundwaterRecharged: number; // liters per year
    communityImpact: string;
  };
  dimensions: StructureDimensions;
}

export interface StructureRecommendation {
  type: 'storage_tank' | 'recharge_pit' | 'recharge_trench' | 'percolation_tank' | 'check_dam';
  priority: number;
  suitability: number; // 0-100
  description: string;
  capacity: number; // liters or cubic meters
  cost: number;
  maintenanceFrequency: string;
  expectedLife: number; // years
  benefits: string[];
}

export interface StructureDimensions {
  storageTank: {
    capacity: number; // liters
    diameter: number; // meters
    height: number; // meters
    material: string;
  };
  rechargePit: {
    depth: number; // meters
    diameter: number; // meters
    filterLayers: string[];
    numberOfPits: number;
  };
  rechargeTrench: {
    length: number; // meters
    width: number; // meters
    depth: number; // meters
    slope: number; // percentage
  };
  firstFlushDiverter: {
    capacity: number; // liters
    diameter: number; // mm
  };
}

export interface SubsidyInfo {
  scheme: string;
  authority: string;
  amount: number;
  eligibility: string[];
  applicationProcess: string;
}

// Mock GIS and rainfall data for different regions
const RAINFALL_DATA: Record<string, any> = {
  'mumbai': { annual: 2200, monsoon: 1800, reliability: 0.85 },
  'delhi': { annual: 650, monsoon: 500, reliability: 0.75 },
  'bangalore': { annual: 900, monsoon: 650, reliability: 0.80 },
  'chennai': { annual: 1200, monsoon: 850, reliability: 0.70 },
  'kolkata': { annual: 1600, monsoon: 1200, reliability: 0.85 },
  'hyderabad': { annual: 750, monsoon: 550, reliability: 0.75 },
  'pune': { annual: 650, monsoon: 500, reliability: 0.80 },
  'ahmedabad': { annual: 800, monsoon: 650, reliability: 0.75 },
  'jaipur': { annual: 550, monsoon: 450, reliability: 0.70 },
  'lucknow': { annual: 1000, monsoon: 800, reliability: 0.80 },
  'default': { annual: 800, monsoon: 600, reliability: 0.75 }
};

const AQUIFER_DATA: Record<string, any> = {
  'alluvial': { depth: 15, quality: 'good', rechargeRate: 0.8, transmissivity: 150 },
  'basalt': { depth: 25, quality: 'excellent', rechargeRate: 0.6, transmissivity: 200 },
  'sandstone': { depth: 20, quality: 'good', rechargeRate: 0.7, transmissivity: 120 },
  'granite': { depth: 35, quality: 'moderate', rechargeRate: 0.4, transmissivity: 80 },
  'limestone': { depth: 30, quality: 'good', rechargeRate: 0.9, transmissivity: 300 },
  'default': { depth: 25, quality: 'good', rechargeRate: 0.6, transmissivity: 150 }
};

const RUNOFF_COEFFICIENTS: Record<string, number> = {
  'concrete': 0.85,
  'metal': 0.90,
  'tile': 0.80,
  'thatched': 0.60
};

export class RTRWHEngine {
  static calculateAssessment(input: AssessmentInput): AssessmentResult {
    const rainfall = this.getRainfallData(input.location);
    const aquifer = this.getAquiferData(input.location);
    const runoffCoefficient = RUNOFF_COEFFICIENTS[input.property.roofType] || 0.75;
    
    // Calculate potential harvesting
    const annualHarvest = (input.property.roofArea * rainfall.annual * runoffCoefficient * 0.8) / 1000; // cubic meters
    const annualHarvestLiters = annualHarvest * 1000;
    
    // Calculate feasibility score
    const feasibility = this.calculateFeasibility(input, annualHarvestLiters, rainfall);
    
    // Generate structure recommendations
    const structures = this.recommendStructures(input, annualHarvestLiters);
    
    // Calculate economics
    const economics = this.calculateEconomics(input, structures, annualHarvestLiters);
    
    // Calculate environmental impact
    const environmental = this.calculateEnvironmentalImpact(annualHarvestLiters, input.property.dwellers);
    
    // Calculate structure dimensions
    const dimensions = this.calculateDimensions(input, annualHarvestLiters);
    
    return {
      feasibility,
      rainfall: {
        annual: rainfall.annual,
        monsoon: rainfall.monsoon,
        postMonsoon: rainfall.annual * 0.15,
        preMonsoon: rainfall.annual * 0.05,
        reliabilityIndex: rainfall.reliability
      },
      potential: {
        annualHarvest: annualHarvestLiters,
        dailyAverage: annualHarvestLiters / 365,
        peakMonthHarvest: (annualHarvestLiters * 0.4), // 40% in peak month
        dryMonthSupply: Math.floor(annualHarvestLiters / (input.property.waterConsumption * 30)),
        runoffCoefficient
      },
      aquifer: {
        type: aquifer.type,
        depth: aquifer.depth,
        quality: aquifer.quality,
        rechargeCapacity: aquifer.rechargeRate * annualHarvestLiters / 365,
        transmissivity: aquifer.transmissivity
      },
      structures,
      economics,
      environmental,
      dimensions
    };
  }
  
  private static getRainfallData(location: any) {
    const city = location.address.toLowerCase();
    for (const [key, data] of Object.entries(RAINFALL_DATA)) {
      if (city.includes(key)) {
        return { ...data, type: this.getRegionalAquifer(key) };
      }
    }
    return { ...RAINFALL_DATA.default, type: 'alluvial' };
  }
  
  private static getAquiferData(location: any) {
    const city = location.address.toLowerCase();
    const aquiferType = this.getRegionalAquifer(city);
    return { ...AQUIFER_DATA[aquiferType] || AQUIFER_DATA.default, type: aquiferType };
  }
  
  private static getRegionalAquifer(city: string): string {
    const aquiferMap: Record<string, string> = {
      'mumbai': 'basalt', 'pune': 'basalt', 'hyderabad': 'granite',
      'delhi': 'alluvial', 'lucknow': 'alluvial', 'kolkata': 'alluvial',
      'bangalore': 'granite', 'chennai': 'sandstone', 'jaipur': 'limestone'
    };
    return aquiferMap[city] || 'alluvial';
  }
  
  private static calculateFeasibility(input: AssessmentInput, harvest: number, rainfall: any): any {
    let score = 0;
    const reasons: string[] = [];
    
    // Rainfall adequacy (30 points)
    if (rainfall.annual > 1000) {
      score += 30;
      reasons.push("Excellent rainfall (>1000mm annually)");
    } else if (rainfall.annual > 600) {
      score += 20;
      reasons.push("Good rainfall (600-1000mm annually)");
    } else {
      score += 10;
      reasons.push("Moderate rainfall (<600mm annually)");
    }
    
    // Roof area adequacy (25 points)
    if (input.property.roofArea > 100) {
      score += 25;
      reasons.push("Large roof area (>100 sq.m)");
    } else if (input.property.roofArea > 50) {
      score += 18;
      reasons.push("Medium roof area (50-100 sq.m)");
    } else {
      score += 10;
      reasons.push("Small roof area (<50 sq.m)");
    }
    
    // Storage space (20 points)
    if (input.property.availableSpace > 20) {
      score += 20;
      reasons.push("Adequate space for storage systems");
    } else if (input.property.availableSpace > 10) {
      score += 12;
      reasons.push("Limited but workable space");
    } else {
      score += 5;
      reasons.push("Very limited space for storage");
    }
    
    // Water demand vs harvest (25 points)
    const annualDemand = input.property.waterConsumption * 365;
    const harvestRatio = harvest / annualDemand;
    if (harvestRatio > 0.8) {
      score += 25;
      reasons.push("Harvest can meet 80%+ of water needs");
    } else if (harvestRatio > 0.4) {
      score += 18;
      reasons.push("Harvest can meet 40-80% of water needs");
    } else {
      score += 10;
      reasons.push("Harvest can supplement water needs");
    }
    
    let category: 'excellent' | 'good' | 'fair' | 'poor';
    if (score >= 80) category = 'excellent';
    else if (score >= 65) category = 'good';
    else if (score >= 45) category = 'fair';
    else category = 'poor';
    
    return { score, category, reasons };
  }
  
  private static recommendStructures(input: AssessmentInput, harvest: number): StructureRecommendation[] {
    const structures: StructureRecommendation[] = [];
    
    // Storage tank recommendation
    structures.push({
      type: 'storage_tank',
      priority: 1,
      suitability: Math.min(95, 60 + (input.property.availableSpace / 2)),
      description: 'Primary storage tank for collected rainwater',
      capacity: Math.min(harvest * 0.3, input.property.availableSpace * 1000),
      cost: this.calculateStorageCost(Math.min(harvest * 0.3, input.property.availableSpace * 1000)),
      maintenanceFrequency: 'Every 6 months',
      expectedLife: 15,
      benefits: ['Direct water supply', 'Reduced water bills', 'Emergency backup']
    });
    
    // Recharge pit recommendation
    if (input.property.availableSpace > 10) {
      structures.push({
        type: 'recharge_pit',
        priority: 2,
        suitability: Math.min(90, 50 + (harvest / 10000)),
        description: 'Groundwater recharge through percolation pit',
        capacity: harvest * 0.7,
        cost: 15000 + (harvest / 1000) * 500,
        maintenanceFrequency: 'Annual cleaning',
        expectedLife: 20,
        benefits: ['Groundwater recharge', 'Aquifer replenishment', 'Community benefit']
      });
    }
    
    // Recharge trench for larger areas
    if (input.property.roofArea > 100) {
      structures.push({
        type: 'recharge_trench',
        priority: 3,
        suitability: Math.min(85, 40 + (input.property.roofArea / 10)),
        description: 'Linear recharge system for continuous infiltration',
        capacity: harvest * 0.5,
        cost: 25000 + (input.property.roofArea * 50),
        maintenanceFrequency: 'Bi-annual',
        expectedLife: 25,
        benefits: ['Large volume recharge', 'Soil moisture improvement', 'Erosion control']
      });
    }
    
    return structures.sort((a, b) => b.suitability - a.suitability);
  }
  
  private static calculateStorageCost(capacity: number): number {
    // Cost calculation based on capacity in liters
    if (capacity <= 1000) return 8000;
    if (capacity <= 5000) return 15000 + (capacity - 1000) * 3;
    if (capacity <= 10000) return 27000 + (capacity - 5000) * 2.5;
    return 39500 + (capacity - 10000) * 2;
  }
  
  private static calculateEconomics(input: AssessmentInput, structures: StructureRecommendation[], harvest: number): any {
    const totalCost = structures.reduce((sum, s) => sum + s.cost, 0) + 10000; // Additional fittings
    const waterSavedLiters = Math.min(harvest, input.property.waterConsumption * 365 * 0.8);
    const annualSavings = waterSavedLiters * 0.05; // ₹0.05 per liter saved
    const maintenanceCost = totalCost * 0.03; // 3% of initial cost
    
    const subsidies: SubsidyInfo[] = [
      {
        scheme: 'Pradhan Mantri Krishi Sinchayee Yojana',
        authority: 'Ministry of Agriculture',
        amount: Math.min(totalCost * 0.5, 50000),
        eligibility: ['Rural areas', 'Farmers', 'Water stressed regions'],
        applicationProcess: 'Apply through state agriculture department'
      },
      {
        scheme: 'State Rainwater Harvesting Subsidy',
        authority: 'State Water Resource Department',
        amount: Math.min(totalCost * 0.3, 25000),
        eligibility: ['Urban households', 'Below 300 sq.m plot'],
        applicationProcess: 'Online application through state portal'
      }
    ];
    
    return {
      totalCost,
      annualSavings,
      paybackPeriod: totalCost / (annualSavings - maintenanceCost),
      roi: ((annualSavings - maintenanceCost) / totalCost) * 100,
      maintenanceCost,
      subsidies
    };
  }
  
  private static calculateEnvironmentalImpact(harvest: number, dwellers: number): any {
    return {
      co2Saved: harvest * 0.0003, // 0.3g CO2 per liter of treated water saved
      energySaved: harvest * 0.004, // 4Wh per liter for pumping/treatment
      groundwaterRecharged: harvest * 0.7, // 70% goes to groundwater
      communityImpact: `Benefiting ${Math.ceil(dwellers * 2.5)} people in the neighborhood through groundwater recharge`
    };
  }
  
  private static calculateDimensions(input: AssessmentInput, harvest: number): StructureDimensions {
    const storageCapacity = Math.min(harvest * 0.3, input.property.availableSpace * 1000);
    const tankDiameter = Math.sqrt((storageCapacity / 1000) / (Math.PI * 2)); // Assuming 2m height
    
    return {
      storageTank: {
        capacity: storageCapacity,
        diameter: Math.max(1.5, tankDiameter),
        height: 2.0,
        material: storageCapacity > 5000 ? 'RCC with polymer lining' : 'HDPE'
      },
      rechargePit: {
        depth: 3.0,
        diameter: Math.max(1.0, Math.sqrt(harvest / 10000)),
        filterLayers: ['Coarse aggregate (40mm)', 'Medium aggregate (20mm)', 'Fine aggregate (10mm)', 'Sand'],
        numberOfPits: Math.ceil(harvest / 50000)
      },
      rechargeTrench: {
        length: Math.max(10, input.property.roofArea / 10),
        width: 1.0,
        depth: 1.5,
        slope: 2.0
      },
      firstFlushDiverter: {
        capacity: input.property.roofArea * 2, // 2mm of first flush
        diameter: input.property.roofArea > 100 ? 150 : 100
      }
    };
  }
}