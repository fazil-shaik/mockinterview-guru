
import { useState } from 'react';
import { Search } from 'lucide-react';
import { mockJobs } from '@/lib/mockData';
import { Input } from '@/components/ui/input';
import JobCard from '@/components/JobCard';
import Navbar from '@/components/Navbar';

const Jobs = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredJobs = mockJobs.filter(job => 
    job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
    job.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    job.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-16">
        <div className="container max-w-6xl mx-auto px-4 py-12">
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold mb-2">Browse Jobs</h1>
                <p className="text-muted-foreground">
                  Find a job and practice with relevant interview questions
                </p>
              </div>
              
              <div className="relative w-full md:w-72">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search jobs..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 gap-6 animate-fade-in">
              {filteredJobs.length > 0 ? (
                filteredJobs.map((job) => (
                  <JobCard key={job.id} job={job} />
                ))
              ) : (
                <div className="col-span-full text-center py-12">
                  <div className="bg-muted/50 rounded-lg p-8 inline-block">
                    <p className="text-lg font-medium mb-2">No jobs found</p>
                    <p className="text-muted-foreground">
                      Try adjusting your search query
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      
      <footer className="bg-muted/30 py-8">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} MockInterview. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Jobs;
