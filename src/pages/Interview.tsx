
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { mockJobs, mockQuestions, mockFeedback, codeTemplates } from '@/lib/mockData';
import CodeEditor from '@/components/CodeEditor';
import QuestionPanel from '@/components/QuestionPanel';
import FeedbackPanel from '@/components/FeedbackPanel';

const Interview = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();

  const [job, setJob] = useState(mockJobs.find(j => j.id === jobId));
  const [question, setQuestion] = useState(mockQuestions[jobId || '1']);
  const [language, setLanguage] = useState('javascript');
  const [code, setCode] = useState(codeTemplates[language] || '');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);

  useEffect(() => {
    if (!job || !question) {
      navigate('/jobs');
      toast.error('Interview not found');
    }
  }, [job, question, navigate]);
  
  // Handle language change
  const handleLanguageChange = (lang: string) => {
    setLanguage(lang);
    setCode(codeTemplates[lang] || '');
  };
  
  // Handle code change
  const handleCodeChange = (newCode: string) => {
    setCode(newCode);
  };
  
  // Handle code submission
  const handleSubmit = () => {
    if (code.trim() === codeTemplates[language]) {
      toast.error('Please write some code before submitting');
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call for code evaluation
    setTimeout(() => {
      setIsSubmitting(false);
      setShowFeedback(true);
    }, 2000);
  };
  
  // Close feedback panel
  const handleCloseFeedback = () => {
    setShowFeedback(false);
  };
  
  // Navigate back to jobs
  const handleBack = () => {
    navigate('/jobs');
  };

  if (!job || !question) return null;

  return (
    <div className="h-screen flex flex-col">
      <header className="bg-background border-b px-4 py-3">
        <div className="container max-w-full mx-auto">
          <div className="flex items-center justify-between">
            <Button variant="ghost" size="sm" onClick={handleBack} className="gap-2">
              <ArrowLeft size={16} />
              Back to Jobs
            </Button>
            <div className="flex-1 max-w-2xl mx-4">
              <h1 className="text-lg font-medium text-center truncate">
                {job.title} - {job.company}
              </h1>
            </div>
            <div className="w-24 flex justify-end">
              {/* Placeholder for symmetry */}
            </div>
          </div>
        </div>
      </header>
      
      <main className="flex-grow flex flex-col md:flex-row overflow-hidden">
        <div className="w-full md:w-1/2 border-r overflow-hidden flex flex-col bg-white dark:bg-black">
          <QuestionPanel question={question} />
        </div>
        <div className="w-full md:w-1/2 overflow-hidden flex flex-col bg-muted/10">
          <CodeEditor 
            language={language}
            onChange={handleCodeChange}
            onLanguageChange={handleLanguageChange}
            onSubmit={handleSubmit}
            isSubmitting={isSubmitting}
          />
        </div>
      </main>
      
      {showFeedback && <FeedbackPanel feedback={mockFeedback} onClose={handleCloseFeedback} />}
    </div>
  );
};

export default Interview;
