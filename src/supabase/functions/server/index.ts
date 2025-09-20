import { Hono } from 'npm:hono';
import { cors } from 'npm:hono/cors';
import { logger } from 'npm:hono/logger';
import { createClient } from 'jsr:@supabase/supabase-js@2';
import * as kv from './kv_store.tsx';

const app = new Hono();

// Enable CORS for all origins
app.use('*', cors({
  origin: '*',
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'Authorization'],
}));

app.use('*', logger(console.log));

const supabase = createClient(
  Deno.env.get('SUPABASE_URL')!,
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
);

// Assessment endpoints
app.post('/make-server-546b30d6/assessments', async (c) => {
  try {
    const body = await c.req.json();
    const { userId, assessmentData, results } = body;
    
    // Generate unique assessment ID
    const assessmentId = crypto.randomUUID();
    const timestamp = new Date().toISOString();
    
    // Store assessment data
    const assessmentRecord = {
      id: assessmentId,
      userId: userId || 'anonymous',
      input: assessmentData,
      results: results,
      createdAt: timestamp,
      location: assessmentData.location,
      feasibilityScore: results.feasibility.score,
      annualHarvest: results.potential.annualHarvest,
      totalCost: results.economics.totalCost
    };
    
    await kv.set(`assessment:${assessmentId}`, assessmentRecord);
    
    // Update user stats if authenticated
    if (userId && userId !== 'anonymous') {
      const userStatsKey = `user_stats:${userId}`;
      const existingStats = await kv.get(userStatsKey) || {
        totalAssessments: 0,
        totalWaterHarvest: 0,
        totalCostSavings: 0,
        joinedDate: timestamp
      };
      
      existingStats.totalAssessments += 1;
      existingStats.totalWaterHarvest += results.potential.annualHarvest;
      existingStats.totalCostSavings += results.economics.annualSavings;
      existingStats.lastAssessment = timestamp;
      
      await kv.set(userStatsKey, existingStats);
    }
    
    // Update community stats
    await updateCommunityStats(results);
    
    return c.json({ 
      success: true, 
      assessmentId,
      message: 'Assessment saved successfully'
    });
    
  } catch (error) {
    console.log('Error saving assessment:', error);
    return c.json({ 
      success: false, 
      error: 'Failed to save assessment' 
    }, 500);
  }
});

app.get('/make-server-546b30d6/assessments/:userId', async (c) => {
  try {
    const userId = c.req.param('userId');
    
    // Get all assessments by prefix
    const assessments = await kv.getByPrefix('assessment:');
    
    // Filter by user
    const userAssessments = assessments
      .filter(item => item.value.userId === userId)
      .map(item => item.value)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    
    return c.json({ 
      success: true, 
      assessments: userAssessments 
    });
    
  } catch (error) {
    console.log('Error fetching assessments:', error);
    return c.json({ 
      success: false, 
      error: 'Failed to fetch assessments' 
    }, 500);
  }
});

// Community endpoints
app.get('/make-server-546b30d6/community/stats', async (c) => {
  try {
    const stats = await kv.get('community_stats') || {
      totalMembers: 52847,
      totalAssessments: 8934,
      totalWaterSaved: 125600000,
      totalCo2Reduced: 47800,
      activeCommunities: 1247
    };
    
    return c.json({ success: true, stats });
    
  } catch (error) {
    console.log('Error fetching community stats:', error);
    return c.json({ 
      success: false, 
      error: 'Failed to fetch community stats' 
    }, 500);
  }
});

app.post('/make-server-546b30d6/community/stories', async (c) => {
  try {
    const body = await c.req.json();
    const { userId, story } = body;
    
    const storyId = crypto.randomUUID();
    const timestamp = new Date().toISOString();
    
    const storyRecord = {
      id: storyId,
      userId,
      ...story,
      createdAt: timestamp,
      likes: 0,
      comments: 0,
      status: 'pending_review'
    };
    
    await kv.set(`story:${storyId}`, storyRecord);
    
    return c.json({ 
      success: true, 
      storyId,
      message: 'Story submitted for review'
    });
    
  } catch (error) {
    console.log('Error saving story:', error);
    return c.json({ 
      success: false, 
      error: 'Failed to save story' 
    }, 500);
  }
});

