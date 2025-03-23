
import { useState, useEffect } from 'react';
import { getCodeReviewFeedback } from '@/lib/api';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Skeleton } from '@/components/ui/skeleton';
import { AlertCircle, CheckCircle2, RefreshCcw } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';

interface CodeReviewFeedbackProps {
  submissionId: string;
}

const CodeReviewFeedback = ({ submissionId }: CodeReviewFeedbackProps) => {
  const [feedback, setFeedback] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pollingCount, setPollingCount] = useState(0);

  const fetchFeedback = async () => {
    try {
      setLoading(true);
      const submission = await getCodeReviewFeedback(submissionId);
      
      if (submission.aiReview) {
        setFeedback(submission.aiReview);
        setLoading(false);
      } else if (pollingCount < 10) {
        // If no review yet, poll again after delay (up to 10 times)
        setTimeout(() => {
          setPollingCount(prev => prev + 1);
          fetchFeedback();
        }, 3000);
      } else {
        setError('Review is taking longer than expected. Please try refreshing.');
        setLoading(false);
      }
    } catch (err) {
      console.error('Error fetching code review:', err);
      setError('Failed to load code review feedback. Please try again later.');
      setLoading(false);
    }
  };

  useEffect(() => {
    if (submissionId) {
      fetchFeedback();
    }
  }, [submissionId]);

  const handleRefresh = () => {
    setPollingCount(0);
    setError(null);
    fetchFeedback();
  };

  if (loading) {
    return (
      <div className="space-y-4 p-6">
        <div className="flex items-center space-x-2 mb-4">
          <Skeleton className="h-8 w-60" />
          <div className="ml-2 animate-spin">
            <RefreshCcw size={16} />
          </div>
        </div>
        <Alert className="mb-4 bg-blue-50 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300">
          <AlertDescription>
            Generating AI code review... This may take up to 30 seconds.
          </AlertDescription>
        </Alert>
        <Skeleton className="h-24 w-full" />
        <Skeleton className="h-24 w-full" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <Alert variant="destructive" className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription className="ml-2">{error}</AlertDescription>
        </Alert>
        <Button onClick={handleRefresh} className="mt-4">
          <RefreshCcw size={16} className="mr-2" /> Retry
        </Button>
      </div>
    );
  }

  if (!feedback) {
    return (
      <Alert className="m-6">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription className="ml-2">
          Code review is being generated. This may take a minute. Please check back soon.
        </AlertDescription>
        <Button onClick={handleRefresh} className="mt-4">
          <RefreshCcw size={16} className="mr-2" /> Refresh
        </Button>
      </Alert>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-4">
        <h2 className="text-2xl font-bold mb-2">AI Code Review</h2>
        <p className="text-muted-foreground">
          Expert code review provided by AI to help you improve your solution.
        </p>
      </div>
      
      <div className="bg-muted/30 p-6 rounded-lg">
        <Alert className="mb-4 bg-green-50 text-green-800 dark:bg-green-900/20 dark:text-green-300">
          <CheckCircle2 className="h-4 w-4" />
          <AlertDescription className="ml-2">
            This is an AI-generated review. Use it as guidance to improve your code.
          </AlertDescription>
        </Alert>
        
        <div className="prose prose-sm max-w-none dark:prose-invert">
          <div className="whitespace-pre-line">{feedback}</div>
        </div>
      </div>
    </div>
  );
};

export default CodeReviewFeedback;
