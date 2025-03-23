
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Job } from '@/lib/mockData';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface JobCardProps {
  job: Job;
}

const JobCard = ({ job }: JobCardProps) => {
  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-md hover:translate-y-[-2px] bg-white/80 backdrop-blur-xs border border-border/50">
      <CardContent className="p-6">
        <div className="flex items-start space-x-4">
          <div 
            className="w-12 h-12 rounded-md overflow-hidden shrink-0 border border-border/50"
            style={{
              backgroundImage: `url(${job.logo})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          />
          <div className="space-y-2 flex-1">
            <div className="space-y-1">
              <h3 className="font-semibold text-lg">{job.title}</h3>
              <div className="flex items-center text-sm text-muted-foreground">
                <span>{job.company}</span>
                <span className="mx-2">•</span>
                <span>{job.location}</span>
              </div>
            </div>
            <p className="text-sm text-muted-foreground line-clamp-2">
              {job.description}
            </p>
            <div className="pt-2 pb-1 flex flex-wrap gap-2">
              {job.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs font-normal">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="px-6 py-4 bg-muted/30 flex justify-between items-center">
        <div className="text-sm font-medium">{job.salary}</div>
        <Button variant="outline" size="sm" asChild className="gap-1 group">
          <Link to={`/interview/${job.id}`}>
            Take Interview
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default JobCard;