app.get('/make-server-546b30d6/community/stories', async (c) => {
  try {
    const filter = c.req.query('filter') || 'all';
    const limit = parseInt(c.req.query('limit') || '10');
    
    const stories = await kv.getByPrefix('story:');
    
    let filteredStories = stories
      .map(item => item.value)
      .filter(story => story.status === 'approved')
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    
    if (filter !== 'all') {
      filteredStories = filteredStories.filter(story => 
        story.tags && story.tags.includes(filter)
      );
    }
    
    return c.json({ 
      success: true, 
      stories: filteredStories.slice(0, limit)
    });
    
  } catch (error) {
    console.log('Error fetching stories:', error);
    return c.json({ 
      success: false, 
      error: 'Failed to fetch stories' 
    }, 500);
  }
});

// Weather data endpoint
app.get('/make-server-546b30d6/weather/:location', async (c) => {
  try {
    const location = c.req.param('location');
    
    // Mock weather data - in production, integrate with IMD or other weather APIs
    const weatherData = {
      location,
      current: {
        temperature: 28,
        humidity: 65,
        rainfall: 2.5,
        windSpeed: 12
      },
      forecast: {
        next7Days: generateWeatherForecast(),
        monsoonPrediction: {
          onset: '2025-06-15',
          withdrawal: '2025-09-30',
          expectedRainfall: 850,
          reliability: 0.78
        }
      },
      historical: {
        averageAnnual: 750,
        last5Years: [820, 680, 790, 850, 720],
        wettest: { year: 2023, rainfall: 850 },
        driest: { year: 2021, rainfall: 680 }
      }
    };
    
    return c.json({ success: true, weather: weatherData });
    
  } catch (error) {
    console.log('Error fetching weather data:', error);
    return c.json({ 
      success: false, 
      error: 'Failed to fetch weather data' 
    }, 500);
  }
});

// Subsidies and schemes endpoint
app.get('/make-server-546b30d6/subsidies/:state', async (c) => {
  try {
    const state = c.req.param('state').toLowerCase();
    
    const subsidyData = await getSubsidyData(state);
    
    return c.json({ success: true, subsidies: subsidyData });
    
  } catch (error) {
    console.log('Error fetching subsidy data:', error);
    return c.json({ 
      success: false, 
      error: 'Failed to fetch subsidy data' 
    }, 500);
  }
});

// Contractor directory endpoint
app.get('/make-server-546b30d6/contractors/:location', async (c) => {
  try {
    const location = c.req.param('location');
    
    // Mock contractor data
    const contractors = [
      {
        id: '1',
        name: 'AquaTech Solutions',
        rating: 4.8,
        experience: '8 years',
        specialization: ['RTRWH', 'Groundwater Recharge'],
        contact: '+91-9876543210',
        email: 'info@aquatech.com',
        location: location,
        completedProjects: 145,
        averageCost: '₹35,000 - ₹75,000',
        certifications: ['CGWB Certified', 'ISO 9001'],
        availability: 'Available'
      },
      {
        id: '2',
        name: 'Green Water Systems',
        rating: 4.6,
        experience: '12 years',
        specialization: ['Community RTRWH', 'Water Treatment'],
        contact: '+91-9876543211',
        email: 'contact@greenwater.in',
        location: location,
        completedProjects: 89,
        averageCost: '₹40,000 - ₹85,000',
        certifications: ['CGWB Certified', 'NABARD Approved'],
        availability: 'Available in 2 weeks'
      }
    ];
    
    return c.json({ success: true, contractors });
    
  } catch (error) {
    console.log('Error fetching contractors:', error);
    return c.json({ 
      success: false, 
      error: 'Failed to fetch contractors' 
    }, 500);
  }
});

