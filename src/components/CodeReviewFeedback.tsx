
import { useState, useEffect } from 'react';
import { getCodeReviewFeedback } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Skeleton } from '@/components/ui/skeleton';
import { AlertCircle, CheckCircle2 } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface CodeReviewFeedbackProps {
  submissionId: string;
}

const CodeReviewFeedback = ({ submissionId }: CodeReviewFeedbackProps) => {
  const [feedback, setFeedback] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        setLoading(true);
        const submission = await getCodeReviewFeedback(submissionId);
        setFeedback(submission.aiReview);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching code review:', err);
        setError('Failed to load code review feedback. Please try again later.');
        setLoading(false);
      }
    };

    if (submissionId) {
      fetchFeedback();
    }
  }, [submissionId]);

  if (loading) {
    return (
      <div className="space-y-4 p-6">
        <Skeleton className="h-8 w-3/4" />
        <Skeleton className="h-24 w-full" />
        <Skeleton className="h-24 w-full" />
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive" className="m-6">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  if (!feedback) {
    return (
      <Alert className="m-6">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          Code review is being generated. This may take a minute. Please check back soon.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-4">
        <h2 className="text-2xl font-bold mb-2">AI Code Review</h2>
        <p className="text-muted-foreground">
          Code review provided by AI to help you improve your solution.
        </p>
      </div>
      
      <div className="bg-muted/30 p-6 rounded-lg">
        <Alert className="mb-4 bg-green-50 text-green-800 dark:bg-green-900/20 dark:text-green-300">
          <CheckCircle2 className="h-4 w-4" />
          <AlertDescription>
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
