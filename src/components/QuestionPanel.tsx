
import { Question } from '@/lib/mockData';
import { Badge } from '@/components/ui/badge';

interface QuestionPanelProps {
  question: Question;
}

const QuestionPanel = ({ question }: QuestionPanelProps) => {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy':
        return 'bg-green-100 text-green-800 hover:bg-green-100';
      case 'Medium':
        return 'bg-yellow-100 text-yellow-800 hover:bg-yellow-100';
      case 'Hard':
        return 'bg-red-100 text-red-800 hover:bg-red-100';
      default:
        return 'bg-gray-100 text-gray-800 hover:bg-gray-100';
    }
  };

  return (
    <div className="flex flex-col h-full overflow-y-auto p-6">
      <div className="mb-6 space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">{question.title}</h2>
          <Badge 
            variant="outline" 
            className={`font-medium ${getDifficultyColor(question.difficulty)}`}
          >
            {question.difficulty}
          </Badge>
        </div>
        <div className="prose prose-sm max-w-none">
          <div className="whitespace-pre-line">{question.description}</div>
        </div>
      </div>

      {question.constraints.length > 0 && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Constraints:</h3>
          <ul className="list-disc pl-5 space-y-1 text-sm">
            {question.constraints.map((constraint, index) => (
              <li key={index} className="text-muted-foreground">
                {constraint}
              </li>
            ))}
          </ul>
        </div>
      )}

      {question.examples.length > 0 && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Examples:</h3>
          <div className="space-y-4">
            {question.examples.map((example, index) => (
              <div key={index} className="bg-muted/50 rounded-md p-4">
                <div className="mb-2">
                  <div className="font-medium">Input:</div>
                  <div className="font-mono text-sm bg-muted p-2 rounded mt-1">{example.input}</div>
                </div>
                <div className="mb-2">
                  <div className="font-medium">Output:</div>
                  <div className="font-mono text-sm bg-muted p-2 rounded mt-1">{example.output}</div>
                </div>
                {example.explanation && (
                  <div>
                    <div className="font-medium">Explanation:</div>
                    <div className="text-sm text-muted-foreground mt-1">{example.explanation}</div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {question.hints.length > 0 && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Hints:</h3>
          <div className="space-y-2">
            {question.hints.map((hint, index) => (
              <div key={index} className="bg-blue-50 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300 p-3 rounded-md text-sm">
                {hint}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default QuestionPanel;
