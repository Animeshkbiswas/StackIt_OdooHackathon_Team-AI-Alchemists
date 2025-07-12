import { useState } from "react";
import { Header } from "@/components/Header";
import { QuestionCard } from "@/components/QuestionCard";
import { FilterBar } from "@/components/FilterBar";
import { Pagination } from "@/components/Pagination";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { Link } from "react-router-dom";

// Mock data for demonstration
const mockQuestions = [
  {
    id: "1",
    title: "How to join 2 columns in a data set to make a separate column in SQL",
    description: "I do not know the code for it as I am a beginner. As an example what I need to do is like there is a column 1 containing First name, and column 2 consists of last name I want a column to combine...",
    tags: ["sql", "database"],
    author: "User Name",
    votes: 5,
    answers: 3,
    views: 125,
    timeAgo: "5 ans",
    isAnswered: true
  },
  {
    id: "2",
    title: "React component lifecycle methods and hooks equivalents",
    description: "What are the hook equivalents for lifecycle methods like componentDidMount, componentDidUpdate, and componentWillUnmount?",
    tags: ["react", "javascript", "hooks"],
    author: "Developer",
    votes: 12,
    answers: 0,
    views: 67,
    timeAgo: "3 ans",
    isAnswered: false
  },
  {
    id: "3",
    title: "Best practices for API error handling in Node.js",
    description: "I'm building a REST API and want to implement proper error handling. What are the industry best practices?",
    tags: ["nodejs", "api", "error-handling"],
    author: "Backend Dev",
    votes: 8,
    answers: 2,
    views: 234,
    timeAgo: "2 ans",
    isAnswered: true
  }
];

const HomePage = () => {
  const [activeFilter, setActiveFilter] = useState("newest");
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  const totalPages = 7; // Mock total pages

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Mobile Search */}
        <div className="md:hidden mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              type="search"
              placeholder="Search questions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4"
            />
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <div className="flex-1">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
              <div>
                <h1 className="text-3xl font-bold text-foreground mb-2">Questions</h1>
                <p className="text-muted-foreground">
                  {mockQuestions.length.toLocaleString()} questions
                </p>
              </div>
              <Button variant="stackit" asChild className="w-full sm:w-auto">
                <Link to="/ask">Ask New Question</Link>
              </Button>
            </div>

            {/* Filters */}
            <FilterBar activeFilter={activeFilter} onFilterChange={setActiveFilter} />

            {/* Questions List */}
            <div className="space-y-4 animate-slide-in">
              {mockQuestions.map((question) => (
                <QuestionCard key={question.id} question={question} />
              ))}
            </div>

            {/* Pagination */}
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </div>

          {/* Sidebar */}
          <div className="w-full lg:w-80">
            <div className="sticky top-24 space-y-6">
              {/* Popular Tags */}
              <div className="bg-card p-6 rounded-lg shadow-stackit-sm border">
                <h3 className="text-lg font-semibold mb-4 text-foreground">Popular Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {["react", "javascript", "python", "sql", "nodejs", "css", "html", "typescript"].map((tag) => (
                    <Button
                      key={tag}
                      variant="secondary"
                      size="sm"
                      className="text-xs hover:bg-stackit-blue hover:text-white transition-colors duration-200"
                    >
                      {tag}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Quick Stats */}
              <div className="bg-card p-6 rounded-lg shadow-stackit-sm border">
                <h3 className="text-lg font-semibold mb-4 text-foreground">Community Stats</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Questions</span>
                    <span className="font-semibold text-foreground">1,234</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Answers</span>
                    <span className="font-semibold text-foreground">3,456</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Users</span>
                    <span className="font-semibold text-foreground">567</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Online</span>
                    <span className="font-semibold text-status-answered">23</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default HomePage;