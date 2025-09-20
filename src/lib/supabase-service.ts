import { createClient } from '@supabase/supabase-js';
import { projectId, publicAnonKey } from '../utils/supabase/info';
import { AssessmentInput, AssessmentResult } from './rtrwh-engine';

const supabase = createClient(
  `https://${projectId}.supabase.co`,
  publicAnonKey
);

const BASE_URL = `https://${projectId}.supabase.co/functions/v1/make-server-546b30d6`;

export interface UserProfile {
  id: string;
  email: string;
  name: string;
  location?: string;
  totalAssessments: number;
  totalWaterHarvest: number;
  totalCostSavings: number;
  joinedDate: string;
  lastAssessment?: string;
}

export interface CommunityStats {
  totalMembers: number;
  totalAssessments: number;
  totalWaterSaved: number;
  totalCo2Reduced: number;
  activeCommunities: number;
}

export interface SuccessStory {
  id: string;
  userId: string;
  user: {
    name: string;
    location: string;
    avatar: string;
  };
  title: string;
  description: string;
  impact: {
    waterSaved: number;
    costSaving: number;
    families: number;
  };
  images: string[];
  likes: number;
  comments: number;
  date: string;
  tags: string[];
}

export interface WeatherData {
  location: string;
  current: {
    temperature: number;
    humidity: number;
    rainfall: number;
    windSpeed: number;
  };
  forecast: {
    next7Days: Array<{
      date: string;
      temperature: number;
      humidity: number;
      rainfall: number;
      condition: string;
    }>;
    monsoonPrediction: {
      onset: string;
      withdrawal: string;
      expectedRainfall: number;
      reliability: number;
    };
  };
  historical: {
    averageAnnual: number;
    last5Years: number[];
    wettest: { year: number; rainfall: number };
    driest: { year: number; rainfall: number };
  };
}

export class SupabaseService {
  private static instance: SupabaseService;
  
  static getInstance(): SupabaseService {
    if (!this.instance) {
      this.instance = new SupabaseService();
    }
    return this.instance;
  }

  // Authentication methods
  async signUp(email: string, password: string, name: string) {
    try {
      const response = await fetch(`${BASE_URL}/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${publicAnonKey}`
        },
        body: JSON.stringify({ email, password, name })
      });
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.log('Sign up error:', error);
      throw error;
    }
  }

  async signIn(email: string, password: string) {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      
      if (error) throw error;
      return data;
    } catch (error) {
      console.log('Sign in error:', error);
      throw error;
    }
  }

  async signOut() {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    } catch (error) {
      console.log('Sign out error:', error);
      throw error;
    }
  }

  async getCurrentSession() {
    try {
      const { data, error } = await supabase.auth.getSession();
      if (error) throw error;
      return data.session;
    } catch (error) {
      console.log('Get session error:', error);
      return null;
    }
  }

  // Assessment methods
  async saveAssessment(assessmentData: AssessmentInput, results: AssessmentResult, userId?: string) {
    try {
      const response = await fetch(`${BASE_URL}/assessments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${publicAnonKey}`
        },
        body: JSON.stringify({
          userId: userId || 'anonymous',
          assessmentData,
          results
        })
      });
      
      const data = await response.json();
      if (!data.success) {
        throw new Error(data.error || 'Failed to save assessment');
      }
      
      return data;
    } catch (error) {
      console.log('Save assessment error:', error);
      throw error;
    }
  }

  async getUserAssessments(userId: string) {
    try {
      const response = await fetch(`${BASE_URL}/assessments/${userId}`, {
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`
        }
      });
      
      const data = await response.json();
      if (!data.success) {
        throw new Error(data.error || 'Failed to fetch assessments');
      }
      
      return data.assessments;
    } catch (error) {
      console.log('Get user assessments error:', error);
      throw error;
    }
  }

  // Community methods
  async getCommunityStats(): Promise<CommunityStats> {
    try {
      const response = await fetch(`${BASE_URL}/community/stats`, {
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`
        }
      });
      
      const data = await response.json();
      if (!data.success) {
        throw new Error(data.error || 'Failed to fetch community stats');
      }
      
      return data.stats;
    } catch (error) {
      console.log('Get community stats error:', error);
      throw error;
    }
  }

  async getSuccessStories(filter: string = 'all', limit: number = 10): Promise<SuccessStory[]> {
    try {
      const response = await fetch(`${BASE_URL}/community/stories?filter=${filter}&limit=${limit}`, {
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`
        }
      });
      
      const data = await response.json();
      if (!data.success) {
        throw new Error(data.error || 'Failed to fetch success stories');
      }
      
      return data.stories;
    } catch (error) {
      console.log('Get success stories error:', error);
      throw error;
    }
  }

  async submitSuccessStory(story: Omit<SuccessStory, 'id' | 'likes' | 'comments' | 'date'>, userId: string) {
    try {
      const response = await fetch(`${BASE_URL}/community/stories`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${publicAnonKey}`
        },
        body: JSON.stringify({ userId, story })
      });
      
      const data = await response.json();
      if (!data.success) {
        throw new Error(data.error || 'Failed to submit story');
      }
      
      return data;
    } catch (error) {
      console.log('Submit success story error:', error);
      throw error;
    }
  }

  // Weather and location methods
  async getWeatherData(location: string): Promise<WeatherData> {
    try {
      const response = await fetch(`${BASE_URL}/weather/${encodeURIComponent(location)}`, {
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`
        }
      });
      
      const data = await response.json();
      if (!data.success) {
        throw new Error(data.error || 'Failed to fetch weather data');
      }
      
      return data.weather;
    } catch (error) {
      console.log('Get weather data error:', error);
      throw error;
    }
  }

  // Subsidies and schemes
  async getAvailableSubsidies(state: string) {
    try {
      const response = await fetch(`${BASE_URL}/subsidies/${encodeURIComponent(state)}`, {
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`
        }
      });
      
      const data = await response.json();
      if (!data.success) {
        throw new Error(data.error || 'Failed to fetch subsidies');
      }
      
      return data.subsidies;
    } catch (error) {
      console.log('Get subsidies error:', error);
      throw error;
    }
  }

  // Contractor directory
  async getContractors(location: string) {
    try {
      const response = await fetch(`${BASE_URL}/contractors/${encodeURIComponent(location)}`, {
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`
        }
      });
      
      const data = await response.json();
      if (!data.success) {
        throw new Error(data.error || 'Failed to fetch contractors');
      }
      
      return data.contractors;
    } catch (error) {
      console.log('Get contractors error:', error);
      throw error;
    }
  }

  // Analytics
  async getAnalytics() {
    try {
      const response = await fetch(`${BASE_URL}/analytics/overview`, {
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`
        }
      });
      
      const data = await response.json();
      if (!data.success) {
        throw new Error(data.error || 'Failed to fetch analytics');
      }
      
      return data.analytics;
    } catch (error) {
      console.log('Get analytics error:', error);
      throw error;
    }
  }
}

// Export singleton instance
export const supabaseService = SupabaseService.getInstance();