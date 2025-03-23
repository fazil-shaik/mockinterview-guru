export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  description: string;
  salary: string;
  postedDate: string;
  tags: string[];
  logo: string;
}

export interface Question {
  id: string;
  title: string;
  description: string;
  difficulty: "Easy" | "Medium" | "Hard";
  constraints: string[];
  examples: {
    input: string;
    output: string;
    explanation?: string;
  }[];
  hints: string[];
}

export interface Feedback {
  correctness: number; // 0-100
  performance: number; // 0-100
  readability: number; // 0-100
  suggestions: string[];
  betterSolution?: string;
  explanation?: string;
}

export const languages = [
  { id: "javascript", name: "JavaScript" },
  { id: "python", name: "Python" },
  { id: "java", name: "Java" },
  { id: "cpp", name: "C++" },
  { id: "csharp", name: "C#" },
  { id: "ruby", name: "Ruby" },
];

export const mockJobs: Job[] = [
  {
    id: "1",
    title: "Frontend Developer",
    company: "TechCorp",
    location: "San Francisco, CA",
    description: "We're looking for a Frontend Developer proficient in React, TypeScript, and modern CSS frameworks to join our product team.",
    salary: "$120,000 - $150,000",
    postedDate: "2023-06-15",
    tags: ["React", "TypeScript", "CSS", "Remote"],
    logo: "https://images.unsplash.com/photo-1549082984-1323b94df9a6?q=80&w=200&auto=format&fit=crop",
  },
  {
    id: "2",
    title: "Backend Engineer",
    company: "DataFlow",
    location: "New York, NY",
    description: "Join our team to build scalable backend systems using Node.js, Express, and MongoDB.",
    salary: "$130,000 - $160,000",
    postedDate: "2023-06-12",
    tags: ["Node.js", "Express", "MongoDB", "AWS"],
    logo: "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=200&auto=format&fit=crop",
  },
  {
    id: "3",
    title: "Full Stack Developer",
    company: "Innovate Inc",
    location: "Austin, TX",
    description: "Looking for a Full Stack Developer with experience in React, Node.js, and SQL databases.",
    salary: "$140,000 - $170,000",
    postedDate: "2023-06-10",
    tags: ["React", "Node.js", "SQL", "Hybrid"],
    logo: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=200&auto=format&fit=crop",
  },
  {
    id: "4",
    title: "Machine Learning Engineer",
    company: "AI Solutions",
    location: "Seattle, WA",
    description: "Join our AI team to develop and deploy machine learning models for real-world applications.",
    salary: "$150,000 - $180,000",
    postedDate: "2023-06-08",
    tags: ["Python", "TensorFlow", "PyTorch", "Remote"],
    logo: "https://images.unsplash.com/photo-1591696205602-2f950c417cb9?q=80&w=200&auto=format&fit=crop",
  },
  {
    id: "5",
    title: "DevOps Engineer",
    company: "Cloud Systems",
    location: "Chicago, IL",
    description: "We're seeking a DevOps Engineer to help us build and maintain our cloud infrastructure.",
    salary: "$130,000 - $160,000",
    postedDate: "2023-06-05",
    tags: ["AWS", "Docker", "Kubernetes", "CI/CD"],
    logo: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=200&auto=format&fit=crop",
  },
  {
    id: "6",
    title: "Mobile Developer",
    company: "AppWorks",
    location: "Los Angeles, CA",
    description: "Join our mobile team to develop cross-platform applications using React Native.",
    salary: "$125,000 - $155,000",
    postedDate: "2023-06-03",
    tags: ["React Native", "JavaScript", "Mobile", "Hybrid"],
    logo: "https://images.unsplash.com/photo-1522159698025-071104a1ddbd?q=80&w=200&auto=format&fit=crop",
  },
];

