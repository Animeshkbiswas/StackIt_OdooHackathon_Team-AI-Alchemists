import { useState } from "react";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { ChevronUp, ChevronDown, MessageSquare, Eye, Clock, Check, Bold, Italic, Code, List, Link as LinkIcon } from "lucide-react";
import { Link, useParams } from "react-router-dom";

const QuestionDetailPage = () => {
  const { id } = useParams();
  const [newAnswer, setNewAnswer] = useState("");
  const [userVote, setUserVote] = useState<"up" | "down" | null>(null);

  // Mock data
  const question = {
    id: "1",
    title: "How to join 2 columns in a data set to make a separate column in SQL",
    description: `I do not know the code for it as I am a beginner. As an example what I need to do is like there is a column 1 containing First name, and column 2 consists of last name I want a column to combine both the columns to make a separate column containing full name.

Example:
Column 1: First Name
Column 2: Last Name
Desired Column 3: Full Name (First Name + Last Name)`,
    tags: ["sql", "database"],
    author: "User Name",
    votes: 5,
    answers: 2,
    views: 125,
    timeAgo: "5 ans"
  };

  const answers = [
    {
      id: "1",
      content: `You can use the CONCAT function or the || operator in SQL to combine columns:

**Method 1: Using CONCAT function**
\`\`\`sql
SELECT 
  first_name,
  last_name,
  CONCAT(first_name, ' ', last_name) AS full_name
FROM your_table;
\`\`\`

**Method 2: Using || operator**
\`\`\`sql
SELECT 
  first_name,
  last_name,
  first_name || ' ' || last_name AS full_name
FROM your_table;
\`\`\`

The CONCAT function works in most databases, while the || operator works in PostgreSQL, SQLite, and Oracle.`,
      author: "SQL Expert",
      votes: 8,
      timeAgo: "4 ans",
      isAccepted: true
    },
    {
      id: "2",
      content: `Another approach is to use string concatenation with the + operator (works in SQL Server):

\`\`\`sql
SELECT 
  first_name,
  last_name,
  first_name + ' ' + last_name AS full_name
FROM your_table;
\`\`\`

Also, make sure to handle NULL values:

\`\`\`sql
SELECT 
  first_name,
  last_name,
  COALESCE(first_name, '') + ' ' + COALESCE(last_name, '') AS full_name
FROM your_table;
\`\`\``,
      author: "Database Admin",
      votes: 3,
      timeAgo: "3 ans",
      isAccepted: false
    }
  ];

  const handleVote = (type: "up" | "down") => {
    if (userVote === type) {
      setUserVote(null);
    } else {
      setUserVote(type);
    }
  };

  const handleSubmitAnswer = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitting answer:", newAnswer);
    setNewAnswer("");
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="text-sm mb-6">
          <Link to="/" className="text-reddit-blue hover:underline">
            Questions
          </Link>
          <span className="mx-2 text-muted-foreground">&gt;</span>
          <span className="text-muted-foreground">How to join 2 columns...</span>
        </nav>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <div className="flex-1">
            {/* Question */}
            <Card className="p-6 mb-8">
              <div className="flex gap-4">
                {/* Vote Section */}
                <div className="flex flex-col items-center space-y-2 min-w-[60px]">
                  <Button 
                    variant="vote" 
                    size="vote-icon"
                    className={userVote === "up" ? "bg-vote-up text-white" : ""}
                    onClick={() => handleVote("up")}
                  >
                    <ChevronUp className="h-5 w-5" />
                  </Button>
                  <span className="text-2xl font-bold text-foreground">{question.votes}</span>
                  <Button 
                    variant="vote" 
                    size="vote-icon"
                    className={userVote === "down" ? "bg-vote-down text-white" : ""}
                    onClick={() => handleVote("down")}
                  >
                    <ChevronDown className="h-5 w-5" />
                  </Button>
                </div>

                {/* Content */}
                <div className="flex-1">
                  <h1 className="text-2xl font-bold text-foreground mb-4">{question.title}</h1>
                  
                  <div className="prose prose-sm max-w-none mb-6">
                    <div className="whitespace-pre-line text-foreground">{question.description}</div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {question.tags.map((tag) => (
                      <Badge
                        key={tag}
                        variant="secondary"
                        className="bg-reddit-blue/10 text-reddit-blue hover:bg-reddit-blue hover:text-white cursor-pointer rounded-full"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  {/* Author Info */}
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1">
                        <Eye className="h-4 w-4" />
                        <span>{question.views} views</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <MessageSquare className="h-4 w-4" />
                        <span>{question.answers} answers</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="h-3 w-3" />
                      <span>asked {question.timeAgo} by</span>
                      <Link to={`/users/${question.author}`} className="text-reddit-blue hover:underline font-medium">
                        {question.author}
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Answers */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-6 text-foreground">
                {answers.length} Answer{answers.length !== 1 ? 's' : ''}
              </h2>
              
              <div className="space-y-6">
                {answers.map((answer) => (
                  <Card key={answer.id} className={`p-6 ${answer.isAccepted ? 'border-status-answered bg-status-answered/5' : ''}`}>
                    <div className="flex gap-4">
                      {/* Vote Section */}
                      <div className="flex flex-col items-center space-y-2 min-w-[60px]">
                        <Button variant="vote" size="vote-icon">
                          <ChevronUp className="h-4 w-4" />
                        </Button>
                        <span className="text-lg font-semibold text-foreground">{answer.votes}</span>
                        <Button variant="vote" size="vote-icon">
                          <ChevronDown className="h-4 w-4" />
                        </Button>
                        {answer.isAccepted && (
                          <div className="mt-2 p-1 bg-status-answered rounded-full">
                            <Check className="h-4 w-4 text-white" />
                          </div>
                        )}
                      </div>

                      {/* Content */}
                      <div className="flex-1">
                        <div className="prose prose-sm max-w-none mb-4">
                          <div className="whitespace-pre-line text-foreground">{answer.content}</div>
                        </div>

                        <div className="flex items-center justify-end text-sm text-muted-foreground">
                          <div className="flex items-center space-x-2">
                            <span>answered {answer.timeAgo} by</span>
                            <Link to={`/users/${answer.author}`} className="text-reddit-blue hover:underline font-medium">
                              {answer.author}
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {/* Submit Answer */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4 text-foreground">Submit Your Answer</h3>
              
              <form onSubmit={handleSubmitAnswer} className="space-y-4">
                <div>
                  {/* Rich Text Toolbar */}
                  <div className="border border-border rounded-t-md bg-muted p-2 flex flex-wrap gap-1 mb-0">
                    <Button variant="ghost" size="sm" type="button">
                      <Bold className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" type="button">
                      <Italic className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" type="button">
                      <Code className="h-4 w-4" />
                    </Button>
                    <div className="w-px bg-border mx-1" />
                    <Button variant="ghost" size="sm" type="button">
                      <List className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" type="button">
                      <LinkIcon className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <Textarea
                    value={newAnswer}
                    onChange={(e) => setNewAnswer(e.target.value)}
                    placeholder="Write your answer here..."
                    className="min-h-[150px] rounded-t-none border-t-0 resize-none"
                    required
                  />
                </div>
                
                <div className="flex justify-end">
                  <Button type="submit" variant="reddit" disabled={!newAnswer.trim()}>
                    Submit Answer
                  </Button>
                </div>
              </form>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="w-full lg:w-80">
            <div className="sticky top-24 space-y-6">
              {/* Related Questions */}
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4 text-foreground">Related Questions</h3>
                <div className="space-y-3">
                  {[
                    "SQL JOIN multiple tables",
                    "Concatenate strings in MySQL",
                    "Handle NULL values in SQL"
                  ].map((title, index) => (
                    <Link
                      key={index}
                      to={`/questions/${index + 2}`}
                      className="block text-sm text-reddit-blue hover:underline"
                    >
                      {title}
                    </Link>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default QuestionDetailPage;