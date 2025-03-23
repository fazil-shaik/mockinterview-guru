
import { useState, useEffect } from 'react';
import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { languages, codeTemplates } from '@/lib/mockData';
import { submitCode } from '@/lib/api';
import { toast } from '@/components/ui/use-toast';

interface CodeEditorProps {
  language: string;
  onChange: (code: string) => void;
  onLanguageChange: (language: string) => void;
  onSubmit: () => void;
  isSubmitting: boolean;
  questionId?: string;
}

const CodeEditor = ({ 
  language, 
  onChange, 
  onLanguageChange, 
  onSubmit, 
  isSubmitting,
  questionId
}: CodeEditorProps) => {
  const [code, setCode] = useState<string>(codeTemplates[language] || '');

  useEffect(() => {
    setCode(codeTemplates[language] || '');
  }, [language]);

  const handleCodeChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCode(e.target.value);
    onChange(e.target.value);
  };

  const handleLanguageChange = (value: string) => {
    onLanguageChange(value);
  };

  const handleSubmit = async () => {
    // Call the original onSubmit handler
    onSubmit();
    
    // If we have a questionId, also submit to the backend
    if (questionId) {
      try {
        const submission = await submitCode(questionId, code, language);
        toast({
          title: "Code submitted successfully",
          description: "Your solution has been submitted for evaluation.",
        });
        
        // Additional handling for the submission result if needed
        console.log("Submission result:", submission);
      } catch (error) {
        console.error("Error submitting code:", error);
        toast({
          variant: "destructive",
          title: "Submission failed",
          description: "There was an error submitting your code. Please try again.",
        });
      }
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between px-4 py-2 border-b">
        <div className="flex items-center space-x-2">
          <Select value={language} onValueChange={handleLanguageChange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select a language" />
            </SelectTrigger>
            <SelectContent>
              {languages.map((lang) => (
                <SelectItem key={lang.id} value={lang.id}>
                  {lang.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Button onClick={handleSubmit} disabled={isSubmitting} className="gap-2">
          {isSubmitting ? 'Submitting...' : 'Submit Solution'} 
          {isSubmitting ? null : <Check size={16} />}
        </Button>
      </div>
      <div className="flex-grow relative overflow-hidden">
        <textarea
          value={code}
          onChange={handleCodeChange}
          className="w-full h-full p-4 font-mono text-sm resize-none focus:outline-none focus:ring-0 bg-secondary/30"
          spellCheck="false"
        />
      </div>
    </div>
  );
};

export default CodeEditor;
