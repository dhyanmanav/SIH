import { useState, useEffect } from 'react';
import { Hero } from './components/Hero';
import { AssessmentWizard } from './components/AssessmentWizard';
import { ResultsDashboard } from './components/ResultsDashboard';
import { CommunityHub } from './components/CommunityHub';
import { EducationalModule } from './components/EducationalModule';
import { RTRWHEngine, AssessmentInput, AssessmentResult } from './lib/rtrwh-engine';
import { supabaseService } from './lib/supabase-service';
import { Button } from './components/ui/button';
import { Card } from './components/ui/card';
import { Input } from './components/ui/input';
import { Label } from './components/ui/label';
import { motion, AnimatePresence } from 'motion/react';
import { 
  User, LogOut, Settings, BookOpen, Users, 
  BarChart3, Home, Menu, X, Bell
} from 'lucide-react';
import { toast, Toaster } from "sonner@2.0.3";

type AppState = 'hero' | 'assessment' | 'results' | 'community' | 'learning' | 'profile' | 'auth';

interface UserSession {
  user: {
    id: string;
    email: string;
    user_metadata: {
      name: string;
    };
  };
  access_token: string;
}

export default function App() {
  const [currentState, setCurrentState] = useState<AppState>('hero');
  const [assessmentResults, setAssessmentResults] = useState<AssessmentResult | null>(null);
  const [assessmentInput, setAssessmentInput] = useState<AssessmentInput | null>(null);
  const [userSession, setUserSession] = useState<UserSession | null>(null);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');
  const [loading, setLoading] = useState(true);

  // Check for existing session on app load
  useEffect(() => {
    checkSession();
  }, []);

  const checkSession = async () => {
    try {
      const session = await supabaseService.getCurrentSession();
      if (session) {
        setUserSession(session as UserSession);
      }
    } catch (error) {
      console.log('Session check error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStartAssessment = () => {
    setCurrentState('assessment');
  };

  const handleAssessmentComplete = async (data: AssessmentInput) => {
    try {
      const results = RTRWHEngine.calculateAssessment(data);
      setAssessmentResults(results);
      setAssessmentInput(data);
      setCurrentState('results');

      // Save to backend if user is logged in
      if (userSession) {
        try {
          await supabaseService.saveAssessment(data, results, userSession.user.id);
          toast.success('Assessment saved to your profile!');
        } catch (error) {
          console.log('Failed to save assessment:', error);
          toast.error('Assessment completed but not saved. Please try again.');
        }
      } else {
        toast.success('Assessment completed! Sign in to save your results.');
      }
    } catch (error) {
      console.log('Assessment calculation error:', error);
      toast.error('Failed to complete assessment. Please try again.');
    }
  };

  const handleNewAssessment = () => {
    setCurrentState('assessment');
    setAssessmentResults(null);
    setAssessmentInput(null);
  };

  const handleBackToHome = () => {
    setCurrentState('hero');
    setAssessmentResults(null);
    setAssessmentInput(null);
  };

  const handleAuth = async (email: string, password: string, name?: string) => {
    try {
      setLoading(true);
      
      if (authMode === 'signup' && name) {
        await supabaseService.signUp(email, password, name);
        toast.success('Account created! Please check your email to verify.');
      } else {
        const session = await supabaseService.signIn(email, password);
        setUserSession(session as UserSession);
        setCurrentState('hero');
        toast.success('Welcome back!');
      }
    } catch (error: any) {
      console.log('Auth error:', error);
      toast.error(error.message || 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await supabaseService.signOut();
      setUserSession(null);
      setCurrentState('hero');
      toast.success('Signed out successfully');
    } catch (error) {
      console.log('Sign out error:', error);
      toast.error('Failed to sign out');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin size-8 border-2 border-blue-600 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p>Loading AquaHarvest Pro...</p>
        </div>
      </div>
    );
  }

  // Auth screen
  if (currentState === 'auth') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
        <Card className="w-full max-w-md p-6">
          <div className="text-center mb-6">
            <h1 className="text-2xl mb-2">
              {authMode === 'signin' ? 'Sign In' : 'Create Account'}
            </h1>
            <p className="text-gray-600">
              {authMode === 'signin' 
                ? 'Access your saved assessments and community features'
                : 'Join the AquaHarvest Pro community'
              }
            </p>
          </div>

          <AuthForm 
            mode={authMode}
            onSubmit={handleAuth}
            onModeChange={() => setAuthMode(authMode === 'signin' ? 'signup' : 'signin')}
            onBack={() => setCurrentState('hero')}
            loading={loading}
          />
        </Card>
      </div>
    );
  }

  // Main app with navigation
  return (
    <div className="min-h-screen bg-gray-50">
      <Toaster position="top-right" richColors />
      {/* Navigation Bar */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setCurrentState('hero')}
                className="font-semibold text-lg"
              >
                <span className="text-blue-600">🌊</span>
                AquaHarvest Pro
              </Button>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-4">
              <Button
                variant={currentState === 'hero' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setCurrentState('hero')}
              >
                <Home className="size-4 mr-2" />
                Home
              </Button>
              
              <Button
                variant={currentState === 'assessment' || currentState === 'results' ? 'default' : 'ghost'}
                size="sm"
                onClick={handleStartAssessment}
              >
                <BarChart3 className="size-4 mr-2" />
                Assessment
              </Button>
              
              <Button
                variant={currentState === 'community' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setCurrentState('community')}
              >
                <Users className="size-4 mr-2" />
                Community
              </Button>
              
              <Button
                variant={currentState === 'learning' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setCurrentState('learning')}
              >
                <BookOpen className="size-4 mr-2" />
                Learn
              </Button>

              {userSession ? (
                <div className="flex items-center gap-2 ml-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentState('profile')}
                  >
                    <User className="size-4 mr-2" />
                    {userSession.user.user_metadata.name}
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleSignOut}
                  >
                    <LogOut className="size-4" />
                  </Button>
                </div>
              ) : (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentState('auth')}
                >
                  Sign In
                </Button>
              )}
            </div>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="md:hidden"
            >
              {showMobileMenu ? <X className="size-4" /> : <Menu className="size-4" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {showMobileMenu && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white border-t"
            >
              <div className="p-4 space-y-2">
                <Button
                  variant="ghost"
                  className="w-full justify-start"
                  onClick={() => {
                    setCurrentState('hero');
                    setShowMobileMenu(false);
                  }}
                >
                  <Home className="size-4 mr-2" />
                  Home
                </Button>
                
                <Button
                  variant="ghost"
                  className="w-full justify-start"
                  onClick={() => {
                    handleStartAssessment();
                    setShowMobileMenu(false);
                  }}
                >
                  <BarChart3 className="size-4 mr-2" />
                  Assessment
                </Button>
                
                <Button
                  variant="ghost"
                  className="w-full justify-start"
                  onClick={() => {
                    setCurrentState('community');
                    setShowMobileMenu(false);
                  }}
                >
                  <Users className="size-4 mr-2" />
                  Community
                </Button>
                
                <Button
                  variant="ghost"
                  className="w-full justify-start"
                  onClick={() => {
                    setCurrentState('learning');
                    setShowMobileMenu(false);
                  }}
                >
                  <BookOpen className="size-4 mr-2" />
                  Learn
                </Button>

                {userSession ? (
                  <>
                    <Button
                      variant="ghost"
                      className="w-full justify-start"
                      onClick={() => {
                        setCurrentState('profile');
                        setShowMobileMenu(false);
                      }}
                    >
                      <User className="size-4 mr-2" />
                      Profile
                    </Button>
                    <Button
                      variant="ghost"
                      className="w-full justify-start"
                      onClick={handleSignOut}
                    >
                      <LogOut className="size-4 mr-2" />
                      Sign Out
                    </Button>
                  </>
                ) : (
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => {
                      setCurrentState('auth');
                      setShowMobileMenu(false);
                    }}
                  >
                    Sign In
                  </Button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Main Content */}
      <main>
        {currentState === 'hero' && (
          <Hero onStartAssessment={handleStartAssessment} />
        )}
        
        {currentState === 'assessment' && (
          <AssessmentWizard 
            onComplete={handleAssessmentComplete}
            onBack={handleBackToHome}
          />
        )}
        
        {currentState === 'results' && assessmentResults && assessmentInput && (
          <ResultsDashboard 
            results={assessmentResults}
            input={assessmentInput}
            onNewAssessment={handleNewAssessment}
          />
        )}
        
        {currentState === 'community' && <CommunityHub />}
        
        {currentState === 'learning' && (
          <EducationalModule onComplete={() => setCurrentState('hero')} />
        )}
        
        {currentState === 'profile' && userSession && (
          <UserProfile user={userSession.user} />
        )}
      </main>
    </div>
  );
}

// Auth Form Component
function AuthForm({ 
  mode, 
  onSubmit, 
  onModeChange, 
  onBack, 
  loading 
}: {
  mode: 'signin' | 'signup';
  onSubmit: (email: string, password: string, name?: string) => void;
  onModeChange: () => void;
  onBack: () => void;
  loading: boolean;
}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(email, password, mode === 'signup' ? name : undefined);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {mode === 'signup' && (
        <div>
          <Label htmlFor="name">Full Name</Label>
          <Input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
      )}
      
      <div>
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      
      <div>
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength={6}
        />
      </div>
      
      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? 'Processing...' : mode === 'signin' ? 'Sign In' : 'Create Account'}
      </Button>
      
      <div className="text-center">
        <button
          type="button"
          onClick={onModeChange}
          className="text-blue-600 hover:underline text-sm"
        >
          {mode === 'signin' 
            ? "Don't have an account? Sign up" 
            : "Already have an account? Sign in"
          }
        </button>
      </div>
      
      <Button type="button" variant="ghost" onClick={onBack} className="w-full">
        Back to Home
      </Button>
    </form>
  );
}

