
import { useState, useEffect } from 'react';
import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { languages, codeTemplates } from '@/lib/mockData';

interface CodeEditorProps {
  language: string;
  onChange: (code: string) => void;
  onLanguageChange: (language: string) => void;
  onSubmit: () => void;
  isSubmitting: boolean;
}

const CodeEditor = ({ 
  language, 
  onChange, 
  onLanguageChange, 
  onSubmit, 
  isSubmitting 
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
        <Button onClick={onSubmit} disabled={isSubmitting} className="gap-2">
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
