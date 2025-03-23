import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Question } from "@/lib/mockData";
import { questions } from "@/lib/mockData";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CodeEditor from "@/components/CodeEditor";
import QuestionPanel from "@/components/QuestionPanel";
import FeedbackPanel from "@/components/FeedbackPanel";
import { submitCode } from "@/lib/api";
import { toast } from "@/components/ui/use-toast";
import Navbar from "@/components/Navbar";
import { Skeleton } from "@/components/ui/skeleton";
import CodeReviewFeedback from "@/components/CodeReviewFeedback";

const Interview = () => {
  const { jobId } = useParams<{ jobId: string }>();
  const [question, setQuestion] = useState<Question | null>(null);
  const [language, setLanguage] = useState("javascript");
  const [code, setCode] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState(null);
  const [submissionId, setSubmissionId] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);

  useEffect(() => {
    if (jobId) {
      const foundQuestion = questions.find((q) => q.jobId === jobId);
      if (foundQuestion) {
        setQuestion(foundQuestion);
      }
    }
  }, [jobId]);

  if (!question) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <div className="flex items-center justify-center flex-1 p-4">
          <Skeleton className="w-[300px] h-[40px] rounded-full" />
        </div>
      </div>
    );
  }

  const handleSubmitCode = async () => {
    setIsSubmitting(true);
    try {
      // Submit code through API and get back submission ID
      const submission = await submitCode(question.id, code, language);
      setSubmissionId(submission._id);
      setShowFeedback(true);
      
      // Show success toast
      toast({
        title: "Code submitted successfully",
        description: "Your solution has been submitted for evaluation.",
      });
    } catch (error) {
      console.error("Error submitting code:", error);
      toast({
        variant: "destructive",
        title: "Submission failed",
        description: "There was an error submitting your code. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <header className="px-4 py-6 bg-secondary">
        <div className="container mx-auto">
          <h1 className="text-3xl font-semibold">{question.title}</h1>
        </div>
      </header>
      
      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4 p-4 max-w-screen-xl mx-auto w-full">
        <div className="flex flex-col h-full border rounded-lg overflow-hidden">
          <QuestionPanel question={question} />
        </div>
        
        <div className="flex flex-col h-full border rounded-lg overflow-hidden">
          <Tabs defaultValue="code" className="h-full flex flex-col">
            <TabsList className="px-4 pt-2">
              <TabsTrigger value="code">Code Editor</TabsTrigger>
              {showFeedback && submissionId && <TabsTrigger value="feedback">Code Review</TabsTrigger>}
            </TabsList>
            
            <TabsContent value="code" className="flex-1 flex flex-col">
              <CodeEditor
                language={language}
                onChange={setCode}
                onLanguageChange={setLanguage}
                onSubmit={handleSubmitCode}
                isSubmitting={isSubmitting}
                questionId={question.id}
              />
            </TabsContent>
            
            {showFeedback && submissionId && (
              <TabsContent value="feedback" className="flex-1 overflow-auto">
                <CodeReviewFeedback submissionId={submissionId} />
              </TabsContent>
            )}
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Interview;
