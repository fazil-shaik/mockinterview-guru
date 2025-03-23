
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';

const features = [
  {
    title: "Realistic Job Interviews",
    description: "Practice with technical questions tailored to real job listings",
  },
  {
    title: "AI-Powered Feedback",
    description: "Get instant code review and suggestions from our AI assistant",
  },
  {
    title: "Multiple Languages",
    description: "Practice in your preferred programming language, from JavaScript to Python and more",
  },
  {
    title: "Performance Analytics",
    description: "Track your progress and identify areas for improvement",
  },
];

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative pt-20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/20 z-0" />
          <div 
            className="absolute inset-0 z-0 opacity-30"
            style={{
              backgroundImage: 'radial-gradient(circle at 25px 25px, rgba(0, 0, 0, 0.1) 2%, transparent 0%), radial-gradient(circle at 75px 75px, rgba(0, 0, 0, 0.1) 2%, transparent 0%)',
              backgroundSize: '100px 100px',
            }}
          />
          
          <div className="container max-w-6xl mx-auto px-4 py-16 md:py-24 relative z-10">
            <div className="flex flex-col items-center text-center space-y-8 md:space-y-12">
              <div className="space-y-4 max-w-3xl">
                <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
                  Master Your Technical Interviews with AI
                </h1>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                  Practice coding interviews for real job positions with instant AI feedback.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4">
                <Button asChild size="lg" className="px-8 py-6 text-base rounded-full transition-all">
                  <Link to="/jobs" className="flex items-center gap-2">
                    Start Practicing
                    <ArrowRight size={18} />
                  </Link>
                </Button>
              </div>
              
              <div className="w-full max-w-5xl aspect-[16/9] mt-8 rounded-lg overflow-hidden glass-panel animate-fade-in">
                <div className="w-full h-full bg-muted/50 flex items-center justify-center">
                  <div className="text-center p-8">
                    <div className="w-64 h-64 mx-auto rounded-full bg-primary/10 flex items-center justify-center mb-6">
                      <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                        <rect width="18" height="18" x="3" y="3" rx="2" />
                        <path d="m9 17 6-10" />
                        <path d="m9 7 6 10" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold mb-2">AI-Powered Mock Interviews</h3>
                    <p className="text-muted-foreground">
                      Practice with our interactive coding environment and receive instant feedback
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Features Section */}
        <section className="py-16 md:py-24 bg-white dark:bg-black">
          <div className="container max-w-6xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Why Practice With Us?</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Our platform is designed to help you prepare for technical interviews with real-world questions and AI-powered feedback.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {features.map((feature, index) => (
                <div 
                  key={index} 
                  className="glass-panel p-6 rounded-lg card-hover"
                >
                  <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-16 md:py-24 bg-gradient-to-br from-primary/5 to-secondary/20">
          <div className="container max-w-6xl mx-auto px-4 text-center">
            <div className="max-w-3xl mx-auto space-y-6">
              <h2 className="text-3xl font-bold">Ready to improve your interview skills?</h2>
              <p className="text-muted-foreground">
                Start practicing with our AI-powered mock interview platform and get instant feedback on your code.
              </p>
              <Button asChild size="lg" className="mt-6 px-8 py-6 text-base rounded-full">
                <Link to="/jobs">
                  Browse Jobs
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      
      <footer className="bg-muted/30 py-8">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} MockInterview. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