export const mockQuestions: Record<string, Question> = {
  "1": {
    id: "fe-q1",
    title: "Two Sum",
    description: "Given an array of integers `nums` and an integer `target`, return indices of the two numbers such that they add up to `target`.\n\nYou may assume that each input would have exactly one solution, and you may not use the same element twice.\n\nYou can return the answer in any order.",
    difficulty: "Easy",
    constraints: [
      "2 <= nums.length <= 10^4",
      "-10^9 <= nums[i] <= 10^9",
      "-10^9 <= target <= 10^9",
      "Only one valid answer exists.",
    ],
    examples: [
      {
        input: "nums = [2,7,11,15], target = 9",
        output: "[0,1]",
        explanation: "Because nums[0] + nums[1] == 9, we return [0, 1]."
      },
      {
        input: "nums = [3,2,4], target = 6",
        output: "[1,2]"
      },
      {
        input: "nums = [3,3], target = 6",
        output: "[0,1]"
      }
    ],
    hints: [
      "Try using a hash map to store numbers you've seen so far.",
      "For each number, check if target - number exists in the hash map."
    ]
  },
  "2": {
    id: "be-q1",
    title: "Implement Rate Limiter",
    description: "Design and implement a rate limiter that can limit the number of requests a client can make in a time window.\n\nImplement a class `RateLimiter` with the following methods:\n\n- `constructor(limit, window)` initializes the rate limiter with a maximum of `limit` requests allowed in a time `window` (in milliseconds).\n- `allowRequest(clientId)` returns true if the client with ID `clientId` is allowed to make a request, and false otherwise.",
    difficulty: "Medium",
    constraints: [
      "1 <= limit <= 1000",
      "1 <= window <= 60000 (1 minute in milliseconds)",
      "1 <= clientId.length <= 20"
    ],
    examples: [
      {
        input: "rateLimiter = new RateLimiter(3, 1000)\nrateLimiter.allowRequest('client1') // First request\nrateLimiter.allowRequest('client1') // Second request\nrateLimiter.allowRequest('client1') // Third request\nrateLimiter.allowRequest('client1') // Fourth request (should be limited)",
        output: "true\ntrue\ntrue\nfalse"
      },
      {
        input: "rateLimiter = new RateLimiter(2, 5000)\nrateLimiter.allowRequest('client1')\nrateLimiter.allowRequest('client2')\nrateLimiter.allowRequest('client1')\nrateLimiter.allowRequest('client1')",
        output: "true\ntrue\ntrue\nfalse"
      }
    ],
    hints: [
      "Use a hash map to store the request history for each client.",
      "Consider using a queue to track requests within the time window.",
      "Remove expired timestamps from the queue when checking if a client can make a request."
    ]
  },
  "3": {
    id: "fs-q1",
    title: "API Request Queue",
    description: "Implement a class `RequestQueue` that processes API requests with rate limiting.\n\nThe `RequestQueue` should have the following methods:\n\n- `constructor(maxConcurrent, maxPerMinute)` initializes the queue with a maximum of `maxConcurrent` requests being processed at once and at most `maxPerMinute` requests per minute.\n- `addRequest(requestFn, callback)` adds a request to the queue. The `requestFn` is a function that returns a Promise, and the `callback` is called with the result or error.\n- `start()` starts processing requests from the queue.\n- `stop()` stops processing new requests from the queue.",
    difficulty: "Hard",
    constraints: [
      "1 <= maxConcurrent <= 10",
      "1 <= maxPerMinute <= 100",
      "0 <= requests <= 1000"
    ],
    examples: [
      {
        input: "const queue = new RequestQueue(2, 10);\nqueue.addRequest(() => fetch('/api/data/1'), (err, result) => console.log(result));\nqueue.addRequest(() => fetch('/api/data/2'), (err, result) => console.log(result));\nqueue.addRequest(() => fetch('/api/data/3'), (err, result) => console.log(result));\nqueue.start();",
        output: "// The first two requests will start processing immediately.\n// The third request will wait until one of the first two completes."
      }
    ],
    hints: [
      "Use a queue data structure to store pending requests.",
      "Track the number of currently executing requests and the timestamps of recent requests.",
      "Implement a scheduler that checks the queue periodically and executes requests when capacity is available."
    ]
  },
  "4": {
    id: "ml-q1",
    title: "Implement K-Means Clustering",
    description: "Implement the K-Means clustering algorithm from scratch.\n\nYour implementation should have the following functions:\n\n- `initialize_centroids(data, k)` which initializes k centroids randomly from the data points.\n- `assign_clusters(data, centroids)` which assigns each data point to the nearest centroid.\n- `update_centroids(data, clusters, k)` which updates the centroids based on the mean of the assigned data points.\n- `kmeans(data, k, max_iterations)` which runs the K-Means algorithm for at most max_iterations.",
    difficulty: "Hard",
    constraints: [
      "1 <= k <= 10",
      "1 <= max_iterations <= 100",
      "1 <= data.length <= 1000",
      "1 <= data[i].length <= 10 (dimensionality of data)"
    ],
    examples: [
      {
        input: "data = [[1, 2], [1, 4], [1, 0], [4, 2], [4, 4], [4, 0]]\nk = 2\nmax_iterations = 10\nkmeans(data, k, max_iterations)",
        output: "// Expected output will be two clusters:\n// Cluster 1: [[1, 2], [1, 4], [1, 0]]\n// Cluster 2: [[4, 2], [4, 4], [4, 0]]"
      }
    ],
    hints: [
      "Use Euclidean distance to measure the distance between data points and centroids.",
      "Initialize centroids by selecting random data points.",
      "The algorithm converges when centroids no longer change significantly between iterations.",
      "Handle the case where a cluster becomes empty by reinitializing its centroid."
    ]
  },
  "5": {
    id: "devops-q1",
    title: "Implement Auto-Scaling Logic",
    description: "Implement an auto-scaling algorithm that decides when to scale resources up or down based on current usage metrics.\n\nYour implementation should include a class `AutoScaler` with the following methods:\n\n- `constructor(minInstances, maxInstances, targetCpuUtilization)` initializes the auto-scaler with the minimum and maximum number of instances and a target CPU utilization percentage.\n- `getCurrentInstances()` returns the current number of instances.\n- `updateMetrics(cpuUtilization)` updates the current CPU utilization metric.\n- `scaleIfNeeded()` decides whether to scale up or down based on the current metrics.",
    difficulty: "Medium",
    constraints: [
      "1 <= minInstances <= 5",
      "5 <= maxInstances <= 100",
      "50 <= targetCpuUtilization <= 90",
      "0 <= cpuUtilization <= 100"
    ],
    examples: [
      {
        input: "const autoScaler = new AutoScaler(2, 10, 70);\nautoScaler.updateMetrics(85);\nautoScaler.scaleIfNeeded();",
        output: "// Since CPU utilization (85) is above the target (70), the auto-scaler should scale up."
      },
      {
        input: "const autoScaler = new AutoScaler(2, 10, 70);\nautoScaler.updateMetrics(50);\nautoScaler.scaleIfNeeded();",
        output: "// Since CPU utilization (50) is below the target (70), the auto-scaler should scale down."
      }
    ],
    hints: [
      "Calculate the ratio of current CPU utilization to target CPU utilization.",
      "Scale the number of instances proportionally to this ratio.",
      "Include a cooldown period to prevent rapid scaling up and down.",
      "Implement a gradual scaling strategy to avoid over-provisioning or under-provisioning."
    ]
  },
  "6": {
    id: "mobile-q1",
    title: "Implement Infinite Scroll",
    description: "Implement an infinite scroll component for a mobile application that fetches and displays data as the user scrolls.\n\nYour implementation should include a class `InfiniteScroll` with the following methods:\n\n- `constructor(batchSize, fetchFn)` initializes the infinite scroll with a batch size and a function to fetch data.\n- `loadInitialData()` loads the initial batch of data.\n- `loadMoreData()` loads the next batch of data when the user scrolls near the end.\n- `render()` returns the component to be rendered.",
    difficulty: "Medium",
    constraints: [
      "1 <= batchSize <= 50",
      "fetchFn must return a Promise",
      "The data returned by fetchFn must be an array"
    ],
    examples: [
      {
        input: "const fetchItems = (page, limit) => fetch(`/api/items?page=${page}&limit=${limit}`).then(res => res.json());\nconst infiniteScroll = new InfiniteScroll(20, fetchItems);\ninfiniteScroll.loadInitialData();",
        output: "// Initial 20 items should be loaded and rendered.\n// As the user scrolls, more items should be loaded."
      }
    ],
    hints: [
      "Keep track of the current page or offset for pagination.",
      "Add a scroll event listener to detect when the user is nearing the end of the content.",
      "Include a loading indicator to show when new data is being fetched.",
      "Implement debouncing to prevent multiple fetch requests when the user scrolls rapidly.",
      "Consider using a virtual list for better performance with large datasets."
    ]
  }
};