// Analytics endpoint
app.get('/make-server-546b30d6/analytics/overview', async (c) => {
  try {
    const assessments = await kv.getByPrefix('assessment:');
    
    const analytics = {
      totalAssessments: assessments.length,
      averageFeasibilityScore: assessments.length > 0 
        ? assessments.reduce((sum, a) => sum + a.value.feasibilityScore, 0) / assessments.length 
        : 0,
      totalPotentialHarvest: assessments.reduce((sum, a) => sum + a.value.annualHarvest, 0),
      topStates: getTopStates(assessments),
      monthlyTrend: getMonthlyTrend(assessments),
      feasibilityDistribution: getFeasibilityDistribution(assessments)
    };
    
    return c.json({ success: true, analytics });
    
  } catch (error) {
    console.log('Error generating analytics:', error);
    return c.json({ 
      success: false, 
      error: 'Failed to generate analytics' 
    }, 500);
  }
});

// Helper functions
async function updateCommunityStats(results: any) {
  const currentStats = await kv.get('community_stats') || {
    totalMembers: 52847,
    totalAssessments: 8934,
    totalWaterSaved: 125600000,
    totalCo2Reduced: 47800,
    activeCommunities: 1247
  };
  
  currentStats.totalAssessments += 1;
  currentStats.totalWaterSaved += results.potential.annualHarvest;
  currentStats.totalCo2Reduced += results.environmental.co2Saved;
  
  await kv.set('community_stats', currentStats);
}

function generateWeatherForecast() {
  return Array.from({ length: 7 }, (_, i) => ({
    date: new Date(Date.now() + i * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    temperature: Math.round(25 + Math.random() * 10),
    humidity: Math.round(60 + Math.random() * 30),
    rainfall: Math.random() > 0.7 ? Math.round(Math.random() * 15) : 0,
    condition: Math.random() > 0.7 ? 'Rainy' : Math.random() > 0.5 ? 'Cloudy' : 'Sunny'
  }));
}

async function getSubsidyData(state: string) {
  const subsidies = {
    maharashtra: [
      {
        scheme: 'Maharashtra Rainwater Harvesting Scheme',
        authority: 'MWRRA',
        amount: 50000,
        eligibility: ['Urban households', 'Plot area > 300 sq.m'],
        applicationProcess: 'Online application through MWRRA portal'
      }
    ],
    karnataka: [
      {
        scheme: 'Karnataka Rainwater Harvesting Incentive',
        authority: 'KSCB',
        amount: 40000,
        eligibility: ['All households', 'Community groups'],
        applicationProcess: 'Apply through Gram Panchayat'
      }
    ],
    default: [
      {
        scheme: 'Pradhan Mantri Krishi Sinchayee Yojana',
        authority: 'Ministry of Agriculture',
        amount: 75000,
        eligibility: ['Farmers', 'Rural areas'],
        applicationProcess: 'Through state agriculture department'
      }
    ]
  };
  
  return subsidies[state] || subsidies.default;
}

function getTopStates(assessments: any[]) {
  const stateCounts = assessments.reduce((acc, assessment) => {
    const state = assessment.value.location?.state || 'Unknown';
    acc[state] = (acc[state] || 0) + 1;
    return acc;
  }, {});
  
  return Object.entries(stateCounts)
    .sort(([,a], [,b]) => (b as number) - (a as number))
    .slice(0, 5)
    .map(([state, count]) => ({ state, count }));
}

function getMonthlyTrend(assessments: any[]) {
  const monthCounts = assessments.reduce((acc, assessment) => {
    const month = new Date(assessment.value.createdAt).getMonth();
    acc[month] = (acc[month] || 0) + 1;
    return acc;
  }, {});
  
  return Object.entries(monthCounts)
    .map(([month, count]) => ({ month: parseInt(month), count }));
}

function getFeasibilityDistribution(assessments: any[]) {
  return assessments.reduce((acc, assessment) => {
    const score = assessment.value.feasibilityScore;
    if (score >= 80) acc.excellent = (acc.excellent || 0) + 1;
    else if (score >= 65) acc.good = (acc.good || 0) + 1;
    else if (score >= 45) acc.fair = (acc.fair || 0) + 1;
    else acc.poor = (acc.poor || 0) + 1;
    return acc;
  }, {});
}

Deno.serve(app.fetch);