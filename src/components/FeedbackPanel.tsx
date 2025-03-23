
import { useState } from 'react';
import { Feedback } from '@/lib/mockData';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Check, X, Code } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface FeedbackPanelProps {
  feedback: Feedback;
  onClose: () => void;
}

const FeedbackPanel = ({ feedback, onClose }: FeedbackPanelProps) => {
  const [activeTab, setActiveTab] = useState('feedback');

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getProgressColor = (score: number) => {
    if (score >= 80) return 'bg-green-600';
    if (score >= 60) return 'bg-yellow-600';
    return 'bg-red-600';
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-3xl max-h-[90vh] bg-background rounded-lg shadow-lg overflow-hidden animate-slide-in">
        <div className="p-4 bg-muted/50 border-b flex items-center justify-between">
          <h2 className="text-xl font-semibold">Code Review Feedback</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X size={20} />
          </Button>
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="px-4 border-b">
            <TabsList className="w-full justify-start">
              <TabsTrigger value="feedback" className="data-[state=active]:bg-background">Feedback</TabsTrigger>
              {feedback.betterSolution && (
                <TabsTrigger value="solution" className="data-[state=active]:bg-background">Better Solution</TabsTrigger>
              )}
            </TabsList>
          </div>
          
          <div className="overflow-y-auto max-h-[70vh]">
            <TabsContent value="feedback" className="p-6 focus:outline-none">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-muted/30 p-4 rounded-lg">
                  <div className="text-sm text-muted-foreground mb-2">Correctness</div>
                  <div className="flex items-center justify-between mb-2">
                    <div className={`text-2xl font-bold ${getScoreColor(feedback.correctness)}`}>
                      {feedback.correctness}%
                    </div>
                  </div>
                  <Progress value={feedback.correctness} className={`h-2 ${getProgressColor(feedback.correctness)}`} />
                </div>
                <div className="bg-muted/30 p-4 rounded-lg">
                  <div className="text-sm text-muted-foreground mb-2">Performance</div>
                  <div className="flex items-center justify-between mb-2">
                    <div className={`text-2xl font-bold ${getScoreColor(feedback.performance)}`}>
                      {feedback.performance}%
                    </div>
                  </div>
                  <Progress value={feedback.performance} className={`h-2 ${getProgressColor(feedback.performance)}`} />
                </div>
                <div className="bg-muted/30 p-4 rounded-lg">
                  <div className="text-sm text-muted-foreground mb-2">Readability</div>
                  <div className="flex items-center justify-between mb-2">
                    <div className={`text-2xl font-bold ${getScoreColor(feedback.readability)}`}>
                      {feedback.readability}%
                    </div>
                  </div>
                  <Progress value={feedback.readability} className={`h-2 ${getProgressColor(feedback.readability)}`} />
                </div>
              </div>
              
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-3">Suggestions</h3>
                <ul className="space-y-2">
                  {feedback.suggestions.map((suggestion, index) => (
                    <li key={index} className="flex items-start">
                      <div className="mr-2 mt-1 text-yellow-500">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M12 9v4"></path>
                          <path d="M12 16h.01"></path>
                          <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Z"></path>
                        </svg>
                      </div>
                      <span className="text-muted-foreground">{suggestion}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              {feedback.explanation && (
                <div>
                  <h3 className="text-lg font-semibold mb-3">Explanation</h3>
                  <p className="text-muted-foreground">{feedback.explanation}</p>
                </div>
              )}
            </TabsContent>
            
            {feedback.betterSolution && (
              <TabsContent value="solution" className="p-6 focus:outline-none">
                <div className="mb-4">
                  <h3 className="text-lg font-semibold mb-2 flex items-center">
                    <Code size={20} className="mr-2 text-primary" />
                    Better Solution
                  </h3>
                  <p className="text-muted-foreground mb-4">Here's an optimized solution for this problem:</p>
                  <div className="bg-muted/50 p-4 rounded-lg">
                    <pre className="font-mono text-sm whitespace-pre-wrap overflow-x-auto">
                      {feedback.betterSolution}
                    </pre>
                  </div>
                </div>
                {feedback.explanation && (
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Why it's better</h3>
                    <p className="text-muted-foreground">{feedback.explanation}</p>
                  </div>
                )}
              </TabsContent>
            )}
          </div>
        </Tabs>
        
        <div className="p-4 bg-muted/50 border-t flex justify-end">
          <Button onClick={onClose} className="gap-2">
            <Check size={16} />
            Close
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FeedbackPanel;