export const mockFeedback: Feedback = {
  correctness: 85,
  performance: 70,
  readability: 90,
  suggestions: [
    "Your solution works correctly for most cases, but could fail with extremely large inputs due to potential stack overflow.",
    "Consider using a more efficient data structure to improve time complexity.",
    "Good variable naming and code organization. Could add a few more comments to explain the approach."
  ],
  betterSolution: `// A more efficient solution using a hash map
function twoSum(nums, target) {
  const seen = {};
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (complement in seen) {
      return [seen[complement], i];
    }
    seen[nums[i]] = i;
  }
  return null;
}`,
  explanation: "This solution uses a hash map to store numbers we've seen so far, allowing us to find complements in O(1) time. This improves the overall time complexity from O(n²) to O(n)."
};

// Initial code templates for different languages
export const codeTemplates: Record<string, string> = {
  javascript: `// Write your solution here
function solution(nums, target) {
  // Your code here
}

// Example usage
// const result = solution([2, 7, 11, 15], 9);
// console.log(result); // Expected: [0, 1]
`,
  python: `# Write your solution here
def solution(nums, target):
    # Your code here
    pass

# Example usage
# result = solution([2, 7, 11, 15], 9)
# print(result)  # Expected: [0, 1]
`,
  java: `// Write your solution here
import java.util.*;

class Solution {
    public int[] solution(int[] nums, int target) {
        // Your code here
        return new int[]{0, 0};
    }
    
    // Example usage
    public static void main(String[] args) {
        Solution sol = new Solution();
        int[] result = sol.solution(new int[]{2, 7, 11, 15}, 9);
        // Expected: [0, 1]
    }
}
`,
  cpp: `// Write your solution here
#include <vector>
#include <iostream>

using namespace std;

vector<int> solution(vector<int>& nums, int target) {
    // Your code here
    return {0, 0};
}

// Example usage
// int main() {
//     vector<int> nums = {2, 7, 11, 15};
//     int target = 9;
//     vector<int> result = solution(nums, target);
//     // Expected: [0, 1]
//     return 0;
// }
`,
  csharp: `// Write your solution here
using System;
using System.Collections.Generic;

public class Solution {
    public int[] TwoSum(int[] nums, int target) {
        // Your code here
        return new int[]{0, 0};
    }
    
    // Example usage
    public static void Main() {
        Solution sol = new Solution();
        int[] result = sol.TwoSum(new int[]{2, 7, 11, 15}, 9);
        // Expected: [0, 1]
    }
}
`,
  ruby: `# Write your solution here
def solution(nums, target)
  # Your code here
end

# Example usage
# result = solution([2, 7, 11, 15], 9)
# puts result.inspect  # Expected: [0, 1]
`
};

export { mockQuestions };