// User Profile Component
function UserProfile({ user }: { user: any }) {
  const [userStats, setUserStats] = useState<any>(null);
  const [assessments, setAssessments] = useState<any[]>([]);

  useEffect(() => {
    loadUserData();
  }, [user.id]);

  const loadUserData = async () => {
    try {
      const userAssessments = await supabaseService.getUserAssessments(user.id);
      setAssessments(userAssessments);
      
      // Calculate stats from assessments
      const stats = {
        totalAssessments: userAssessments.length,
        totalWaterHarvest: userAssessments.reduce((sum: number, a: any) => sum + a.annualHarvest, 0),
        averageFeasibility: userAssessments.length > 0 
          ? userAssessments.reduce((sum: number, a: any) => sum + a.feasibilityScore, 0) / userAssessments.length 
          : 0
      };
      setUserStats(stats);
    } catch (error) {
      console.log('Failed to load user data:', error);
    }
  };

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl mb-6">Your Profile</h1>
        
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="p-6">
            <h3 className="font-medium mb-2">Total Assessments</h3>
            <p className="text-2xl font-bold text-blue-600">
              {userStats?.totalAssessments || 0}
            </p>
          </Card>
          
          <Card className="p-6">
            <h3 className="font-medium mb-2">Water Harvest Potential</h3>
            <p className="text-2xl font-bold text-green-600">
              {userStats ? Math.round(userStats.totalWaterHarvest).toLocaleString() : 0}L
            </p>
          </Card>
          
          <Card className="p-6">
            <h3 className="font-medium mb-2">Average Feasibility</h3>
            <p className="text-2xl font-bold text-purple-600">
              {userStats ? Math.round(userStats.averageFeasibility) : 0}%
            </p>
          </Card>
        </div>

        <Card className="p-6">
          <h3 className="text-lg mb-4">Your Assessments</h3>
          {assessments.length > 0 ? (
            <div className="space-y-4">
              {assessments.map((assessment, index) => (
                <div key={assessment.id} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium">{assessment.location?.address}</h4>
                      <p className="text-sm text-gray-600">
                        Created: {new Date(assessment.createdAt).toLocaleDateString()}
                      </p>
                      <p className="text-sm">
                        Feasibility: {assessment.feasibilityScore}% • 
                        Harvest: {Math.round(assessment.annualHarvest).toLocaleString()}L/year
                      </p>
                    </div>
                    <Button size="sm" variant="outline">
                      View Details
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <BarChart3 className="size-16 text-gray-400 mx-auto mb-4" />
              <h4 className="text-lg mb-2">No Assessments Yet</h4>
              <p className="text-gray-600 mb-4">
                Start your first RTRWH assessment to see your results here.
              </p>
              <Button onClick={() => window.location.reload()}>
                Start Assessment
              </Button>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}